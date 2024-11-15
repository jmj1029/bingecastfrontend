// app/explore/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { fetchRSSFeed } from "../../lib/rssFetcher";

const Explore: React.FC = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);

  const rssUrls = [
    "https://feeds.megaphone.fm/MTP7792538678",
    "https://audioboom.com/channels/4908152.rss",
    "https://feeds.megaphone.fm/ESP2802829053",
    "https://feeds.megaphone.fm/GNM9243189155",
    "https://feeds.simplecast.com/0XPp3AYJ",
    "https://feeds.simplecast.com/wfhsSN3j",
    "https://podcast.dinnerwithracers.com/rss",
    "https://audioboom.com/channels/5040608.rss",
    "https://rss.art19.com/the-racing-writers-podcast",
    "https://rss.art19.com/nascar-on-nbc-podcast"
  ];

  useEffect(() => {
    const fetchPodcasts = async () => {
      const allPodcasts = await Promise.all(
        rssUrls.map(async (url) => {
          try {
            const data = await fetchRSSFeed(url);
            return data;
          } catch (error) {
            console.error(`Error fetching RSS feed from ${url}:`, error.message || error);
            return null;
          }
        })
      );
      setPodcasts(allPodcasts.filter(Boolean)); // Filter out any null responses
    };

    fetchPodcasts();
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Explore</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map((podcast, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            {podcast.image ? (
              <img src={podcast.image} alt={podcast.title} className="w-full h-48 object-cover rounded-md mb-4" />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-500 rounded-md mb-4">
                No Image Available
              </div>
            )}
            <h2 className="text-lg font-semibold text-blue-600 mb-2">{podcast.title}</h2>
            <p className="text-gray-700 mb-4">
              {podcast.description?.slice(0, 100)}...
              <span className="text-blue-500 cursor-pointer"> Read More</span>
            </p>
            {podcast.audio && (
              <audio controls className="w-full">
                <source src={podcast.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;


