import 'flowbite/dist/flowbite.css';
import { TextInput, Button, Avatar, Dropdown, Navbar, List, Modal } from 'flowbite-react';
import React from 'react';
import { fetchRSSFeed } from '@/lib/rssFetcher';
import { FaPlay } from "react-icons/fa";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


export default async function EpisodeList(rssFeed) {

    const episodes = await fetchRSSFeed("https://audioboom.com/channels/5113871.rss"); // Replace with your RSS feed URL



    return (
        <div className="min-h-screen bg-gray-100 ">
            {/* Hero Section */}
            <section className="bg-blue-600 text-white text-center py-20">
                <h1 className="text-5xl font-bold mb-4">Welcome to BingeCast</h1>
                <p className="text-2xl">Your favorite podcasts, all in one place.</p>
            </section>
            {/* Featured Episodes Section */}
            <section className="py-16 bg-gray-200">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-10 text-black">Episodes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                        {episodes.map((episode, index) => (
                            <a href={episode.audioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                
                            <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
                                <img src={episode.image} alt={`Podcast ${index + 1}`} className="mb-4 w-full h-48 object-cover rounded" />
                                <h3 className="text-2xl font-bold mb-2 text-black">{episode.title}</h3>
                                <p className="text-gray-600">{episode.description} </p>
                                <h3>{episode.key}</h3>
                                
                            </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto text-center">
                    <p className="text-xl mb-4">Follow us on social media</p>
                    <div className="flex justify-center space-x-4 mb-6">
                        <a href="#" className="hover:text-blue-400 transition-all">Twitter</a>
                        <a href="#" className="hover:text-blue-400 transition-all">Instagram</a>
                        <a href="#" className="hover:text-blue-400 transition-all">Facebook</a>
                    </div>
                    <p>&copy; 2024 BingeCast. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
