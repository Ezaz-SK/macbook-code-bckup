import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Video, FileText, MapPin } from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';

const MILESTONES = [
    {
        id: 1,
        title: 'Buddy Accepted',
        description: 'Waiting for Rahul to accept your request.',
        status: 'completed',
        icon: CheckCircle
    },
    {
        id: 2,
        title: 'Property Shortlist',
        description: 'Buddy is scouting 5 properties for you.',
        status: 'in-progress',
        icon: Clock
    },
    {
        id: 3,
        title: 'Live Tour',
        description: 'Video tour scheduled for tomorrow.',
        status: 'pending',
        icon: Video
    },
    {
        id: 4,
        title: 'Closing & Handover',
        description: 'Receive keys and survival guide.',
        status: 'pending',
        icon: FileText
    }
];

export const ExistingFinderDashboard = () => {
    const [activeStep] = useState(2);

    // Mock active bookings
    const activeBookings = [
        {
            id: 1,
            buddy: 'Rahul Sharma',
            service: 'House Hunting',
            progress: 60,
            nextMilestone: 'Property Visit',
            amount: 3000,
            locality: 'Hauz Khas'
        },
        {
            id: 2,
            buddy: 'Priya Patel',
            service: 'Negotiation Support',
            progress: 30,
            nextMilestone: 'Document Review',
            amount: 2000,
            locality: 'Saket'
        }
    ];

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-8">Mission Control</h1>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <FluidCard className="text-center bg-white border-2 border-gray-100">
                    <p className="text-3xl font-bold text-primary mb-1">2</p>
                    <p className="text-sm text-ink-400">Active Bookings</p>
                </FluidCard>
                <FluidCard className="text-center bg-white border-2 border-gray-100">
                    <p className="text-3xl font-bold text-green-600 mb-1">5</p>
                    <p className="text-sm text-ink-400">Completed</p>
                </FluidCard>
                <FluidCard className="text-center bg-white border-2 border-gray-100">
                    <p className="text-3xl font-bold text-yellow-600 mb-1">3</p>
                    <p className="text-sm text-ink-400">Saved Buddies</p>
                </FluidCard>
                <FluidCard className="text-center bg-white border-2 border-gray-100">
                    <p className="text-3xl font-bold text-blue-600 mb-1">2</p>
                    <p className="text-sm text-ink-400">New Messages</p>
                </FluidCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Active Bookings */}
                    <FluidCard>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg">Active Bookings</h3>
                            <Link to="/dashboard/bookings">
                                <span className="text-sm text-primary hover:underline">View All</span>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {activeBookings.map(booking => (
                                <div key={booking.id} className="p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h4 className="font-semibold">{booking.buddy}</h4>
                                            <p className="text-sm text-ink-400">{booking.service}</p>
                                            <p className="text-xs text-ink-400 flex items-center gap-1 mt-1">
                                                <MapPin size={12} />
                                                {booking.locality}
                                            </p>
                                        </div>
                                        <span className="font-bold text-primary">₹{booking.amount}</span>
                                    </div>
                                    <div className="mb-2">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-ink-400">Next: {booking.nextMilestone}</span>
                                            <span className="font-medium">{booking.progress}%</span>
                                        </div>
                                        <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${booking.progress}%` }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FluidCard>

                    {/* Milestones */}
                    {MILESTONES.map((milestone, index) => {
                        const isCompleted = index + 1 < activeStep;
                        const isCurrent = index + 1 === activeStep;
                        const Icon = milestone.icon;

                        return (
                            <FluidCard
                                key={milestone.id}
                                className={`flex items-start gap-4 ${isCurrent ? 'border-2 border-primary/20 bg-primary/5' : 'border-2 border-gray-100'}`}
                            >
                                <div className={`mt-1 ${isCompleted ? 'text-green-500' : isCurrent ? 'text-primary' : 'text-gray-300'}`}>
                                    <Icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-bold text-lg ${isCurrent ? 'text-primary' : ''}`}>{milestone.title}</h3>
                                    <p className="text-ink-400">{milestone.description}</p>

                                    {isCurrent && milestone.id === 2 && (
                                        <div className="mt-4 bg-white p-4 rounded-xl border border-gray-100">
                                            <p className="text-sm font-medium mb-2">Uploaded Shortlist (3/5)</p>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '60%' }}
                                                    className="h-full bg-primary"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </FluidCard>
                        );
                    })}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Your Buddy */}
                    <FluidCard className="border-2 border-gray-100">
                        <h3 className="font-bold mb-4">Your Buddy</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60"
                                alt="Rahul"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-bold">Rahul Sharma</p>
                                <p className="text-xs text-ink-400">Hauz Khas Specialist</p>
                            </div>
                        </div>
                        <Link to="/dashboard/messages">
                            <ElasticButton variant="secondary" className="w-full text-sm">
                                Chat with Rahul
                            </ElasticButton>
                        </Link>
                    </FluidCard>

                    {/* Quick Actions */}
                    <FluidCard className="border-2 border-gray-100">
                        <h3 className="font-bold mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <Link to="/search/delhi">
                                <ElasticButton variant="ghost" className="w-full text-sm border border-gray-200 justify-start">
                                    <Clock size={16} className="mr-2" />
                                    Find Buddies
                                </ElasticButton>
                            </Link>
                            <Link to="/dashboard/bookings">
                                <ElasticButton variant="ghost" className="w-full text-sm border border-gray-200 justify-start">
                                    <FileText size={16} className="mr-2" />
                                    My Bookings
                                </ElasticButton>
                            </Link>
                            <Link to="/dashboard/saved">
                                <ElasticButton variant="ghost" className="w-full text-sm border border-gray-200 justify-start">
                                    <Clock size={16} className="mr-2" />
                                    Saved Buddies
                                </ElasticButton>
                            </Link>
                            <Link to="/dashboard/messages">
                                <ElasticButton variant="ghost" className="w-full text-sm border border-gray-200 justify-start">
                                    <CheckCircle size={16} className="mr-2" />
                                    Messages
                                </ElasticButton>
                            </Link>
                        </div>
                    </FluidCard>

                    {/* Saved Buddies Widget */}
                    <FluidCard className="border-2 border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold">Saved Buddies</h3>
                            <Link to="/dashboard/saved">
                                <span className="text-xs text-primary hover:underline">View All</span>
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            {[1, 2, 3].map((i) => (
                                <img
                                    key={i}
                                    src={`https://images.unsplash.com/photo-${i === 1 ? '1506794778202-cad84cf45f1d' : i === 2 ? '1544005313-94ddf0286df2' : '1494790108377-be9c29b29330'}?w=100&auto=format&fit=crop&q=60`}
                                    alt="Buddy"
                                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                            ))}
                        </div>
                    </FluidCard>

                    {/* Need Help */}
                    <FluidCard className="border-2 border-green-100 bg-green-50/50">
                        <h3 className="font-bold mb-2">Need Help?</h3>
                        <p className="text-sm text-ink-600 mb-4">
                            Our Delhi support team is available 24/7 to assist you.
                        </p>
                        <ElasticButton variant="ghost" className="w-full text-sm border border-green-200 bg-white">
                            Contact Support
                        </ElasticButton>
                    </FluidCard>
                </div>
            </div>
        </div>
    );
};
