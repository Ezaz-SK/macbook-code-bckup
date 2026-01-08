import { motion } from 'framer-motion';
import {
    TrendingUp,
    DollarSign,
    Download,
    CreditCard,
    Calendar
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import {
    MOCK_BUDDY_STATS,
    MOCK_TRANSACTIONS,
    MOCK_EARNINGS_DATA,
    MOCK_BOOKING_TRENDS
} from '@/data/mockData';

export const BuddyEarningsPage = () => {
    const stats = MOCK_BUDDY_STATS;
    const transactions = MOCK_TRANSACTIONS;
    const pendingPayout = transactions
        .filter(t => t.type === 'payout' && t.status === 'pending')
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Earnings & Analytics</h1>
                    <p className="text-ink-400">Track your income and performance</p>
                </div>
                <ElasticButton variant="secondary" className="gap-2">
                    <Download size={18} />
                    Download Report
                </ElasticButton>
            </div>

            {/* Earnings Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <FluidCard className="bg-gradient-to-br from-primary/10 to-primary/5">
                        <p className="text-sm text-ink-400 mb-1">Today's Earnings</p>
                        <h3 className="text-2xl font-bold text-primary mb-2">₹{stats.todayEarnings.toLocaleString()}</h3>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <TrendingUp size={12} />
                            +8% from yesterday
                        </p>
                    </FluidCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <FluidCard>
                        <p className="text-sm text-ink-400 mb-1">This Week</p>
                        <h3 className="text-2xl font-bold text-ink-900 mb-2">₹{stats.weekEarnings.toLocaleString()}</h3>
                        <p className="text-xs text-ink-400">From 4 bookings</p>
                    </FluidCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <FluidCard>
                        <p className="text-sm text-ink-400 mb-1">This Month</p>
                        <h3 className="text-2xl font-bold text-ink-900 mb-2">₹{stats.monthEarnings.toLocaleString()}</h3>
                        <p className="text-xs text-green-600">Target: 70% achieved</p>
                    </FluidCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <FluidCard className="bg-gradient-to-br from-amber-500/10 to-amber-500/5">
                        <p className="text-sm text-ink-400 mb-1">Pending Payout</p>
                        <h3 className="text-2xl font-bold text-amber-600 mb-2">₹{pendingPayout.toLocaleString()}</h3>
                        <ElasticButton className="w-full !py-1 text-xs mt-2">
                            Request Payout
                        </ElasticButton>
                    </FluidCard>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Earnings Trend */}
                <FluidCard>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <TrendingUp className="text-primary" size={20} />
                        Earnings Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={MOCK_EARNINGS_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="month"
                                stroke="#9CA3AF"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#9CA3AF"
                                style={{ fontSize: '12px' }}
                                tickFormatter={(value) => `₹${value / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}
                                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Earnings']}
                            />
                            <Line
                                type="monotone"
                                dataKey="earnings"
                                stroke="#6366F1"
                                strokeWidth={3}
                                dot={{ fill: '#6366F1', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </FluidCard>

                {/* Booking Trends */}
                <FluidCard>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Calendar className="text-blue-600" size={20} />
                        Booking Trends
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={MOCK_BOOKING_TRENDS}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="month"
                                stroke="#9CA3AF"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#9CA3AF"
                                style={{ fontSize: '12px' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}
                                formatter={(value: number) => [`${value} bookings`, 'Total']}
                            />
                            <Bar
                                dataKey="bookings"
                                fill="#3B82F6"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </FluidCard>
            </div>

            {/* Transaction History */}
            <FluidCard>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <DollarSign className="text-green-600" size={20} />
                        Transaction History
                    </h3>
                    <ElasticButton variant="ghost" className="text-sm !py-1 !px-3">
                        View All
                    </ElasticButton>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-2 text-sm font-semibold text-ink-400">Date</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-ink-400">Description</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-ink-400">Type</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-ink-400">Status</th>
                                <th className="text-right py-3 px-2 text-sm font-semibold text-ink-400">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(txn => (
                                <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-2 text-sm text-ink-400">
                                        {txn.date.toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-2 text-sm">{txn.description}</td>
                                    <td className="py-3 px-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${txn.type === 'payment' ? 'bg-blue-100 text-blue-700' :
                                                txn.type === 'payout' ? 'bg-green-100 text-green-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {txn.type}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${txn.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                txn.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2 text-right font-semibold text-primary">
                                        ₹{txn.amount.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </FluidCard>

            {/* Payment Method */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <FluidCard>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <CreditCard className="text-primary" size={20} />
                        Payment Methods
                    </h3>
                    <div className="space-y-3">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">Bank Account</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Primary</span>
                            </div>
                            <p className="text-sm text-ink-400">HDFC Bank - ****6789</p>
                        </div>
                        <ElasticButton variant="ghost" className="w-full border border-gray-200">
                            + Add Payment Method
                        </ElasticButton>
                    </div>
                </FluidCard>

                <FluidCard className="bg-gradient-to-br from-primary/5 to-primary/10">
                    <h3 className="font-bold text-lg mb-2">Boost Your Earnings!</h3>
                    <p className="text-sm text-ink-400 mb-4">
                        Complete these tasks to increase your monthly earnings:
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            ✅ Respond within 1 hour (+40% bookings)
                        </li>
                        <li className="flex items-center gap-2">
                            ✅ Maintain 4.5+ rating (+30% visibility)
                        </li>
                        <li className="flex items-center gap-2">
                            ⏳ Upload intro video (+50% trust)
                        </li>
                        <li className="flex items-center gap-2">
                            ⏳ Complete profile 100% (+25% clicks)
                        </li>
                    </ul>
                </FluidCard>
            </div>
        </div>
    );
};
