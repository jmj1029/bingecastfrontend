// app/explore/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { fetchRSSFeed } from '../../lib/rssFetcher';

interface Podcast {
    title: string;
    link: string;
    description: string;
    image: string;
    audioUrl: string | null;
}

const Explore: React.FC = () => {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);

    useEffect(() => {
        async function fetchPodcasts() {
            const urls = [
                'https://jockounderground.com/rss',  // Working link
                'https://ferriss.show/rss',  // Working link
                // Add any additional links here that were functional
            ];

            const fetchedPodcasts = await Promise.all(
                urls.map(async (url) => {
                    const feed = await fetchRSSFeed(url);
                    return feed || []; // Handle case where feed is null
                })
            );

            const flattenedPodcasts = fetchedPodcasts.flat();
            setPodcasts(flattenedPodcasts);
        }

        fetchPodcasts();
    }, []);

    return (
        <div style={{ backgroundColor: '#E6F0FA', padding: '20px' }}>
            <h1 style={{ color: '#1E73BE', textAlign: 'center' }}>Explore</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {podcasts.map((podcast, index) => (
                    <div key={index} style={{ width: '300px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '15px' }}>
                        <img src={podcast.image} alt={podcast.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                        <h3 style={{ color: '#1E73BE' }}>{podcast.title}</h3>
                        <p>{podcast.description.slice(0, 100)}... <a href={podcast.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1E73BE' }}>Read More</a></p>
                        {podcast.audioUrl && (
                            <audio controls style={{ width: '100%' }}>
                                <source src={podcast.audioUrl} type="audio/mpeg" />
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






