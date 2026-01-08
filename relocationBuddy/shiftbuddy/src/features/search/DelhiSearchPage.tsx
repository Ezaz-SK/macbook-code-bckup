import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import {
    DELHI_LOCALITIES, DELHI_ZONES, DELHI_DISTRICTS,
    getPopularLocalities, getLocalitiesByZone,
    type DelhiLocality
} from '@/data/delhiLocalities';
import {
    Search, MapPin, TrendingUp, ChevronDown, Filter, X,
    Train, Home, Star
} from 'lucide-react';

export const DelhiSearchPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedZone, setSelectedZone] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [metroOnly, setMetroOnly] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const popularLocalities = getPopularLocalities();

    // Filter localities
    const filteredLocalities = DELHI_LOCALITIES.filter(loc => {
        const matchesSearch = searchQuery === '' ||
            loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            loc.zone.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesZone = selectedZone === '' || loc.zone === selectedZone;
        const matchesDistrict = selectedDistrict === '' || loc.district === selectedDistrict;
        const matchesMetro = !metroOnly || loc.metroConnectivity;

        return matchesSearch && matchesZone && matchesDistrict && matchesMetro;
    });

    const handleLocalityClick = (locality: DelhiLocality) => {
        // Navigate to buddy listings for this locality
        navigate(`/search?city=Delhi&locality=${locality.id}`);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedZone('');
        setSelectedDistrict('');
        setMetroOnly(false);
    };

    return (
        <div className="py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-ink-900 mb-4">
                    Find Your Perfect Buddy in Delhi
                </h1>
                <p className="text-xl text-ink-500 mb-8">
                    Search across {DELHI_LOCALITIES.length}+ localities in the capital
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
                    <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <div className="text-2xl font-bold text-primary mb-1">{DELHI_ZONES.length}</div>
                        <div className="text-xs text-ink-400">Zones</div>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <div className="text-2xl font-bold text-primary mb-1">{DELHI_LOCALITIES.length}+</div>
                        <div className="text-xs text-ink-400">Localities</div>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <div className="text-2xl font-bold text-primary mb-1">500+</div>
                        <div className="text-xs text-ink-400">Buddies</div>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-2xl font-bold text-ink-900">4.8</span>
                        </div>
                        <div className="text-xs text-ink-400">Rating</div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search localities (e.g., Hauz Khas, South Delhi...)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="mt-3 text-sm text-primary hover:underline flex items-center gap-1 mx-auto"
                    >
                        <Filter size={16} />
                        {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                    </button>
                </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-12 overflow-hidden"
                >
                    <FluidCard className="max-w-4xl mx-auto bg-white border-2 border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Filter size={20} className="text-primary" />
                                Advanced Filters
                            </h3>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-primary hover:underline flex items-center gap-1"
                            >
                                <X size={16} />
                                Clear All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Zone Filter */}
                            <div>
                                <label className="block text-sm font-medium text-ink-700 mb-2 flex items-center gap-2">
                                    <MapPin size={16} className="text-primary" />
                                    Zone
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedZone}
                                        onChange={(e) => setSelectedZone(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="">All Zones</option>
                                        {DELHI_ZONES.map(zone => (
                                            <option key={zone} value={zone.replace(' Delhi', '')}>{zone}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* District Filter */}
                            <div>
                                <label className="block text-sm font-medium text-ink-700 mb-2 flex items-center gap-2">
                                    <Home size={16} className="text-primary" />
                                    District
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedDistrict}
                                        onChange={(e) => setSelectedDistrict(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="">All Districts</option>
                                        {DELHI_DISTRICTS.map(district => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Metro Filter */}
                            <div>
                                <label className="block text-sm font-medium text-ink-700 mb-2 flex items-center gap-2">
                                    <Train size={16} className="text-primary" />
                                    Connectivity
                                </label>
                                <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 cursor-pointer hover:border-primary transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={metroOnly}
                                        onChange={(e) => setMetroOnly(e.target.checked)}
                                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <span className="text-sm">Metro Connected Only</span>
                                </label>
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                            <p className="text-sm text-ink-600">
                                Found <span className="font-semibold text-primary">{filteredLocalities.length}</span> localities
                            </p>
                        </div>
                    </FluidCard>
                </motion.div>
            )}

            {/* Popular Localities Section */}
            {searchQuery === '' && !showFilters && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-ink-900 mb-2">Popular Localities</h2>
                    <p className="text-ink-500 mb-6">Top recommended areas for relocation</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {popularLocalities.slice(0, 9).map((locality, index) => (
                            <motion.div
                                key={locality.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <LocalityCard
                                    locality={locality}
                                    onClick={() => handleLocalityClick(locality)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Search Results */}
            {(searchQuery !== '' || showFilters) && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-ink-900 mb-6">
                        {searchQuery ? `Results for "${searchQuery}"` : 'All Localities'}
                    </h2>

                    {filteredLocalities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredLocalities.map((locality, index) => (
                                <motion.div
                                    key={locality.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                >
                                    <LocalityCard
                                        locality={locality}
                                        onClick={() => handleLocalityClick(locality)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={32} className="text-ink-300" />
                            </div>
                            <h3 className="text-xl font-semibold text-ink-900 mb-2">No localities found</h3>
                            <p className="text-ink-500 mb-4">Try adjusting your filters or search query</p>
                            <ElasticButton onClick={clearFilters} variant="secondary">
                                Clear Filters
                            </ElasticButton>
                        </div>
                    )}
                </div>
            )}

            {/* Browse by Zone */}
            {searchQuery === '' && !showFilters && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-ink-900 mb-6">Browse by Zone</h2>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {DELHI_ZONES.map((zone) => {
                            const zoneKey = zone.replace(' Delhi', '');
                            const localitiesCount = getLocalitiesByZone(zoneKey as any).length;

                            return (
                                <button
                                    key={zone}
                                    onClick={() => {
                                        setSelectedZone(zoneKey);
                                        setShowFilters(true);
                                    }}
                                    className="p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-primary hover:shadow-sm transition-all text-left group"
                                >
                                    <div className="flex items-start gap-2 mb-2">
                                        <MapPin size={18} className="text-primary mt-0.5" />
                                        <h3 className="font-semibold text-ink-900 group-hover:text-primary transition-colors">
                                            {zone}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-ink-400">{localitiesCount} localities</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

// Locality Card Component
interface LocalityCardProps {
    locality: DelhiLocality;
    onClick: () => void;
}

const LocalityCard = ({ locality, onClick }: LocalityCardProps) => {
    return (
        <div
            onClick={onClick}
            className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-primary hover:shadow-md transition-all cursor-pointer group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="font-semibold text-lg text-ink-900 mb-1 group-hover:text-primary transition-colors">
                        {locality.name}
                    </h3>
                    <p className="text-sm text-ink-500 flex items-center gap-1">
                        <MapPin size={14} />
                        {locality.zone} Delhi
                    </p>
                </div>
                {locality.popular && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        <TrendingUp size={12} className="inline mr-1" />
                        Popular
                    </span>
                )}
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-1.5 mb-4">
                {locality.amenities.slice(0, 3).map((amenity, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-ink-600 text-xs rounded">
                        {amenity}
                    </span>
                ))}
                {locality.amenities.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-ink-400 text-xs rounded">
                        +{locality.amenities.length - 3}
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-ink-500">
                    {locality.metroConnectivity && (
                        <>
                            <Train size={14} className="text-green-600" />
                            <span>Metro</span>
                        </>
                    )}
                </div>
                {locality.avgRent && (
                    <div className="text-xs text-ink-400">
                        {locality.avgRent}
                    </div>
                )}
            </div>

            {/* CTA */}
            <button className="w-full mt-4 py-2 px-4 bg-primary/5 text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-all text-sm">
                Find Buddies →
            </button>
        </div>
    );
};
