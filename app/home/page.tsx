"use client";

import 'flowbite/dist/flowbite.css';
import { TextInput, Button, Avatar, List } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import Header from '../header';
import Footer from '../footer';

interface Podcast {
    url: string;
    name: string | null;
    image: string | null;
}

export default function Page() {
    const [rssFeeds, setRssFeeds] = useState<Podcast[]>([]);
    const [recentlyViewed, setRecentlyViewed] = useState<Podcast[]>([]);
    const [rssInput, setRssInput] = useState('');

    // Load RSS feeds and recently viewed podcasts from localStorage on mount
    useEffect(() => {
        const savedFeeds = localStorage.getItem("rssFeeds");
        const savedRecentlyViewed = localStorage.getItem("recentlyViewed");

        if (savedFeeds) {
            setRssFeeds(JSON.parse(savedFeeds));
        }
        if (savedRecentlyViewed) {
            setRecentlyViewed(JSON.parse(savedRecentlyViewed).slice(0, 3)); // Limit to 3 items
        }
    }, []);

    // Save RSS feeds to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("rssFeeds", JSON.stringify(rssFeeds));
    }, [rssFeeds]);

    // Save recently viewed podcasts to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    // Fetch podcast metadata (name and image) from the RSS feed
    const fetchPodcastMetadata = async (url: string): Promise<Podcast> => {
        try {
            const proxyUrl = `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);

            // Log response status
            if (!response.ok) {
                console.error(`Failed to fetch feed. HTTP status: ${response.status}`);
                throw new Error(`Failed to fetch feed: ${response.statusText}`);
            }

            const data = await response.text();
            console.log("Fetched raw RSS data:", data); // Debugging

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            // Check for XML parsing errors
            if (xmlDoc.querySelector("parsererror")) {
                console.error("XML parsing error:", xmlDoc.querySelector("parsererror")?.textContent);
                throw new Error("Invalid XML structure.");
            }

            // Extract podcast title
            const title =
                xmlDoc.querySelector("channel > title")?.textContent ||
                xmlDoc.querySelector("title")?.textContent ||
                "Unknown Podcast";

            // Extract podcast image
            const image =
                xmlDoc.querySelector("channel > itunes\\:image")?.getAttribute("href") || // Channel-level image
                xmlDoc.querySelector("channel > image > url")?.textContent || // Legacy image tag
                xmlDoc.querySelector("item > itunes\\:image")?.getAttribute("href") || // Episode-level fallback
                xmlDoc.querySelector("item > media\\:thumbnail")?.getAttribute("url") || // Thumbnail fallback
                null;

            return { url, name: title, image };
        } catch (error) {
            console.error("Error fetching podcast metadata:", error);
            return { url, name: "Unknown Podcast", image: null };
        }
    };

    // Handle adding a new feed
    const handleAddFeed = async () => {
        if (rssInput.trim()) {
            const newFeed = await fetchPodcastMetadata(rssInput.trim());
            setRssFeeds([...rssFeeds, newFeed]);
            setRssInput(''); // Clear the input field after adding
        }
    };

    // Handle viewing a podcast (add to recently viewed)
    const handleViewPodcast = (podcast: Podcast) => {
        setRecentlyViewed((prev) => {
            const updated = [podcast, ...prev.filter((p) => p.url !== podcast.url)];
            return updated.slice(0, 3); // Keep only the 3 most recent
        });
    };

    // Handle removing a podcast
    const handleRemovePodcast = (url: string) => {
        setRssFeeds(rssFeeds.filter((feed) => feed.url !== url));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <Header />
            <section className="bg-blue-600 text-white text-center py-20">
                <h1 className="text-5xl font-bold mb-4">Welcome back!</h1>
                <p className="text-2xl">Your favorite podcasts, all in one place.</p>
            </section>

            {/* Recently Viewed Section */}
            {recentlyViewed.length > 0 && (
                <section className="py-16 bg-gray-200">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-10">Jump in!</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                            {recentlyViewed.map((feed, index) => (
                                <a
                                    key={index}
                                    href={`/player?rssfeed=${encodeURIComponent(feed.url)}&index=10000`}
                                    onClick={() => handleViewPodcast(feed)}
                                >
                                    <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
                                        <img
                                            src={feed.image || "/public/file.svg"}
                                            alt={feed.name || "Podcast"}
                                            className="mb-4 w-full h-48 object-cover rounded"
                                        />
                                        <h3 className="text-2xl font-bold mb-2">{feed.name}</h3>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Your Podcasts Section */}
            <section className="py-16 bg-gray-200">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-10">Your Podcasts</h2>

                    <List unstyled className="divide-y divide-gray-200 dark:divide-gray-700">
                        {rssFeeds.map((feed, index) => (
                            <List.Item key={index} className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4">
                                    <Avatar img={feed.image || "/images/default-avatar.jpg"} alt="" rounded size="sm" />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                            {feed.name}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center space-x-2">
                                        <Button
                                            onClick={() => handleViewPodcast(feed)}
                                            href={`/player?rssfeed=${encodeURIComponent(feed.url)}`}
                                        >
                                            Watch
                                        </Button>
                                        <Button
                                            color="failure"
                                            onClick={() => handleRemovePodcast(feed.url)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </List.Item>
                        ))}

                        <List.Item className="pb-0 pt-3 sm:pt-4">
                            <div className="flex items-center space-x-4">
                                <TextInput
                                    id="rssInput"
                                    type="url"
                                    placeholder="Enter RSS Feed URL"
                                    value={rssInput}
                                    onChange={(e) => setRssInput(e.target.value)}
                                    required
                                />
                                <CiCirclePlus
                                    className="cursor-pointer h-6 w-6 text-blue-600"
                                    onClick={handleAddFeed}
                                />
                            </div>
                        </List.Item>
                    </List>
                </div>
            </section>

            {/* Footer Section */}
            <Footer />
        </div>
    );
}
