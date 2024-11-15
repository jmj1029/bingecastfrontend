// app/explore/page.tsx

"use client";


import React, { useEffect, useState } from 'react';
import { fetchRSSFeed } from '../../lib/rssFetcher';

const Explore: React.FC = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const rssUrls = [
    // Add your RSS URLs here
    'https://example.com/rss1',
    'https://example.com/rss2',
    // Add more URLs as needed
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
      <h1 className="text-3xl font-bold mb-4">Explore Podcasts</h1>
      <div className="space-y-8">
        {podcasts.map((feed, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold">{feed.title}</h2>
            <p>{feed.description}</p>
            <ul className="mt-4 space-y-2">
              {feed.map((item: any, idx: number) => (
                <li key={idx}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
