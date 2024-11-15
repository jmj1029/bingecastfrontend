// app/explore/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { fetchRSSFeed } from '../../lib/rssFetcher';

const Explore: React.FC = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const rssUrls = [
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
        setPodcasts(results.filter(feed => feed !== null));
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Explore</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {podcasts.map((feed, index) => (
          <PodcastCard key={index} feed={feed[0]} />
        ))}
      </div>
    </div>
  );
};

const PodcastCard = ({ feed }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md border border-blue-200">
      <a href={feed.link} target="_blank" rel="noopener noreferrer">
        {feed.image ? (
          <img src={feed.image} alt={feed.title} className="w-full h-40 object-cover rounded-t" />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
      </a>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-blue-600">{feed.title}</h2>
        <p className="text-gray-700 mt-2">
          {showFullDescription
            ? feed.description
            : `${feed.description?.slice(0, 100)}... `}
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            {showFullDescription ? 'Show Less' : 'Read More'}
          </button>
        </p>
        {feed.audioUrl && (
          <div className="mt-2">
            <audio controls>
              <source src={feed.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;

