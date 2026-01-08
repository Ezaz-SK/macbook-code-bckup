import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

export const CityGrid = () => {
    const navigate = useNavigate();

    const areas = [
        {
            id: 'delhi-localities',
            name: 'Delhi',
            city: 'All Localities',
            tags: ['30+ Localities', 'All Zones', 'Metro Info'],
            image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800',
            color: 'from-orange-500 to-red-600',
            path: '/search/delhi'
        },
        {
            id: 'bangalore-kora',
            name: 'Koramangala',
            city: 'Bangalore',
            tags: ['Startup HQ', 'Nightlife'],
            image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=800',
            color: 'from-purple-500 to-indigo-600',
            path: '/search?zone=Koramangala'
        },
        {
            id: 'pune-hinjewadi',
            name: 'Hinjewadi',
            city: 'Pune',
            tags: ['IT Park', 'Quiet Life'],
            image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800',
            color: 'from-green-500 to-teal-600',
            path: '/search?zone=Hinjewadi'
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-ink-900 mb-2">Trending Areas</h2>
                        <p className="text-ink-400">Most searched locations this week</p>
                    </div>
                    <button
                        onClick={() => navigate('/search')}
                        className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                    >
                        View all <ArrowRight size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {areas.map((area) => (
                        <motion.div
                            key={area.id}
                            whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                            className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                            onClick={() => navigate(area.path)}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={area.image}
                                    alt={area.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                                    <MapPin size={16} />
                                    {area.city}
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">{area.name}</h3>

                                <div className="flex flex-wrap gap-2">
                                    {area.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
