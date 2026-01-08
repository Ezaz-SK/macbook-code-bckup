import { useState, useEffect } from 'react';
import { MapPin, Star, Shield, CreditCard, Clock } from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { VerifiedBadge } from '@/components/ui/VerifiedBadge';
import { BookingModal } from '@/features/booking/components/BookingModal';
import { IDCardModal } from '@/components/ui/IDCardModal';

// Mock Data (In a real app, fetch from Supabase)
const MOCK_BUDDY_DETAILS = {
    id: '1',
    name: 'Rahul Sharma',
    college: 'Christ University',
    location: 'Koramangala, Bangalore',
    languages: ['English', 'Hindi', 'Kannada'],
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60',
    coverUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&auto=format&fit=crop&q=60',
    rating: 4.8,
    reviews: 124,
    helpedCount: 52,
    bio: "Hey! I'm Rahul, a 3rd-year BBA student at Christ. I've lived in Koramangala for 5 years and know every PG, cafe, and shortcut in the area. I specialize in finding student-friendly housing that doesn't break the bank. Let's get you settled!",
    gigs: [
        { id: 1, title: 'Found 2BHK for Amit', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&auto=format&fit=crop&q=60' },
        { id: 2, title: 'PG Hunt for Sarah', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&auto=format&fit=crop&q=60' },
        { id: 3, title: 'Negotiated Rent', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&auto=format&fit=crop&q=60' }
    ]
};

export const BuddyProfilePage = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isIDCardOpen, setIsIDCardOpen] = useState(false);

    // In real app, fetch buddy by ID
    const buddy = MOCK_BUDDY_DETAILS;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pb-20">
            {/* Cover Image */}
            <div className="h-48 md:h-64 w-full overflow-hidden">
                <img src={buddy.coverUrl} alt="Cover" className="w-full h-full object-cover" />
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Profile Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <img
                                src={buddy.photoUrl}
                                alt={buddy.name}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-sm"
                            />
                            <div className="flex-1 pt-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <h1 className="text-3xl font-bold text-ink-900">{buddy.name}</h1>
                                    <VerifiedBadge size={24} />
                                </div>
                                <p className="text-ink-400 flex items-center gap-2 mb-4">
                                    <MapPin size={16} /> {buddy.location}
                                </p>

                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full">
                                        <Star size={16} className="fill-yellow-500 text-yellow-500" />
                                        <span className="font-bold">{buddy.rating}</span> ({buddy.reviews} reviews)
                                    </div>
                                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                                        <Shield size={16} />
                                        <span>{buddy.helpedCount} people helped</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2 hidden md:block">
                                <button
                                    onClick={() => setIsIDCardOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-medium hover:bg-primary/20 transition-colors"
                                >
                                    <CreditCard size={18} />
                                    View Buddy ID
                                </button>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 my-6" />

                        <div>
                            <h2 className="text-xl font-bold mb-3 text-ink-900">About Me</h2>
                            <p className="text-ink-400 leading-relaxed">{buddy.bio}</p>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-bold mb-3 text-ink-900">Languages</h2>
                            <div className="flex gap-2">
                                {buddy.languages.map(lang => (
                                    <span key={lang} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-ink-900">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-bold mb-4 text-ink-900">Previous Gigs</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {buddy.gigs.map(gig => (
                                    <div key={gig.id} className="space-y-2 group cursor-pointer">
                                        <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                                            <img
                                                src={gig.image}
                                                alt={gig.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <p className="font-medium text-sm text-ink-900">{gig.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <FluidCard className="border-2 border-primary/10">
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <p className="text-ink-400 text-sm">Starting from</p>
                                        <p className="text-3xl font-bold text-primary">₹999</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-green-600 flex items-center gap-1">
                                            <Clock size={14} /> Available Today
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-ink-400">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">1</div>
                                        <span>Video Consultation</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-ink-400">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">2</div>
                                        <span>Property Shortlist (5)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-ink-400">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">3</div>
                                        <span>Live Video Tour</span>
                                    </div>
                                </div>

                                <ElasticButton
                                    className="w-full mb-3"
                                    onClick={() => setIsBookingOpen(true)}
                                >
                                    Book {buddy.name.split(' ')[0]}
                                </ElasticButton>



                                <p className="text-xs text-center text-ink-400 mt-4">
                                    Free cancellation up to 24 hours before.
                                </p>
                            </FluidCard>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                buddyName={buddy.name}
                price={999}
            />

            <IDCardModal
                isOpen={isIDCardOpen}
                onClose={() => setIsIDCardOpen(false)}
                buddy={buddy}
            />
        </div>
    );
};
