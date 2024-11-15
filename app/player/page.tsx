import React, { Suspense } from 'react';
import Header from '../header';
import Footer from '../footer';
import PlayerClient from './PlayerClient';

export default function PlayerPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <Suspense fallback={<p>Loading player...</p>}>
                <PlayerClient />
            </Suspense>
            <Footer />
        </div>
    );
}
