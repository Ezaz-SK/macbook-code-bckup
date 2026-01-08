import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchStore } from '@/features/search/hooks/useSearchStore';
import { BuddyCard } from './components/BuddyCard';
import { motion } from 'framer-motion';

// Mock Data
const MOCK_BUDDIES = [
    {
        id: '1',
        name: 'Rahul Sharma',
        college: 'Christ University',
        languages: ['English', 'Hindi', 'Kannada'],
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60',
        introVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4',
        rating: 4.8,
        reviews: 124
    },
    {
        id: '2',
        name: 'Priya Patel',
        college: 'NIFT Bangalore',
        languages: ['English', 'Hindi', 'Gujarati'],
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60',
        introVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-smartphone-4020-large.mp4',
        rating: 4.9,
        reviews: 89
    },
    {
        id: '3',
        name: 'Arjun Singh',
        college: 'IIM Bangalore',
        languages: ['English', 'Punjabi'],
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60',
        introVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-book-in-a-library-3343-large.mp4',
        rating: 4.7,
        reviews: 56
    },
    {
        id: '4',
        name: 'Sneha Reddy',
        college: 'Mount Carmel College',
        languages: ['English', 'Telugu', 'Kannada'],
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
        introVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-laptop-at-home-office-268-large.mp4',
        rating: 4.9,
        reviews: 210
    }
];

export const ListingPage = () => {
    const [searchParams] = useSearchParams();
    const { city, actions } = useSearchStore();

    useEffect(() => {
        window.scrollTo(0, 0);

        // Read URL parameters and set filters
        const cityParam = searchParams.get('city');
        if (cityParam) {
            actions.setCity(cityParam);
        }
    }, [searchParams, actions]);

    return (
        <div className="py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Buddies in <span className="text-primary">{city || 'Bangalore'}</span>
                </h1>
                <p className="text-ink-400">Found {MOCK_BUDDIES.length} verified locals ready to help.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MOCK_BUDDIES.map((buddy, index) => (
                    <motion.div
                        key={buddy.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <BuddyCard buddy={buddy} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
