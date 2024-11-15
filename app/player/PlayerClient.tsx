"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AudioPlayer from 'react-h5-audio-player';
import { Button } from 'flowbite-react';
import { FaStepForward, FaStepBackward } from "react-icons/fa";
import 'react-h5-audio-player/lib/styles.css';

type Episode = {
    title: string | null;
    url: string | null;
};

async function fetchEpisodes(rssFeedUrl: string): Promise<Episode[]> {
    const proxyUrl = `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(rssFeedUrl)}`;

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error("Failed to fetch RSS feed through proxy");

        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const items = Array.from(xmlDoc.querySelectorAll("item"));

        return items.map(item => ({
            title: item.querySelector("title")?.textContent || null,
            url: item.querySelector("enclosure")?.getAttribute("url") || null,
        }));
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        return [];
    }
}

export default function PlayerClient() {
    const searchParams = useSearchParams();
    const rssfeed = searchParams.get("rssfeed");
    const indexParam = searchParams.get("index");
    const initialIndex = indexParam ? parseInt(indexParam, 10) : 0;

    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(initialIndex);
    const [audioURL, setAudioURL] = useState<string | null>(null);

    useEffect(() => {
        const loadEpisodes = async () => {
            if (!rssfeed) return;

            const episodeList = await fetchEpisodes(rssfeed);
            setEpisodes(episodeList);

            const validIndex = Math.min(initialIndex, episodeList.length - 1);
            setCurrentEpisodeIndex(validIndex);
            setAudioURL(episodeList[validIndex]?.url || null);
        };

        loadEpisodes();
    }, [rssfeed, initialIndex]);

    const handleNextEpisode = () => {
        const nextIndex = currentEpisodeIndex + 1;
        if (nextIndex < episodes.length) {
            setCurrentEpisodeIndex(nextIndex);
            setAudioURL(episodes[nextIndex]?.url || null);
        }
    };

    const handlePreviousEpisode = () => {
        const prevIndex = currentEpisodeIndex - 1;
        if (prevIndex >= 0) {
            setCurrentEpisodeIndex(prevIndex);
            setAudioURL(episodes[prevIndex]?.url || null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6 p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">
                {episodes[currentEpisodeIndex]?.title || "Loading..."}
            </h1>
            {audioURL ? (
                <AudioPlayer
                    src={audioURL}
                    className="w-full max-w-lg"
                    style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                />
            ) : (
                <p>Loading audio...</p>
            )}
            <div className="flex space-x-4">
                <Button
                    className="flex items-center space-x-2"
                    onClick={handlePreviousEpisode}
                    disabled={currentEpisodeIndex === 0}
                >
                    <FaStepBackward className="mr-2" /> Previous
                </Button>
                <Button
                    className="flex items-center space-x-2"
                    onClick={handleNextEpisode}
                    disabled={currentEpisodeIndex === episodes.length - 1}
                >
                    Next <FaStepForward className="ml-2" />
                </Button>
            </div>
        </div>
    );
}
