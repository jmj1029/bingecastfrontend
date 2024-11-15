// app/explore/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { fetchRSSFeed } from '../../lib/rssFetcher';

const Explore: React.FC = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const rssUrls = [
    'https://joeroganexp.jremp3.com/',
    'https://feeds.megaphone.fm/carcast',
    'https://feeds.megaphone.fm/mindpump',
    'https://rss.art19.com/tim-ferriss-show',
    'https://feeds.megaphone.fm/GLT5194725738',
    'https://feeds.npr.org/510313/podcast.xml',
    'https://feeds.wnyc.org/radiolab',
    'https://dailystoic.libsyn.com/rss',
    'https://feeds.megaphone.fm/sciencevs',
    'https://theartofmanliness.libsyn.com/rss',
  ];
  

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const results = await Promise.all(
          rssUrls.map(async (url) => {
            try {
              return await fetchRSSFeed(url);
            } catch (error) {
              console.error(`Error fetching RSS feed from ${url}:`, error);
              return null; // Skip this URL if it fails
            }
          })
        );
        setPodcasts(results.filter(Boolean)); // Filter out any null results
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
              {feed[0]?.audioUrl && (
                <div className="mt-2">
                  <audio controls>
                    <source src={feed[0].audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
