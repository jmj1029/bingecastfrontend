import 'flowbite/dist/flowbite.css';
import { TextInput, Button, Avatar, Dropdown, Navbar, List, Modal } from 'flowbite-react';
import React from 'react';
import { fetchRSSFeed } from '@/lib/rssFetcher';
import { FaPlay } from "react-icons/fa";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import EpisodeList from '../components/EpisodeList';

export default async function Page() {

    const rssFeedUrl = "https://audioboom.com/channels/5113871.rss";


    return (
        <div>
            <EpisodeList rssFeed={rssFeedUrl} />
        </div>
    );
}
