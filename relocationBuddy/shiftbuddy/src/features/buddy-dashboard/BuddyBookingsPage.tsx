import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock,
    CheckCircle,
    XCircle,
    Calendar,
    DollarSign,
    MessageSquare
} from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { MOCK_BUDDY_BOOKINGS, type Booking } from '@/data/mockData';

type TabType = 'pending' | 'active' | 'completed' | 'cancelled';

export const BuddyBookingsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = (searchParams.get('tab') as TabType) || 'pending';

    const setActiveTab = (tab: TabType) => {
        setSearchParams({ tab });
    };

    const tabs: { key: TabType; label: string; icon: any; color: string }[] = [
        { key: 'pending', label: 'Pending', icon: Clock, color: 'amber' },
        { key: 'active', label: 'Active', icon: CheckCircle, color: 'blue' },
        { key: 'completed', label: 'Completed', icon: CheckCircle, color: 'green' },
        { key: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'red' }
    ];

    const getBookingsByStatus = (status: string) => {
        if (status === 'active') return MOCK_BUDDY_BOOKINGS.filter(b => b.status === 'in-progress');
        if (status === 'cancelled') return []; // No cancelled bookings in mock data
        return MOCK_BUDDY_BOOKINGS.filter(b => b.status === status);
    };

    const bookings = getBookingsByStatus(activeTab);

    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Manage Bookings</h1>
                <p className="text-ink-400">Track and manage all your booking requests</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const count = getBookingsByStatus(tab.key).length;
                    const isActive = activeTab === tab.key;

                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive
                                ? `bg-${tab.color}-500/10 text-${tab.color}-600 border-2 border-${tab.color}-500/30`
                                : 'bg-gray-100 text-ink-400 hover:bg-gray-200'
                                }`}
                        >
                            <Icon size={18} />
                            {tab.label}
                            {count > 0 && (
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isActive ? `bg-${tab.color}-500/20` : 'bg-gray-200'
                                    }`}>
                                    {count}
                                </span>
                            )}
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
                            <p className="text-ink-400 mb-4">No {activeTab} bookings</p>
                            {activeTab === 'pending' && (
                                <p className="text-sm text-ink-400">New booking requests will appear here</p>
                            )}
                        </FluidCard>
                    ) : (
                        bookings.map(booking => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                tab={activeTab}
                            />
                        ))
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

interface BookingCardProps {
    booking: Booking;
    tab: TabType;
}

const BookingCard = ({ booking, tab }: BookingCardProps) => {
    const completedMilestones = booking.milestones.filter(m => m.status === 'completed').length;
    const totalMilestones = booking.milestones.length;
    const progress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

    return (
        <FluidCard className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Left - Client Info */}
                <div className="flex items-start gap-4 flex-1">
                    <img
                        src={booking.finderPhoto}
                        alt={booking.finderName}
                        className="w-16 h-16 rounded-2xl object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h3 className="font-bold text-lg">{booking.finderName}</h3>
                                <p className="text-ink-400 text-sm">{booking.service}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                booking.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                    booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        'bg-red-100 text-red-700'
                                }`}>
                                {booking.status === 'in-progress' ? 'Active' : booking.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            <div className="flex items-center gap-2 text-sm text-ink-400">
                                <Calendar size={16} />
                                <span>Move: {booking.moveDate.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-ink-400">
                                <DollarSign size={16} />
                                <span className="font-semibold text-primary">₹{booking.amount}</span>
                            </div>
                        </div>

                        {/* Progress for active bookings */}
                        {tab === 'active' && totalMilestones > 0 && (
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-ink-400">
                                        Progress: {completedMilestones}/{totalMilestones} milestones
                                    </span>
                                    <span className="text-xs font-semibold text-primary">{Math.round(progress)}%</span>
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
                    </div>
                </div>

                {/* Right - Actions */}
                <div className="flex md:flex-col gap-2 md:min-w-[140px]">
                    {tab === 'pending' && (
                        <>
                            <ElasticButton className="flex-1 md:flex-auto !py-2 text-sm">
                                Accept
                            </ElasticButton>
                            <ElasticButton
                                variant="ghost"
                                className="flex-1 md:flex-auto !py-2 text-sm border border-gray-200"
                            >
                                Decline
                            </ElasticButton>
                        </>
                    )}

                    {tab === 'active' && (
                        <>
                            <Link to={`/buddy-dashboard/bookings/${booking.id}`} className="flex-1">
                                <ElasticButton className="w-full !py-2 text-sm">
                                    View Details
                                </ElasticButton>
                            </Link>
                            <ElasticButton
                                variant="secondary"
                                className="flex-1 md:flex-auto !py-2 text-sm"
                            >
                                <MessageSquare size={16} />
                                Message
                            </ElasticButton>
                        </>
                    )}

                    {tab === 'completed' && (
                        <Link to={`/buddy-dashboard/bookings/${booking.id}`} className="flex-1">
                            <ElasticButton
                                variant="secondary"
                                className="w-full !py-2 text-sm"
                            >
                                View Details
                            </ElasticButton>
                        </Link>
                    )}

                    {tab === 'cancelled' && (
                        <ElasticButton
                            variant="ghost"
                            className="flex-1 md:flex-auto !py-2 text-sm border border-gray-200"
                        >
                            View Reason
                        </ElasticButton>
                    )}
                </div>
            </div>
        </FluidCard>
    );
};
