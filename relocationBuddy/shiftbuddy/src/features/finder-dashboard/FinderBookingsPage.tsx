import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    CheckCircle,
    Clock,
    Star,
    MessageSquare,
    Download,
    XCircle
} from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { MOCK_BUDDY_BOOKINGS } from '@/data/mockData';

type TabType = 'current' | 'past' | 'upcoming' | 'cancelled';

export const FinderBookingsPage = () => {
    const [activeTab, setActiveTab] = useState<TabType>('current');
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const currentBookings = MOCK_BUDDY_BOOKINGS.filter(b => b.status === 'in-progress');
    const pastBookings = MOCK_BUDDY_BOOKINGS.filter(b => b.status === 'completed');
    const upcomingBookings = MOCK_BUDDY_BOOKINGS.filter(b => b.status === 'pending');
    const cancelledBookings = MOCK_BUDDY_BOOKINGS.filter(b => b.status === 'cancelled');

    const getBookingsByTab = () => {
        switch (activeTab) {
            case 'current':
                return currentBookings;
            case 'past':
                return pastBookings;
            case 'upcoming':
                return upcomingBookings;
            case 'cancelled':
                return cancelledBookings;
            default:
                return [];
        }
    };

    const tabs: { id: TabType; label: string; count: number; icon: any }[] = [
        { id: 'current', label: 'Current', count: currentBookings.length, icon: Clock },
        { id: 'upcoming', label: 'Upcoming', count: upcomingBookings.length, icon: Calendar },
        { id: 'past', label: 'Past', count: pastBookings.length, icon: CheckCircle },
        { id: 'cancelled', label: 'Cancelled', count: cancelledBookings.length, icon: XCircle }
    ];

    const handleReview = (booking: any) => {
        setSelectedBooking(booking);
        setShowReviewModal(true);
    };

    const submitReview = () => {
        console.log('Submitting review:', { booking: selectedBooking, rating, review });
        setShowReviewModal(false);
        setRating(0);
        setReview('');
        setSelectedBooking(null);
        alert('Thank you for your review!');
    };

    const bookings = getBookingsByTab();

    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
                <p className="text-ink-400">Manage and track all your relocation bookings</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2
                                ${activeTab === tab.id
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-gray-100 text-ink-600 hover:bg-gray-200'
                                }
                            `}
                        >
                            <Icon size={18} />
                            {tab.label}
                            <span className={`
                                px-2 py-0.5 rounded-full text-xs font-bold
                                ${activeTab === tab.id ? 'bg-white/20' : 'bg-white'}
                            `}>
                                {tab.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Bookings List */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                >
                    {bookings.length === 0 ? (
                        <FluidCard className="text-center py-12">
                            <div className="text-gray-300 mb-4">
                                {activeTab === 'current' && <Clock size={48} className="mx-auto" />}
                                {activeTab === 'upcoming' && <Calendar size={48} className="mx-auto" />}
                                {activeTab === 'past' && <CheckCircle size={48} className="mx-auto" />}
                                {activeTab === 'cancelled' && <XCircle size={48} className="mx-auto" />}
                            </div>
                            <h3 className="text-xl font-bold mb-2">No {activeTab} bookings</h3>
                            <p className="text-ink-400 mb-6">
                                {activeTab === 'current' && "You don't have any active bookings at the moment"}
                                {activeTab === 'upcoming' && "No upcoming bookings scheduled"}
                                {activeTab === 'past' && "You haven't completed any bookings yet"}
                                {activeTab === 'cancelled' && "No cancelled bookings"}
                            </p>
                            <Link to="/search">
                                <ElasticButton>Find a Buddy</ElasticButton>
                            </Link>
                        </FluidCard>
                    ) : (
                        bookings.map((booking, index) => {
                            const completedMilestones = booking.milestones.filter(m => m.status === 'completed').length;
                            const totalMilestones = booking.milestones.length;
                            const progress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

                            return (
                                <motion.div
                                    key={booking.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <FluidCard className="hover:shadow-lg transition-shadow">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Buddy Info */}
                                            <div className="flex items-start gap-4 flex-1">
                                                <img
                                                    src={booking.finderPhoto}
                                                    alt={booking.finderName}
                                                    className="w-16 h-16 rounded-xl object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-lg mb-1">{booking.finderName}</h3>
                                                    <p className="text-sm text-ink-400 mb-2">{booking.service}</p>
                                                    <div className="flex items-center gap-4 text-sm text-ink-400">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            {booking.moveDate.toLocaleDateString()}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Star size={14} className="text-yellow-500" fill="currentColor" />
                                                            4.8
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Booking Details */}
                                            <div className="flex flex-col items-end justify-between">
                                                <div className="text-right mb-4">
                                                    <p className="text-2xl font-bold text-primary mb-1">₹{booking.amount}</p>
                                                    <span className={`
                                                        px-3 py-1 rounded-full text-xs font-semibold
                                                        ${booking.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                                            booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                                booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                                    'bg-red-100 text-red-700'}
                                                    `}>
                                                        {booking.status === 'in-progress' ? 'In Progress' :
                                                            booking.status === 'completed' ? 'Completed' :
                                                                booking.status === 'pending' ? 'Pending' : 'Cancelled'}
                                                    </span>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <Link to="/dashboard/messages">
                                                        <ElasticButton variant="secondary" className="!py-2 text-sm gap-1">
                                                            <MessageSquare size={14} />
                                                            Message
                                                        </ElasticButton>
                                                    </Link>
                                                    {booking.status === 'completed' && (
                                                        <ElasticButton
                                                            onClick={() => handleReview(booking)}
                                                            className="!py-2 text-sm gap-1"
                                                        >
                                                            <Star size={14} />
                                                            Review
                                                        </ElasticButton>
                                                    )}
                                                    {(booking.status === 'completed' || booking.status === 'in-progress') && (
                                                        <ElasticButton variant="ghost" className="!py-2 text-sm gap-1 border border-gray-200">
                                                            <Download size={14} />
                                                            Invoice
                                                        </ElasticButton>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress Bar for Current Bookings */}
                                        {booking.status === 'in-progress' && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium">Progress</span>
                                                    <span className="text-sm text-ink-400">
                                                        {completedMilestones}/{totalMilestones} milestones
                                                    </span>
                                                </div>
                                                <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${progress}%` }}
                                                        className="h-full bg-primary"
                                                        transition={{ duration: 0.5 }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Milestones for Current Bookings */}
                                        {booking.status === 'in-progress' && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <h4 className="font-semibold mb-3 text-sm">Milestones</h4>
                                                <div className="space-y-2">
                                                    {booking.milestones.slice(0, 3).map((milestone, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <div className={`
                                                                w-5 h-5 rounded-full flex items-center justify-center
                                                                ${milestone.status === 'completed' ? 'bg-green-500' :
                                                                    milestone.status === 'in-progress' ? 'bg-blue-500' :
                                                                        'bg-gray-300'}
                                                            `}>
                                                                {milestone.status === 'completed' && (
                                                                    <CheckCircle size={12} className="text-white" />
                                                                )}
                                                            </div>
                                                            <span className={`text-sm ${milestone.status === 'completed' ? 'text-ink-600' : 'text-ink-400'
                                                                }`}>
                                                                {milestone.title}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </FluidCard>
                                </motion.div>
                            );
                        })
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Review Modal */}
            {showReviewModal && selectedBooking && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 max-w-md w-full"
                    >
                        <h3 className="text-xl font-bold mb-4">Rate Your Experience</h3>
                        <p className="text-ink-400 mb-4">
                            How was your experience with {selectedBooking.finderName}?
                        </p>

                        {/* Star Rating */}
                        <div className="flex justify-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star
                                        size={32}
                                        className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}
                                        fill={star <= rating ? 'currentColor' : 'none'}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Review Text */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Your Review</label>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Tell us about your experience..."
                                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                rows={4}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <ElasticButton
                                onClick={submitReview}
                                disabled={rating === 0 || !review.trim()}
                                className="flex-1"
                            >
                                Submit Review
                            </ElasticButton>
                            <ElasticButton
                                variant="ghost"
                                onClick={() => {
                                    setShowReviewModal(false);
                                    setRating(0);
                                    setReview('');
                                    setSelectedBooking(null);
                                }}
                                className="flex-1 border border-gray-200"
                            >
                                Cancel
                            </ElasticButton>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
