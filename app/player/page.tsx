"use client";

import 'flowbite/dist/flowbite.css';
import { Button } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaDownload, FaHome, FaStepForward, FaStepBackward } from "react-icons/fa";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Header from '../header';
import Footer from '../footer';

const CACHE_NAME = 'audio-cache';

// Fetch episodes from the RSS feed using the original proxy that worked for you
async function fetchEpisodes(rssFeedUrl: string): Promise<{ title: string | null; url: string | null }[]> {
    const proxyUrl = `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(rssFeedUrl)}`;

    try {
        const response = await fetch(proxyUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch RSS feed through proxy");
        }

        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const items = Array.from(xmlDoc.querySelectorAll("item"));

        // Reverse the episodes so that the oldest episode is at index 0
        return items.reverse().map(item => ({
            title: item.querySelector("title")?.textContent || null,
            url: item.querySelector("enclosure")?.getAttribute("url") || null,
        }));
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        throw error;
    }
}

// Download and cache audio for offline playback
async function downloadAndCacheAudio(url: string): Promise<void> {
    const cache = await caches.open(CACHE_NAME);
    await cache.add(url);
    const offlineEpisodes = JSON.parse(localStorage.getItem('offlineEpisodes') || '[]');
    localStorage.setItem('offlineEpisodes', JSON.stringify([...offlineEpisodes, url]));
}

// Retrieve audio URL, checking cache for offline playback support
async function getAudioUrl(url: string): Promise<string> {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(url);
    if (response) {
        return URL.createObjectURL(await response.blob());
    }
    return url;
}

export default function PlayerPage() {
    const searchParams = useSearchParams();
    const rssfeed = searchParams.get("rssfeed");
    const indexParam = searchParams.get("index");
    const initialIndex = indexParam ? parseInt(indexParam, 10) : 0;
    const router = useRouter();

    const [episodes, setEpisodes] = useState<{ title: string | null; url: string | null }[]>([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(initialIndex);
    const [audioURL, setAudioURL] = useState<string | null>(null);

    useEffect(() => {
        async function loadEpisodes() {
            if (!rssfeed) return;

            try {
                const episodeList = await fetchEpisodes(rssfeed);
                setEpisodes(episodeList);

                const validIndex = Math.min(initialIndex, episodeList.length - 1);
                setCurrentEpisodeIndex(validIndex);
                const cachedUrl = await getAudioUrl(episodeList[validIndex].url || '');
                setAudioURL(cachedUrl);
            } catch (error) {
                console.error("Error fetching RSS feed:", error);
            }
        }
        loadEpisodes();
    }, [rssfeed, initialIndex]);

    const handleDownload = async () => {
        const currentEpisode = episodes[currentEpisodeIndex];
        if (currentEpisode?.url) {
            await downloadAndCacheAudio(currentEpisode.url);
            alert(`${currentEpisode.title} downloaded for offline playback!`);
        }
    };

    const handleNextEpisode = async () => {
        if (currentEpisodeIndex < episodes.length - 1) {
            const nextIndex = currentEpisodeIndex + 1;
            setCurrentEpisodeIndex(nextIndex);
            const cachedUrl = await getAudioUrl(episodes[nextIndex].url || '');
            setAudioURL(cachedUrl);
        }
    };

    const handleLastEpisode = async () => {
        if (currentEpisodeIndex > 0) {
            const prevIndex = currentEpisodeIndex - 1;
            setCurrentEpisodeIndex(prevIndex);
            const cachedUrl = await getAudioUrl(episodes[prevIndex].url || '');
            setAudioURL(cachedUrl);
        }
    };

    const handleBackToHome = () => {
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <Header />

            <main className="p-6 flex justify-center items-center">
                {episodes.length > 0 ? (
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between" style={{ width: '600px', height: '200' }}>
                        <div className="flex-grow">
                            <h2 className="text-2xl font-bold text-blue-600 mb-4">{episodes[currentEpisodeIndex].title}</h2>
                            {audioURL && <AudioPlayer src={audioURL} />}
                        </div>
                        <div className="flex justify-between mt-4">
                            <Button color="primary" onClick={handleLastEpisode} disabled={currentEpisodeIndex === 0} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                                <FaStepBackward className="mr-2" /> Previous Episode
                            </Button>
                            <Button color="primary" onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                                <FaDownload className="mr-2" /> Download for Offline
                            </Button>
                            <Button color="primary" onClick={handleNextEpisode} disabled={currentEpisodeIndex === episodes.length - 1} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                                Next Episode <FaStepForward className="ml-2" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <p className="text-lg text-gray-600">Loading episodes...</p>
                )}
            </main>
            <Footer />
        </div>
    );
}
