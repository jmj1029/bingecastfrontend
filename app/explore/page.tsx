// app/explore/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { fetchRSSFeed } from '../../lib/rssFetcher';

const Explore: React.FC = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const rssUrls = [
    'https://feeds.megaphone.fm/ADV9962915674',  // The Smoking Tire (Cars)
    'https://feeds.megaphone.fm/carcast',        // CarCast (Cars)
    'https://rss.art19.com/no-jumper',           // No Jumper (Hip-Hop Music & Culture)
    'https://feeds.megaphone.fm/drinkchamps',    // Drink Champs (Hip-Hop)
    'https://feeds.megaphone.fm/rapradar',       // Rap Radar Podcast (Hip-Hop)
    'https://feeds.megaphone.fm/mindpump',       // Mind Pump: Raw Fitness Truth (Lifting & Fitness)
    'https://lewishowes.libsyn.com/rss',         // The School of Greatness (Self-Improvement & Fitness)
    'https://feeds.megaphone.fm/barbend',        // BarBend Podcast (Strength & Fitness)
    'https://feeds.buzzsprout.com/24829.rss',    // Power Project Podcast (Lifting & Fitness)
    'https://strengthrunning.libsyn.com/rss',    // The Strength Running Podcast (Fitness & Running)
  ];

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const results = await Promise.all(rssUrls.map(url => fetchRSSFeed(url)));
        setPodcasts(results);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {podcasts.map((feed, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md">
            <a href={feed[0]?.link} target="_blank" rel="noopener noreferrer">
              {feed[0]?.image ? (
                <img src={feed[0].image} alt={feed.title} className="w-full h-40 object-cover rounded-t" />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </a>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{feed[0]?.title}</h2>
              <p className="text-gray-600 mt-2">{feed[0]?.description || "No description available"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
