import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin, Clock, MessageSquare, Trash2 } from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { MOCK_SAVED_BUDDIES } from '@/data/finderMockData';
import { useState } from 'react';

export const SavedBuddiesPage = () => {
    const [savedBuddies, setSavedBuddies] = useState(MOCK_SAVED_BUDDIES);

    const handleRemove = (id: string) => {
        setSavedBuddies(savedBuddies.filter(b => b.id !== id));
    };

    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <Heart className="text-red-500" fill="currentColor" />
                    Saved Buddies
                </h1>
                <p className="text-ink-400">Your favorite buddies for quick access</p>
            </div>

            {savedBuddies.length === 0 ? (
                <FluidCard className="text-center py-12">
                    <Heart size={48} className="mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-bold mb-2">No Saved Buddies</h3>
                    <p className="text-ink-400 mb-6">
                        Save your favorite buddies to quickly access them later
                    </p>
                    <Link to="/search">
                        <ElasticButton>Find Buddies</ElasticButton>
                    </Link>
                </FluidCard>
            ) : (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <FluidCard className="text-center">
                            <p className="text-3xl font-bold text-primary mb-1">{savedBuddies.length}</p>
                            <p className="text-sm text-ink-400">Saved Buddies</p>
                        </FluidCard>
                        <FluidCard className="text-center">
                            <p className="text-3xl font-bold text-primary mb-1">
                                {(savedBuddies.reduce((sum, b) => sum + b.rating, 0) / savedBuddies.length).toFixed(1)}
                            </p>
                            <p className="text-sm text-ink-400">Average Rating</p>
                        </FluidCard>
                        <FluidCard className="text-center">
                            <p className="text-3xl font-bold text-primary mb-1">
                                {savedBuddies.reduce((sum, b) => sum + b.reviews, 0)}
                            </p>
                            <p className="text-sm text-ink-400">Total Reviews</p>
                        </FluidCard>
                    </div>

                    {/* Saved Buddies Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedBuddies.map((buddy, index) => (
                            <motion.div
                                key={buddy.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <FluidCard className="relative overflow-hidden hover:shadow-lg transition-shadow">
                                    {/* Remove button */}
                                    <button
                                        onClick={() => handleRemove(buddy.id)}
                                        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors z-10"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    <Link to={`/buddy/${buddy.id}`}>
                                        {/* Photo */}
                                        <div className="mb-4">
                                            <img
                                                src={buddy.photoUrl}
                                                alt={buddy.name}
                                                className="w-full aspect-square object-cover rounded-xl"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-lg mb-1">{buddy.name}</h3>
                                                    <p className="text-sm text-ink-400">{buddy.college}</p>
                                                </div>
                                                <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-lg">
                                                    <Star size={14} className="text-yellow-600" fill="currentColor" />
                                                    <span className="text-sm font-bold">{buddy.rating}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-ink-400">
                                                <MapPin size={14} />
                                                <span>{buddy.location}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-ink-400">
                                                <Clock size={14} />
                                                <span>Responds in {buddy.responseTime}</span>
                                            </div>

                                            <div className="flex flex-wrap gap-1">
                                                {buddy.languages.slice(0, 3).map((lang) => (
                                                    <span
                                                        key={lang}
                                                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                                    >
                                                        {lang}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="text-xs text-ink-400">
                                                Saved on {buddy.savedDate.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </Link>

                                    {/* Actions */}
                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        <Link to={`/buddy/${buddy.id}`}>
                                            <ElasticButton className="w-full !py-2 text-sm">
                                                View Profile
                                            </ElasticButton>
                                        </Link>
                                        <Link to={`/dashboard/messages`}>
                                            <ElasticButton variant="secondary" className="w-full !py-2 text-sm gap-1">
                                                <MessageSquare size={14} />
                                                Message
                                            </ElasticButton>
                                        </Link>
                                    </div>
                                </FluidCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <FluidCard className="mt-8 text-center bg-primary/5">
                        <h3 className="font-bold mb-2">Looking for more buddies?</h3>
                        <p className="text-sm text-ink-400 mb-4">
                            Explore our verified local experts
                        </p>
                        <Link to="/search">
                            <ElasticButton variant="secondary">Browse All Buddies</ElasticButton>
                        </Link>
                    </FluidCard>
                </>
            )}
        </div>
    );
};
