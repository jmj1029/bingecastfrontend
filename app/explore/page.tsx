


"use client";

import React, { useEffect, useState } from 'react';
import { fetchRSSFeed } from '../../lib/rssFetcher';
import Header from '../header';
import Footer from '../footer';
import { useRouter } from 'next/navigation';

const Explore: React.FC = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      try {
        console.log("Starting RSS fetch...");
        const allPodcasts = await Promise.all(
          rssUrls.map(async (url) => {
            try {
              console.log("Fetching from URL:", url);
              const result = await fetchRSSFeed(url);
              console.log("Fetched data:", result);
              return result;
            } catch (error) {
              console.error(`Error fetching RSS feed from ${url}:`, error);
              return null;
            }
          })
        );
        console.log("Final fetched podcasts:", allPodcasts);
        setPodcasts(allPodcasts.filter(feed => feed !== null));
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (podcast: any) => {
    const title = podcast.title || "Unknown Title";
    const audioUrl = podcast.audioUrl || "";
    router.push(`/player?title=${encodeURIComponent(title)}&audioUrl=${encodeURIComponent(audioUrl)}`);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  if (typeof window === "undefined") {
    return null; // Fallback for SSR to prevent server-side rendering issues
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Podcasts</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Discover a variety of engaging podcasts tailored to your interests.</p>
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading episodes...</p>
        ) : podcasts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No podcasts available. Please try again later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {podcasts.map((podcast, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-start cursor-pointer hover:shadow-lg"
                onClick={() => handleCardClick(podcast)}
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {podcast.title || "Untitled Podcast"}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {truncateText(podcast.description || 'No description available.', 100)}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Explore;




