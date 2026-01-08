import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search, MapPin, Star, TrendingUp, Shield,
    CheckCircle, MessageCircle, Calendar, ChevronDown,
    ArrowRight, Gift, Truck, Armchair, Home
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { DELHI_LOCALITIES, getPopularLocalities } from '@/data/delhiLocalities';
import { getRecommendedBuddies } from '@/data/finderRecommendations';

// Mock Partner Offers
const PARTNER_OFFERS = [
    {
        id: 1,
        name: 'Furlenco',
        title: 'Get 20% Off Furniture Rental',
        description: 'Furnish your new home starting at ₹999/mo',
        icon: Armchair,
        color: 'bg-blue-50 text-blue-600',
        code: 'SHIFT20'
    },
    {
        id: 2,
        name: 'Agarwal Packers',
        title: 'Flat ₹1000 Off Moving',
        description: 'Safe and secure relocation services',
        icon: Truck,
        color: 'bg-orange-50 text-orange-600',
        code: 'BUDDY1000'
    },
    {
        id: 3,
        name: 'SleepyCat',
        title: 'Free Mattress Trial',
        description: 'Try for 100 nights risk-free',
        icon: Home,
        color: 'bg-purple-50 text-purple-600',
        code: 'SLEEPFREE'
    }
];

export const NewFinderDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedLocality, setSelectedLocality] = useState('');

    // Get recommendations
    const popularLocalities = getPopularLocalities().slice(0, 4);
    const suggestedBuddies = getRecommendedBuddies(
        user?.finderPreferences?.destinationCity,
        user?.finderPreferences?.budgetRange,
        user?.finderPreferences?.preferredLanguage
    );

    const handleSearch = () => {
        if (selectedLocality) {
            navigate(`/search/delhi?locality=${selectedLocality}`);
        } else {
            navigate('/search/delhi');
        }
    };

    const handleLocalityClick = (localityId: string) => {
        navigate(`/search/delhi?locality=${localityId}`);
    };

    return (
        <div className="py-8">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 text-center"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4">
                    <span className="text-xs font-bold text-primary tracking-wide uppercase">Welcome to ShiftBuddy</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-ink-900">
                    Let's get you settled in <span className="text-primary">Delhi</span>
                </h1>
                <p className="text-xl text-ink-500 max-w-2xl mx-auto mb-8">
                    Connect with local experts who make your move seamless, safe, and stress-free.
                </p>

                {/* Main Search Bar */}
                <div className="max-w-2xl mx-auto relative z-10">
                    <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 flex gap-2">
                        <div className="flex-1 relative">
                            <select
                                value={selectedLocality}
                                onChange={(e) => setSelectedLocality(e.target.value)}
                                className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition-all appearance-none cursor-pointer text-ink-900 font-medium"
                            >
                                <option value="">Search locality (e.g. Hauz Khas)</option>
                                {DELHI_LOCALITIES.map(loc => (
                                    <option key={loc.id} value={loc.id}>
                                        {loc.name} ({loc.zone})
                                    </option>
                                ))}
                            </select>
                            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                        </div>
                        <ElasticButton onClick={handleSearch} className="!px-8 !h-12 !rounded-xl">
                            Search
                        </ElasticButton>
                    </div>
                </div>
            </motion.div>

            {/* Partner Offers - Exclusive for New Users */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
            >
                <div className="flex items-center justify-between mb-4 px-1">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Gift className="text-primary" size={20} />
                        Exclusive Partner Offers
                    </h2>
                    <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        New User Specials
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PARTNER_OFFERS.map((offer) => {
                        const Icon = offer.icon;
                        return (
                            <FluidCard key={offer.id} className="relative overflow-hidden group hover:border-primary/30 transition-all cursor-pointer">
                                <div className={`w-12 h-12 ${offer.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <Icon size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-1">{offer.title}</h3>
                                <p className="text-sm text-ink-500 mb-4">{offer.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-ink-600">
                                        Code: {offer.code}
                                    </span>
                                    <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Claim <ArrowRight size={14} />
                                    </span>
                                </div>
                            </FluidCard>
                        );
                    })}
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Recommended Localities */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <MapPin className="text-primary" size={20} />
                                Top Neighborhoods For You
                            </h2>
                            <Link to="/search/delhi" className="text-sm text-primary hover:underline">View All</Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {popularLocalities.map((locality) => (
                                <button
                                    key={locality.id}
                                    onClick={() => handleLocalityClick(locality.id)}
                                    className="p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-primary hover:shadow-md transition-all text-left group"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                            <MapPin size={20} className="text-primary" />
                                        </div>
                                        {locality.metroConnectivity && (
                                            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full uppercase tracking-wide">
                                                Metro
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-ink-900 mb-1 group-hover:text-primary transition-colors">
                                        {locality.name}
                                    </h3>
                                    <p className="text-sm text-ink-500 mb-2">{locality.zone} Delhi</p>
                                    <p className="text-xs font-medium text-primary">
                                        Rent: {locality.avgRent}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recommended Buddies */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <TrendingUp className="text-primary" size={20} />
                                Recommended Buddies
                            </h2>
                            <Link to="/search/delhi" className="text-sm text-primary hover:underline">View All</Link>
                        </div>
                        <div className="space-y-4">
                            {suggestedBuddies.slice(0, 3).map((buddy) => (
                                <Link
                                    key={buddy.id}
                                    to={`/buddy/${buddy.id}`}
                                    className="flex items-center gap-4 p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-primary hover:shadow-md transition-all group"
                                >
                                    <img
                                        src={buddy.photoUrl}
                                        alt={buddy.name}
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-ink-900 group-hover:text-primary transition-colors">
                                            {buddy.name}
                                        </h3>
                                        <p className="text-sm text-ink-500 mb-1">{buddy.specialization}</p>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="flex items-center gap-1 font-medium text-ink-900">
                                                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                                {buddy.rating}
                                            </span>
                                            <span className="text-ink-400">•</span>
                                            <span className="text-ink-500">{buddy.reviews} reviews</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-ink-400 mb-1">Starts from</p>
                                        <p className="font-bold text-primary">₹{buddy.startingPrice}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar - How It Works & Trust */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <FluidCard className="bg-primary/5 border-primary/10">
                            <h3 className="font-bold text-lg mb-4">How It Works</h3>
                            <div className="space-y-6">
                                {[
                                    { icon: Search, title: 'Browse', desc: 'Find verified buddies' },
                                    { icon: MessageCircle, title: 'Connect', desc: 'Chat & discuss needs' },
                                    { icon: Calendar, title: 'Book', desc: 'Schedule your move' },
                                    { icon: CheckCircle, title: 'Relax', desc: 'Get settled easily' }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="mt-1">
                                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                                                <step.icon size={14} />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">{step.title}</h4>
                                            <p className="text-xs text-ink-500">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FluidCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <FluidCard className="border-green-100 bg-green-50/50">
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="text-green-600" size={24} />
                                <h3 className="font-bold text-lg text-ink-900">ShiftBuddy Promise</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-ink-600">
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={14} className="text-green-600" />
                                    100% Verified Buddies
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={14} className="text-green-600" />
                                    Secure Payments
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={14} className="text-green-600" />
                                    24/7 Support
                                </li>
                            </ul>
                        </FluidCard>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
