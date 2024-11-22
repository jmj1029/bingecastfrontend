"use client";
import 'flowbite/dist/flowbite.css';
import { TextInput, Button, Avatar, List } from 'flowbite-react';
import React, { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import Header from '../header';
import Footer from '../footer';

export default function Page() {
    const [rssFeeds, setRssFeeds] = useState<string[]>([]); // Specify type as string[]
    const [rssInput, setRssInput] = useState('');

    const handleAddFeed = () => {
        if (rssInput.trim()) {
            setRssFeeds([...rssFeeds, rssInput.trim()]);
            setRssInput(''); // Clear the input field after adding
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <Header />
            <section className="bg-blue-600 text-white text-center py-20">
                <h1 className="text-5xl font-bold mb-4">Welcome back!</h1>
                <p className="text-2xl">Your favorite podcasts, all in one place.</p>
            </section>

            {/* Featured Episodes Section */}
            <section className="py-16 bg-gray-200">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-10">Jump in!</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">

                        {/* Add featured episodes as in your original code */}
                        {rssFeeds.map((feed, index) => (
                            <a key={index} href={`/player?rssfeed=${encodeURIComponent(feed)}&index=10000`}>
                                <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
                                    <img src="/public/file.svg" alt="Podcast" className="mb-4 w-full h-48 object-cover rounded" />
                                    <h3 className="text-2xl font-bold mb-2">Podcast Episode 1</h3>
                                    <p className="text-gray-600">A short description of the first podcast episode.</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Your Podcasts Section */}
            <section className="py-16 bg-gray-200">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-10">Your Podcasts</h2>

                    <List unstyled className="divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Display added RSS feeds */}
                        {rssFeeds.map((feed, index) => (
                            <List.Item key={index} className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4">
                                    <Avatar img="/images/people/profile-picture-1.jpg" alt="" rounded size="sm" />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                            {feed}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <Button label="2" href={`/player?rssfeed=${encodeURIComponent(feed)}&index=10000`}>News Mode</Button>
                                        <Button label="2" href={`/player?rssfeed=${encodeURIComponent(feed)}`}>Stack Mode</Button>
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
