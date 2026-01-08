import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    Clock,
    Eye,
    Target,
    MapPin,
    Award
} from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_BUDDY_STATS } from '@/data/mockData';

export const BuddyAnalyticsPage = () => {
    const stats = MOCK_BUDDY_STATS;

    // Client Demographics Data
    const ageDistribution = [
        { name: '18-25', value: 35, color: '#8B5CF6' },
        { name: '26-35', value: 45, color: '#3B82F6' },
        { name: '36-45', value: 15, color: '#10B981' },
        { name: '46+', value: 5, color: '#F59E0B' }
    ];

    const genderDistribution = [
        { name: 'Male', value: 55, color: '#3B82F6' },
        { name: 'Female', value: 40, color: '#EC4899' },
        { name: 'Other', value: 5, color: '#8B5CF6' }
    ];

    const topLocations = [
        { name: 'Koramangala', clients: 45 },
        { name: 'HSR Layout', clients: 32 },
        { name: 'Whitefield', clients: 28 },
        { name: 'Indiranagar', clients: 25 },
        { name: 'BTM Layout', clients: 20 }
    ];

    // Conversion Metrics
    const conversionFunnel = [
        { stage: 'Profile Views', count: 1250, percentage: 100 },
        { stage: 'Inquiries', count: 450, percentage: 36 },
        { stage: 'Booking Requests', count: 180, percentage: 14.4 },
        { stage: 'Confirmed Bookings', count: 150, percentage: 12 },
        { stage: 'Completed', count: 124, percentage: 9.9 }
    ];

    // Response Time by Hour
    const responseTimeByHour = [
        { hour: '9 AM', avgTime: 45 },
        { hour: '12 PM', avgTime: 30 },
        { hour: '3 PM', avgTime: 25 },
        { hour: '6 PM', avgTime: 40 },
        { hour: '9 PM', avgTime: 60 }
    ];

    // Profile Views Over Time
    const profileViews = [
        { month: 'Jun', views: 820 },
        { month: 'Jul', views: 950 },
        { month: 'Aug', views: 1100 },
        { month: 'Sep', views: 1180 },
        { month: 'Oct', views: 1300 },
        { month: 'Nov', views: 1250 }
    ];

    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Analytics & Insights</h1>
                <p className="text-ink-400">Deep dive into your performance metrics</p>
            </div>

            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <FluidCard className="bg-gradient-to-br from-primary/10 to-primary/5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-ink-400 mb-1">Conversion Rate</p>
                                <h3 className="text-3xl font-bold text-primary">12%</h3>
                                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                    <TrendingUp size={12} />
                                    +2.3% vs last month
                                </p>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Target className="text-primary" size={24} />
                            </div>
                        </div>
                    </FluidCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <FluidCard className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-ink-400 mb-1">Avg Response Time</p>
                                <h3 className="text-3xl font-bold text-blue-600">{stats.responseTime}</h3>
                                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                    <TrendingUp size={12} />
                                    15% faster
                                </p>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <Clock className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </FluidCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <FluidCard className="bg-gradient-to-br from-green-500/10 to-green-500/5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-ink-400 mb-1">Profile Views</p>
                                <h3 className="text-3xl font-bold text-green-600">{stats.profileViews}</h3>
                                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                    <TrendingUp size={12} />
                                    +180 this week
                                </p>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded-xl">
                                <Eye className="text-green-600" size={24} />
                            </div>
                        </div>
                    </FluidCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <FluidCard className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-ink-400 mb-1">Client Satisfaction</p>
                                <h3 className="text-3xl font-bold text-yellow-600">98%</h3>
                                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                    <Award size={12} />
                                    Excellent
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-500/10 rounded-xl">
                                <Users className="text-yellow-600" size={24} />
                            </div>
                        </div>
                    </FluidCard>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Client Demographics - Age */}
                <FluidCard>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Users className="text-primary" size={20} />
                        Client Age Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={ageDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {ageDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {ageDistribution.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-sm text-ink-400">{item.name}: {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </FluidCard>

                {/* Client Demographics - Gender */}
                <FluidCard>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Users className="text-primary" size={20} />
                        Client Gender Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={genderDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {genderDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {genderDistribution.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-sm text-ink-400">{item.name}: {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </FluidCard>
            </div>

            {/* Conversion Funnel */}
            <FluidCard className="mb-8">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Target className="text-primary" size={20} />
                    Conversion Funnel
                </h3>
                <div className="space-y-3">
                    {conversionFunnel.map((stage, index) => (
                        <div key={stage.stage}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">{stage.stage}</span>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-ink-400">{stage.count} users</span>
                                    <span className="text-sm font-bold text-primary">{stage.percentage}%</span>
                                </div>
                            </div>
                            <div className="bg-gray-200 h-8 rounded-lg overflow-hidden relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stage.percentage}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className={`h-full flex items-center px-3 text-white text-xs font-semibold ${index === 0 ? 'bg-blue-500' :
                                        index === 1 ? 'bg-blue-600' :
                                            index === 2 ? 'bg-primary' :
                                                index === 3 ? 'bg-green-500' :
                                                    'bg-green-600'
                                        }`}
                                >
                                    {stage.percentage >= 15 && stage.stage}
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 p-4 bg-primary/5 rounded-xl">
                    <p className="text-sm text-ink-600">
                        <strong>Insight:</strong> You're converting 12% of profile views into confirmed bookings,
                        which is above the industry average of 8-10%. Great job!
                    </p>
                </div>
            </FluidCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Response Time Analysis */}
                <FluidCard>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Clock className="text-primary" size={20} />
                        Response Time by Hour
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={responseTimeByHour}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hour" />
                            <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="avgTime"
                                stroke="#3B82F6"
                                strokeWidth={2}
                                name="Avg Response Time"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-ink-400 mt-2">
                        💡 Your fastest response times are between 12-3 PM
                    </p>
                </FluidCard>

                {/* Top Locations */}
                <FluidCard>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <MapPin className="text-primary" size={20} />
                        Top Client Locations
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={topLocations}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="clients" fill="#8B5CF6" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-ink-400 mt-2">
                        📍 Most of your clients are from Koramangala area
                    </p>
                </FluidCard>
            </div>

            {/* Profile Views Trend */}
            <FluidCard className="mb-8">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Eye className="text-primary" size={20} />
                    Profile Views Trend (Last 6 Months)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={profileViews}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="views"
                            stroke="#10B981"
                            strokeWidth={3}
                            name="Profile Views"
                        />
                    </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-xs text-ink-400 mb-1">Growth Rate</p>
                        <p className="text-lg font-bold text-green-600">+52%</p>
                        <p className="text-xs text-ink-400">vs 6 months ago</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-ink-400 mb-1">Peak Month</p>
                        <p className="text-lg font-bold text-blue-600">October</p>
                        <p className="text-xs text-ink-400">1,300 views</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-ink-400 mb-1">Avg Daily Views</p>
                        <p className="text-lg font-bold text-purple-600">42</p>
                        <p className="text-xs text-ink-400">Last 30 days</p>
                    </div>
                </div>
            </FluidCard>

            {/* Performance Tips */}
            <FluidCard className="bg-gradient-to-br from-primary/5 to-primary/10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    💡 Performance Tips
                </h3>
                <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg">
                        <p className="text-sm font-semibold mb-1">Keep your response time under 2 hours</p>
                        <p className="text-xs text-ink-400">
                            Clients are 3x more likely to book when you respond within 2 hours
                        </p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                        <p className="text-sm font-semibold mb-1">Update your availability regularly</p>
                        <p className="text-xs text-ink-400">
                            Profiles with updated calendars get 40% more inquiries
                        </p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                        <p className="text-sm font-semibold mb-1">Expand to nearby localities</p>
                        <p className="text-xs text-ink-400">
                            Consider adding HSR Layout and Whitefield to reach more clients
                        </p>
                    </div>
                </div>
            </FluidCard>
        </div>
    );
};
