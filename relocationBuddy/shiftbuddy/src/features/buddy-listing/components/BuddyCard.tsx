import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FluidCard } from '@/components/ui/FluidCard';


interface Buddy {
    id: string;
    name: string;
    college: string;
    languages: string[];
    photoUrl: string;
    introVideoUrl: string; // URL to video file
    rating: number;
    reviews: number;
}

interface BuddyCardProps {
    buddy: Buddy;
    onClick?: () => void;
}

export const BuddyCard = ({ buddy, onClick }: BuddyCardProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(`/buddy/${buddy.id}`);
        }
    };

    return (
        <FluidCard
            className="relative overflow-hidden group h-[400px] p-0 cursor-pointer border-0"
            onClick={handleClick}
        >
            {/* Background Image / Video Layer */}
            <div
                className="absolute inset-0 bg-gray-200"
                onMouseEnter={() => setIsPlaying(true)}
                onMouseLeave={() => {
                    setIsPlaying(false);
                    setIsVideoLoaded(false); // Reset loaded state on leave
                }}
            >
                {/* Always show image as base layer */}
                <img
                    src={buddy.photoUrl}
                    alt={buddy.name}
                    className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 ${isPlaying && isVideoLoaded ? 'opacity-0' : 'opacity-100'
                        }`}
                />

                {/* Show video only when playing, no error, and URL exists */}
                {isPlaying && !videoError && buddy.introVideoUrl && (
                    <video
                        src={buddy.introVideoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        onLoadedData={() => setIsVideoLoaded(true)}
                        onError={() => setVideoError(true)}
                    />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Floating Info Glass (Bottom) */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white shadow-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg">{buddy.name}</h3>
                        <p className="text-sm opacity-90 text-gray-200">{buddy.college}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-xs font-bold">{buddy.rating}</span>
                    </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                    {buddy.languages.map((lang) => (
                        <span key={lang} className="text-[10px] bg-white/20 px-2 py-1 rounded-full">
                            {lang}
                        </span>
                    ))}
                </div>
            </div>
        </FluidCard>
    );
};
