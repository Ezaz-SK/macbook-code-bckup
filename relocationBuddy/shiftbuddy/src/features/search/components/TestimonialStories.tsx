import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

export const TestimonialStories = () => {
    const [activeStory, setActiveStory] = useState<string | null>(null);

    const stories = [
        {
            id: 'story-1',
            name: 'Priya',
            role: 'Student',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
            video: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4', // Mock video
            quote: "Saved ₹5k on rent!",
        },
        {
            id: 'story-2',
            name: 'Arjun',
            role: 'Techie',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
            video: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4',
            quote: "Found a flat in 2 days.",
        },
        {
            id: 'story-3',
            name: 'Sara',
            role: 'Designer',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
            video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-laptop-at-home-309-large.mp4',
            quote: "Safe area for girls.",
        },
        {
            id: 'story-4',
            name: 'Dev',
            role: 'Founder',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
            video: 'https://assets.mixkit.co/videos/preview/mixkit-man-typing-on-laptop-307-large.mp4',
            quote: "Best local advice.",
        },
    ];

    return (
        <section className="py-12 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-center text-ink-400 text-sm font-semibold uppercase tracking-widest mb-8">
                    Real Stories from Real Finders
                </h3>

                <div className="flex justify-center gap-8 overflow-x-auto pb-4 scrollbar-hide">
                    {stories.map((story) => (
                        <div key={story.id} className="flex flex-col items-center gap-3 cursor-pointer group" onClick={() => setActiveStory(story.id)}>
                            <div className="relative">
                                {/* Story Ring */}
                                <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full p-[2px] animate-spin-slow" />

                                <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden">
                                    <img src={story.image} alt={story.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play size={20} className="text-white fill-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-ink-900">{story.name}</p>
                                <p className="text-xs text-ink-400">{story.quote}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {activeStory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setActiveStory(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-sm w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveStory(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                            >
                                <X size={24} />
                            </button>

                            {/* Mock Video Player */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                <p className="text-white/50">Video Placeholder for {stories.find(s => s.id === activeStory)?.name}</p>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-white font-bold text-xl">{stories.find(s => s.id === activeStory)?.name}</h3>
                                <p className="text-white/80">{stories.find(s => s.id === activeStory)?.role}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
