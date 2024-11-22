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

interface Episode {
    title: string | null;
    url: string | null;
}

// Fetch episodes from the RSS feed using the original proxy
async function fetchEpisodes(rssFeedUrl: string): Promise<Episode[]> {
    const proxyUrl = `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(rssFeedUrl)}`;

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error("Failed to fetch RSS feed through proxy");

        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const items = Array.from(xmlDoc.querySelectorAll("item"));

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

    if (typeof window !== 'undefined') {
        const offlineEpisodes = JSON.parse(localStorage.getItem('offlineEpisodes') || '[]');
        localStorage.setItem('offlineEpisodes', JSON.stringify([...offlineEpisodes, url]));
    }
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

    const [token, setToken] = useState<string | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(initialIndex);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [isNavigating, setIsNavigating] = useState(false); // Prevent rapid button clicks

    // Retrieve the token and the saved episode index on the client
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const authToken = localStorage.getItem("authToken");
            setToken(authToken);

            const savedIndex = JSON.parse(localStorage.getItem(`${authToken}_currentEpisodeIndex`) || '0') || initialIndex;
            setCurrentEpisodeIndex(savedIndex);
        }
    }, [initialIndex]);

    // Load episodes when the RSS feed changes
    useEffect(() => {
        async function loadEpisodes() {
            if (!rssfeed) return;

            try {
                const episodeList = await fetchEpisodes(rssfeed);
                setEpisodes(episodeList);

                // Set the audio for the initial episode only when episodes are loaded
                const validIndex = Math.min(currentEpisodeIndex, episodeList.length - 1);
                setAudioURL(await getAudioUrl(episodeList[validIndex]?.url || ''));
            } catch (error) {
                console.error("Error fetching RSS feed:", error);
            }
        }
        loadEpisodes();
    }, [rssfeed]);

    // Update audio URL when the current episode index changes
    useEffect(() => {
        if (episodes.length > 0 && episodes[currentEpisodeIndex]?.url) {
            (async () => {
                const url = await getAudioUrl(episodes[currentEpisodeIndex].url || '');
                setAudioURL(url);
            })();
        }
    }, [currentEpisodeIndex, episodes]);

    // Save the current episode index to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined' && token) {
            localStorage.setItem(`${token}_currentEpisodeIndex`, JSON.stringify(currentEpisodeIndex));
        }
    }, [currentEpisodeIndex, token]);

    const handleDownload = async () => {
        const currentEpisode = episodes[currentEpisodeIndex];
        if (currentEpisode?.url) {
            await downloadAndCacheAudio(currentEpisode.url);
            alert(`${currentEpisode.title} downloaded for offline playback!`);
        }
    };

    const handleNextEpisode = async () => {
        if (!isNavigating && currentEpisodeIndex < episodes.length - 1) {
            setIsNavigating(true);
            const nextIndex = currentEpisodeIndex + 1;
            setCurrentEpisodeIndex(nextIndex);
            setIsNavigating(false);
        }
    };

    const handleLastEpisode = async () => {
        if (!isNavigating && currentEpisodeIndex > 0) {
            setIsNavigating(true);
            const prevIndex = currentEpisodeIndex - 1;
            setCurrentEpisodeIndex(prevIndex);
            setIsNavigating(false);
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
                            <h2 className="text-2xl font-bold text-blue-600 mb-4">{episodes[currentEpisodeIndex]?.title}</h2>
                            {audioURL && <AudioPlayer src={audioURL} />}
                        </div>
                        <div className="flex justify-between mt-4">
                            <Button color="primary" onClick={handleBackToHome} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                                <FaHome className="mr-2" /> Home
                            </Button>
                            <Button color="primary" onClick={handleLastEpisode} disabled={isNavigating || currentEpisodeIndex === 0} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                                <FaStepBackward className="mr-2" /> Previous
                            </Button>
                            <Button color="primary" onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                                <FaDownload className="mr-2" /> Download
                            </Button>
                            <Button color="primary" onClick={handleNextEpisode} disabled={isNavigating || currentEpisodeIndex === episodes.length - 1} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                                Next <FaStepForward className="ml-2" />
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
