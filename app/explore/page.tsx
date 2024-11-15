import React, { useEffect, useState } from 'react';
import fetchRSSFeed from '../../lib/rssFetcher';

const Explore: React.FC = () => {
    const [podcasts, setPodcasts] = useState<any[]>([]);
    const rssUrls = [
        'https://omny.fm/shows/autosport-podcast/playlists/podcast.rss',
        'https://rss.com/podcasts/testtotrack/feed.xml',
        'https://rss.com/podcasts/motorsportthisweek/feed.xml',
        'https://thefastpod.com/feed.xml',
        'https://rss.com/podcasts/motorsportrepublica/feed.xml',
        'https://podnews.net/podcast/i5saj/episodes.rss',
        'https://podcasts.feedspot.com/rally_podcasts/feed.xml',
        'https://www.podchaser.com/categories/motorsport-category/podcasts/feed.xml',
        'https://www.motorsportmagazine.com/articles/category/podcast/feed.xml',
        'https://www.dirtymomedia.com/dalejrdownload/feed.xml'
    ];

    useEffect(() => {
        const fetchPodcasts = async () => {
            const allPodcasts = await Promise.all(
                rssUrls.map(async (url) => {
                    try {
                        const feed = await fetchRSSFeed(url);
                        return feed;
                    } catch (error) {
                        console.error(`Error fetching RSS feed from ${url}: ${error.message}`);
                        return null;
                    }
                })
            );
            setPodcasts(allPodcasts.filter((podcast) => podcast !== null));
        };
        fetchPodcasts();
    }, []);

    const [expanded, setExpanded] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <div style={{ backgroundColor: '#E9F0FA', padding: '20px', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', color: '#1E90FF', fontSize: '2em' }}>Explore</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {podcasts.map((podcast, index) => (
                    <div
                        key={index}
                        style={{
                            width: '300px',
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            borderRadius: '8px',
                            padding: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <img
                            src={podcast?.image || 'https://via.placeholder.com/300x150?text=No+Image+Available'}
                            alt="Podcast"
                            style={{ width: '100%', borderRadius: '8px 8px 0 0' }}
                        />
                        <h3 style={{ color: '#1E90FF', fontWeight: 'bold', fontSize: '1.2em' }}>{podcast?.title || 'Untitled Podcast'}</h3>
                        <p style={{ color: '#333', fontSize: '0.9em' }}>
                            {expanded === index ? (
                                <>
                                    {podcast?.description || 'No description available.'}
                                    <br />
                                    <span onClick={() => toggleExpand(index)} style={{ color: '#1E90FF', cursor: 'pointer' }}>Show Less</span>
                                </>
                            ) : (
                                <>
                                    {podcast?.description?.substring(0, 100) || 'No description available.'}
                                    {podcast?.description?.length > 100 && (
                                        <>
                                            ...{' '}
                                            <span onClick={() => toggleExpand(index)} style={{ color: '#1E90FF', cursor: 'pointer' }}>
                                                Read More
                                            </span>
                                        </>
                                    )}
                                </>
                            )}
                        </p>
                        {podcast?.audio && (
                            <audio controls style={{ width: '100%' }}>
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



