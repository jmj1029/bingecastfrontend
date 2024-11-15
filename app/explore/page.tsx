// app/explore/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { fetchRSSFeed } from '../../lib/rssFetcher';

const Explore: React.FC = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const rssUrls = [
    'https://rss.art19.com/the-daily',
    'https://feeds.megaphone.fm/stuffyoushouldknow',
    'https://feeds.npr.org/510289/podcast.xml',
    'https://feeds.npr.org/510298/podcast.xml',
    'https://feeds.megaphone.fm/sciencevs',
    'https://feeds.megaphone.fm/GLT5194725738',
    'https://feeds.npr.org/510313/podcast.xml',
    'https://feeds.megaphone.fm/revolutions',
    'https://rss.art19.com/tim-ferriss-show',
    'https://feeds.megaphone.fm/armchairexpert',
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
