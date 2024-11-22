// lib/rssFetcher.js

import Parser from 'rss-parser';

const parser = new Parser();

export async function fetchRSSFeed(url) {
  try {
    const feed = await parser.parseURL(url);
    return feed.items.map(item => ({
      title: item.title,
      link: item.link,
      description: item.contentSnippet || item.description,
      image: item.itunes?.image || '/public/file.svg',  // Fallback image
      audioUrl: item.enclosure?.url || null,  // Fetch audio URL if available
    }));
  } catch (error) {
    console.error(`Error fetching RSS feed from ${url}: ${error.message}`);
    return null; // Return null if the feed fails
  }
}


