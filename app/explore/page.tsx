// app/explore/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { fetchRSSFeed } from '../../lib/rssFetcher';

const Explore: React.FC = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const rssUrls = [
    'https://feeds.megaphone.fm/DFT5818254302',
    'https://feeds.megaphone.fm/BLU1007324930',
    'https://audioboom.com/channels/4991699.rss',
    'https://audioboom.com/channels/5002007.rss',
    'https://audioboom.com/channels/4817854.rss',
    'https://feeds.simplecast.com/_Dn4Vj5Rs',
    'https://feeds.megaphone.fm/morning-kombat',
    'https://theartofmanliness.libsyn.com/rss',
  ];

  useEffect(() => {
    const fetchData = async () => {
      const allPodcasts = await Promise.all(rssUrls.map(url => fetchRSSFeed(url)));
      setPodcasts(allPodcasts);
    };

    fetchData();
  }, []);

  const handleCardClick = (podcast: any) => {
    // Logic to bring up a player or navigate to a detailed player view
    alert(`Playing: ${podcast.title}`); // Replace with actual player logic
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Podcasts</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Discover a variety of engaging podcasts tailored to your interests.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {podcasts.map((podcast, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-start cursor-pointer hover:shadow-lg"
              onClick={() => handleCardClick(podcast)}
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {podcast.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {podcast.description || 'No description available.'}
              </p>
              {podcast.audioUrl && (
                <audio controls className="w-full mt-2">
                  <source src={podcast.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;






