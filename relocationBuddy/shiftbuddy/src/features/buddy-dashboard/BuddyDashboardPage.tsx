import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Calendar,
    Clock,
    Star,
    Eye,
    MessageSquare,
    DollarSign,
    CheckCircle
} from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { MOCK_BUDDY_STATS, MOCK_BUDDY_BOOKINGS } from '@/data/mockData';

export const BuddyDashboardPage = () => {
    const stats = MOCK_BUDDY_STATS;
    const pendingBookings = MOCK_BUDDY_BOOKINGS.filter(b => b.status === 'pending');
    const activeBookings = MOCK_BUDDY_BOOKINGS.filter(b => b.status === 'in-progress');

    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Buddy Dashboard</h1>
                <p className="text-ink-400">Manage your bookings and track your performance</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Earnings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <FluidCard className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-ink-400 mb-1">Total Earnings</p>
                                <h3 className="text-3xl font-bold text-primary">₹{stats.totalEarnings.toLocaleString()}</h3>
                                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                    <TrendingUp size={12} />
                                    +12% this month
                                </p>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <DollarSign className="text-primary" size={24} />
                            </div>
                        </div>
                    </FluidCard>
                </motion.div>

                {/* Active Bookings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <FluidCard className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-ink-400 mb-1">Active Bookings</p>
                                <h3 className="text-3xl font-bold text-blue-600">{stats.activeBookings}</h3>
                                <p className="text-xs text-ink-400 mt-1">In progress</p>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <Calendar className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </FluidCard>
                </motion.div>

                {/* Pending Requests */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <FluidCard className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-ink-400 mb-1">Pending Requests</p>
                                <h3 className="text-3xl font-bold text-amber-600">{stats.pendingRequests}</h3>
                                <p className="text-xs text-amber-600 mt-1">Needs attention</p>
                            </div>
                            <div className="p-3 bg-amber-500/10 rounded-xl">
                                <Clock className="text-amber-600" size={24} />
                            </div>
                        </div>
                    </FluidCard>
                </motion.div>

                {/* Average Rating */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <FluidCard className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-ink-400 mb-1">Average Rating</p>
                                <h3 className="text-3xl font-bold text-yellow-600">{stats.averageRating}</h3>
                                <p className="text-xs text-ink-400 mt-1">{stats.totalReviews} reviews</p>
                            </div>
                            <div className="p-3 bg-yellow-500/10 rounded-xl">
                                <Star className="text-yellow-600" size={24} fill="currentColor" />
                            </div>
                        </div>
                    </FluidCard>
                </motion.div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <FluidCard className="text-center">
                    <p className="text-2xl font-bold text-primary mb-1">₹{stats.monthEarnings.toLocaleString()}</p>
                    <p className="text-xs text-ink-400">This Month</p>
                </FluidCard>
                <FluidCard className="text-center">
                    <p className="text-2xl font-bold text-primary mb-1">{stats.completedBookings}</p>
                    <p className="text-xs text-ink-400">Completed</p>
                </FluidCard>
                <FluidCard className="text-center">
                    <p className="text-2xl font-bold text-primary mb-1">{stats.acceptanceRate}%</p>
                    <p className="text-xs text-ink-400">Accept Rate</p>
                </FluidCard>
                <FluidCard className="text-center">
                    <p className="text-2xl font-bold text-primary mb-1">{stats.profileViews}</p>
                    <p className="text-xs text-ink-400">Profile Views</p>
                </FluidCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Bookings */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Pending Requests */}
                    {pendingBookings.length > 0 && (
                        <FluidCard>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Clock className="text-amber-600" size={20} />
                                    Pending Requests
                                </h2>
                                <Link to="/buddy-dashboard/bookings?tab=pending">
                                    <span className="text-sm text-primary hover:underline">View All</span>
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {pendingBookings.slice(0, 2).map(booking => (
                                    <div key={booking.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex items-start gap-3">
                                            <img
                                                src={booking.finderPhoto}
                                                alt={booking.finderName}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{booking.finderName}</h4>
                                                <p className="text-sm text-ink-400">{booking.service}</p>
                                                <p className="text-xs text-ink-400 mt-1">
                                                    Move Date: {booking.moveDate.toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-primary">₹{booking.amount}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-3">
                                            <ElasticButton className="flex-1 !py-2 text-sm">
                                                Accept
                                            </ElasticButton>
                                            <ElasticButton variant="ghost" className="flex-1 !py-2 text-sm border border-gray-200">
                                                Decline
                                            </ElasticButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FluidCard>
                    )}

                    {/* Active Bookings */}
                    <FluidCard>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <CheckCircle className="text-blue-600" size={20} />
                                Active Bookings
                            </h2>
                            <Link to="/buddy-dashboard/bookings?tab=active">
                                <span className="text-sm text-primary hover:underline">View All</span>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {activeBookings.slice(0, 2).map(booking => {
                                const completedMilestones = booking.milestones.filter(m => m.status === 'completed').length;
                                const totalMilestones = booking.milestones.length;
                                const progress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

                                return (
                                    <Link key={booking.id} to={`/buddy-dashboard/bookings/${booking.id}`}>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                                            <div className="flex items-start gap-3 mb-3">
                                                <img
                                                    src={booking.finderPhoto}
                                                    alt={booking.finderName}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-semibold">{booking.finderName}</h4>
                                                    <p className="text-sm text-ink-400">{booking.service}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-primary">₹{booking.amount}</p>
                                                    <p className="text-xs text-ink-400">
                                                        {completedMilestones}/{totalMilestones} milestones
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Progress Bar */}
                                            <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    className="h-full bg-primary"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </FluidCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <FluidCard>
                        <h3 className="font-bold mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <Link to="/buddy-dashboard/calendar">
                                <ElasticButton variant="secondary" className="w-full !py-2 text-sm justify-start">
                                    <Calendar size={16} />
                                    Manage Calendar
                                </ElasticButton>
                            </Link>
                            <Link to="/buddy-dashboard/profile">
                                <ElasticButton variant="secondary" className="w-full !py-2 text-sm justify-start">
                                    <Eye size={16} />
                                    Edit Profile
                                </ElasticButton>
                            </Link>
                            <Link to="/buddy-dashboard/reviews">
                                <ElasticButton variant="secondary" className="w-full !py-2 text-sm justify-start">
                                    <Star size={16} />
                                    View Reviews
                                </ElasticButton>
                            </Link>
                            <Link to="/dashboard/messages">
                                <ElasticButton variant="secondary" className="w-full !py-2 text-sm justify-start">
                                    <MessageSquare size={16} />
                                    Messages
                                </ElasticButton>
                            </Link>
                        </div>
                    </FluidCard>

                    {/* Performance */}
                    <FluidCard>
                        <h3 className="font-bold mb-4">Performance</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-ink-400">Response Time</span>
                                <span className="font-semibold">{stats.responseTime}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-ink-400">Acceptance Rate</span>
                                <span className="font-semibold text-green-600">{stats.acceptanceRate}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-ink-400">Completed</span>
                                <span className="font-semibold">{stats.completedBookings}</span>
                            </div>
                        </div>
                    </FluidCard>

                    {/* Notifications */}
                    <FluidCard className="bg-primary/5 border-primary/20">
                        <h3 className="font-bold mb-2">💡 Tip of the Day</h3>
                        <p className="text-sm text-ink-400">
                            Responding within 1 hour increases your booking rate by 40%!
                        </p>
                    </FluidCard>
                </div>
            </div>
        </div>
    );
};
