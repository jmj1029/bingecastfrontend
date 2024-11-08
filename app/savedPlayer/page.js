import React, { useState, useEffect } from 'react';
import { FaPlay, FaDownload } from "react-icons/fa";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import EpisodeList from '../components/EpisodeList';

const CACHE_NAME = 'audio-cache';

// Function to download and cache audio
async function downloadAndCacheAudio(url, id) {
  const cache = await caches.open(CACHE_NAME);
  await cache.add(url);
  const storedEpisodes = JSON.parse(localStorage.getItem('offlineEpisodes') || '[]');
  localStorage.setItem('offlineEpisodes', JSON.stringify([...storedEpisodes, { id, url }]));
}

// Function to get audio URL from cache or network
async function getAudioUrl(url) {
  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(url);
  if (response) {
    return URL.createObjectURL(await response.blob());
  }
  return url; // Fallback to online URL if not cached
}

export default function Page() {
  const [audioURL, setAudioURL] = useState(null);
  const [offlineEpisodes, setOfflineEpisodes] = useState([]);

  const rssFeedUrl = "https://audioboom.com/channels/5113871.rss";

  useEffect(() => {
    // Load offline episodes metadata
    const episodes = JSON.parse(localStorage.getItem('offlineEpisodes') || '[]');
    setOfflineEpisodes(episodes);
  }, []);

  const handlePlay = async (url) => {
    const cachedUrl = await getAudioUrl(url);
    setAudioURL(cachedUrl);
  };

  const handleDownload = async (url, id) => {
    await downloadAndCacheAudio(url, id);
    setOfflineEpisodes([...offlineEpisodes, { id, url }]);
  };

  return (
    <div>
      <EpisodeList rssFeed={rssFeedUrl} onPlay={handlePlay} onDownload={handleDownload} offlineEpisodes={offlineEpisodes} />
      {audioURL && (
        <AudioPlayer src={audioURL} controls />
      )}
    </div>
  );
}
