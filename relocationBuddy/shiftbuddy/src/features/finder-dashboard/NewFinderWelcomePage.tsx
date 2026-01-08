import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { getRecommendedBuddies, getBuddiesByCity, type BuddyRecommendation } from '@/data/finderRecommendations';
import {
    Search, CheckCircle, MessageCircle, Star, MapPin, DollarSign,
    Filter, X, ChevronDown, Languages, Calendar, TrendingUp, Shield,
    Clock, User, Award
} from 'lucide-react';

interface NewFinderWelcomePageProps {
    onDismiss?: () => void;
}

export const NewFinderWelcomePage = ({ onDismiss }: NewFinderWelcomePageProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Filter states
    const [showFilters, setShowFilters] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState<string>(
        user?.finderPreferences?.budgetRange || ''
    );
    const [selectedLanguage, setSelectedLanguage] = useState<string>(
        user?.finderPreferences?.preferredLanguage || ''
    );
    const [sortBy, setSortBy] = useState<'rating' | 'price' | 'reviews'>('rating');

    const destinationCity = user?.finderPreferences?.destinationCity || 'your destination';

    // Get buddies based on filters
    const allBuddies = getBuddiesByCity(destinationCity);
    const filteredBuddies = getRecommendedBuddies(
        user?.finderPreferences?.destinationCity,
        selectedBudget || user?.finderPreferences?.budgetRange,
        selectedLanguage || user?.finderPreferences?.preferredLanguage
    );

    // Sort buddies
    const sortedBuddies = [...filteredBuddies].sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price') return a.startingPrice - b.startingPrice;
        return b.reviews - a.reviews;
    });

    const budgetOptions = [
        '₹2,000 - ₹5,000',
        '₹5,000 - ₹10,000',
        '₹10,000 - ₹20,000',
        '₹20,000+'
    ];

    const languageOptions = [
        'English', 'Hindi', 'Tamil', 'Telugu',
        'Kannada', 'Malayalam', 'Bengali', 'Marathi'
    ];

    const handleFindBuddy = () => {
        const params = new URLSearchParams();
        if (user?.finderPreferences?.destinationCity) {
            params.set('city', user.finderPreferences.destinationCity);
        }
        navigate(`/search?${params.toString()}`);
    };

    const handleViewBuddy = (buddyId: string) => {
        navigate(`/buddy/${buddyId}`);
    };

    const clearFilters = () => {
        setSelectedBudget(user?.finderPreferences?.budgetRange || '');
        setSelectedLanguage(user?.finderPreferences?.preferredLanguage || '');
        setSortBy('rating');
    };

    return (
        <div className="py-8">
            {/* Clean Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center max-w-4xl mx-auto"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-4">
                    <User size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">New User</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-ink-900">
                    Welcome, {user?.name}!
                </h1>
                <p className="text-xl text-ink-500 mb-8">
                    Find your perfect relocation buddy in{' '}
                    <span className="font-semibold text-primary">{destinationCity}</span>
                </p>

                {/* Quick Stats - Flat Design */}
                <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                    <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <div className="text-2xl font-bold text-ink-900 mb-1">{allBuddies.length}</div>
                        <div className="text-xs text-ink-400">Available</div>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Star size={18} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-2xl font-bold text-ink-900">4.8</span>
                        </div>
                        <div className="text-xs text-ink-400">Avg Rating</div>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <div className="text-2xl font-bold text-ink-900 mb-1">24/7</div>
                        <div className="text-xs text-ink-400">Support</div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <ElasticButton
                        onClick={handleFindBuddy}
                        className="!px-8 !py-3"
                    >
                        <Search size={18} className="mr-2" />
                        Browse All Buddies
                    </ElasticButton>
                    <ElasticButton
                        onClick={() => setShowFilters(!showFilters)}
                        variant="secondary"
                        className="!px-8 !py-3"
                    >
                        <Filter size={18} className="mr-2" />
                        {showFilters ? 'Hide' : 'Show'} Filters
                    </ElasticButton>
                </div>
            </motion.div>

            {/* Clean Filter Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8 overflow-hidden"
                    >
                        <FluidCard className="bg-white border-2 border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-ink-900 flex items-center gap-2">
                                    <Filter size={20} className="text-primary" />
                                    Filter & Sort
                                </h3>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                                >
                                    <X size={16} />
                                    Clear
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Budget Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-ink-700 mb-2 flex items-center gap-2">
                                        <DollarSign size={16} className="text-primary" />
                                        Budget Range
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedBudget}
                                            onChange={(e) => setSelectedBudget(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer text-sm"
                                        >
                                            <option value="">All Budgets</option>
                                            {budgetOptions.map((budget) => (
                                                <option key={budget} value={budget}>{budget}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Language Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-ink-700 mb-2 flex items-center gap-2">
                                        <Languages size={16} className="text-primary" />
                                        Language
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedLanguage}
                                            onChange={(e) => setSelectedLanguage(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer text-sm"
                                        >
                                            <option value="">All Languages</option>
                                            {languageOptions.map((lang) => (
                                                <option key={lang} value={lang}>{lang}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <label className="block text-sm font-medium text-ink-700 mb-2 flex items-center gap-2">
                                        <TrendingUp size={16} className="text-primary" />
                                        Sort By
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as any)}
                                            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer text-sm"
                                        >
                                            <option value="rating">Highest Rated</option>
                                            <option value="price">Lowest Price</option>
                                            <option value="reviews">Most Reviewed</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Filter Results */}
                            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                <p className="text-sm text-ink-600">
                                    Showing <span className="font-semibold text-primary">{sortedBuddies.length}</span> buddies
                                    {selectedBudget && <span> • {selectedBudget}</span>}
                                    {selectedLanguage && <span> • {selectedLanguage}</span>}
                                </p>
                            </div>
                        </FluidCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Buddy Cards - Clean Design */}
            {sortedBuddies.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-ink-900 mb-1">
                                {showFilters ? 'Filtered Results' : `Recommended Buddies`}
                            </h2>
                            <p className="text-sm text-ink-500 flex items-center gap-2">
                                <Shield size={14} className="text-green-600" />
                                All buddies are verified
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {sortedBuddies.map((buddy, index) => (
                            <motion.div
                                key={buddy.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * index }}
                            >
                                <CleanBuddyCard
                                    buddy={buddy}
                                    onView={() => handleViewBuddy(buddy.id)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* How It Works - Clean */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
            >
                <h2 className="text-2xl font-bold text-ink-900 text-center mb-2">How It Works</h2>
                <p className="text-center text-ink-500 mb-8">Simple steps to find your buddy</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    {[
                        {
                            icon: Search,
                            title: 'Browse',
                            description: 'Search verified buddies in your city'
                        },
                        {
                            icon: MessageCircle,
                            title: 'Connect',
                            description: 'Chat and discuss your requirements'
                        },
                        {
                            icon: Calendar,
                            title: 'Book',
                            description: 'Schedule services that fit your needs'
                        },
                        {
                            icon: CheckCircle,
                            title: 'Relocate',
                            description: 'Get seamless relocation support'
                        }
                    ].map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="p-6 bg-white border border-gray-200 rounded-xl hover:border-primary/30 hover:shadow-sm transition-all">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Icon size={24} className="text-primary" />
                                </div>
                                <h3 className="font-semibold text-ink-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-ink-500">{step.description}</p>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Trust Section - Clean */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
            >
                <div className="p-8 bg-white border-2 border-green-100 rounded-xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield size={32} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-ink-900 mb-2">Safety First</h2>
                        <p className="text-ink-600">Every buddy meets our verification standards</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: CheckCircle, label: 'ID Verified', value: '100%' },
                            { icon: Award, label: 'Background Check', value: '100%' },
                            { icon: Star, label: 'Rated 4.5+', value: '95%' },
                            { icon: Shield, label: 'Secure Payment', value: '100%' }
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <Icon size={20} className="text-green-600" />
                                    </div>
                                    <div className="text-xl font-bold text-ink-900 mb-1">{item.value}</div>
                                    <div className="text-xs text-ink-500">{item.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center space-y-3"
            >
                <ElasticButton
                    onClick={handleFindBuddy}
                    className="!px-10 !py-4 text-lg"
                >
                    Start Your Journey
                </ElasticButton>
                {onDismiss && (
                    <button
                        onClick={onDismiss}
                        className="flex items-center gap-1 mx-auto text-sm text-ink-400 hover:text-ink-600 transition-colors"
                    >
                        <Clock size={14} />
                        I'll explore later
                    </button>
                )}
            </motion.div>
        </div>
    );
};

// Clean Buddy Card Component
interface CleanBuddyCardProps {
    buddy: BuddyRecommendation;
    onView: () => void;
}

const CleanBuddyCard = ({ buddy, onView }: CleanBuddyCardProps) => {
    return (
        <div
            onClick={onView}
            className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
        >
            {/* Photo */}
            <div className="relative overflow-hidden">
                <img
                    src={buddy.photoUrl}
                    alt={buddy.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{buddy.rating}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-lg text-ink-900 mb-1 group-hover:text-primary transition-colors">
                    {buddy.name}
                </h3>
                <p className="text-sm text-ink-500 flex items-center gap-1 mb-3">
                    <MapPin size={14} className="flex-shrink-0" />
                    {buddy.specialization}
                </p>

                {/* Languages */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {buddy.languages.slice(0, 2).map((lang, i) => (
                        <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                            {lang}
                        </span>
                    ))}
                    {buddy.languages.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-ink-400 text-xs font-medium rounded">
                            +{buddy.languages.length - 2}
                        </span>
                    )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-3">
                    <div>
                        <div className="text-xs text-ink-400">Reviews</div>
                        <div className="text-sm font-semibold text-ink-900">{buddy.reviews}</div>
                    </div>
                    <div className="h-6 w-px bg-gray-200" />
                    <div className="text-right">
                        <div className="text-xs text-ink-400">From</div>
                        <div className="text-sm font-semibold text-primary">₹{buddy.startingPrice.toLocaleString()}</div>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onView();
                    }}
                    className="w-full py-2 px-4 bg-primary/5 text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-all text-sm"
                >
                    View Profile
                </button>
            </div>
        </div>
    );
};
