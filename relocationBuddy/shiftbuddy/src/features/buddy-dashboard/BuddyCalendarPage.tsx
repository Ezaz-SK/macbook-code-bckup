import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';

// Simple calendar helper
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
};

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface BlockedDate {
    date: Date;
    reason: string;
}

export const BuddyCalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([
        { date: new Date(2024, 11, 10), reason: 'Personal commitment' },
        { date: new Date(2024, 11, 15), reason: 'Out of town' },
        { date: new Date(2024, 11, 25), reason: 'Holiday - Christmas' },
    ]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [blockReason, setBlockReason] = useState('');

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const isDateBlocked = (day: number) => {
        return blockedDates.some(blocked => {
            const d = new Date(blocked.date);
            return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
        });
    };

    const isToday = (day: number) => {
        const today = new Date();
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    const handleDayClick = (day: number) => {
        const clickedDate = new Date(year, month, day);
        setSelectedDate(clickedDate);
        setShowBlockModal(true);
    };

    const handleBlockDate = () => {
        if (selectedDate && blockReason) {
            setBlockedDates([...blockedDates, { date: selectedDate, reason: blockReason }]);
            setShowBlockModal(false);
            setBlockReason('');
            setSelectedDate(null);
        }
    };

    const handleUnblockDate = (date: Date) => {
        setBlockedDates(blockedDates.filter(blocked => blocked.date.getTime() !== date.getTime()));
    };

    const renderCalendarDays = () => {
        const days = [];

        // Empty cells for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="aspect-square" />);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const blocked = isDateBlocked(day);
            const today = isToday(day);
            const isPast = new Date(year, month, day) < new Date(new Date().setHours(0, 0, 0, 0));

            days.push(
                <motion.button
                    key={day}
                    whileHover={{ scale: isPast ? 1 : 1.05 }}
                    whileTap={{ scale: isPast ? 1 : 0.95 }}
                    onClick={() => !isPast && handleDayClick(day)}
                    disabled={isPast}
                    className={`
                        aspect-square p-2 rounded-lg text-sm font-medium transition-colors
                        ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                        ${today ? 'ring-2 ring-primary' : ''}
                        ${blocked ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                            isPast ? 'bg-gray-50' :
                                'bg-gray-50 hover:bg-primary/10 hover:text-primary'}
                    `}
                >
                    {day}
                    {blocked && <div className="text-[8px] mt-0.5">Blocked</div>}
                </motion.button>
            );
        }

        return days;
    };

    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Calendar & Availability</h1>
                <p className="text-ink-400">Manage your availability and block out dates</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar */}
                <div className="lg:col-span-2">
                    <FluidCard>
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <CalendarIcon className="text-primary" size={24} />
                                {MONTHS[month]} {year}
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={previousMonth}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextMonth}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Weekday headers */}
                        <div className="grid grid-cols-7 gap-2 mb-2">
                            {WEEKDAYS.map(day => (
                                <div key={day} className="text-center text-sm font-semibold text-ink-400 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar grid */}
                        <div className="grid grid-cols-7 gap-2">
                            {renderCalendarDays()}
                        </div>

                        {/* Legend */}
                        <div className="mt-6 flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded border-2 border-primary"></div>
                                <span className="text-ink-400">Today</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-red-100"></div>
                                <span className="text-ink-400">Blocked</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-gray-100"></div>
                                <span className="text-ink-400">Available</span>
                            </div>
                        </div>
                    </FluidCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <FluidCard>
                        <h3 className="font-bold mb-4">Quick Block</h3>
                        <p className="text-sm text-ink-400 mb-4">
                            Click on any date in the calendar to block it
                        </p>
                        <ElasticButton
                            variant="secondary"
                            className="w-full !py-2 text-sm"
                            onClick={() => {
                                setSelectedDate(new Date());
                                setShowBlockModal(true);
                            }}
                        >
                            <Plus size={16} />
                            Block Today
                        </ElasticButton>
                    </FluidCard>

                    {/* Blocked Dates List */}
                    <FluidCard>
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Clock size={18} className="text-red-600" />
                            Blocked Dates ({blockedDates.length})
                        </h3>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto">
                            {blockedDates.length === 0 ? (
                                <p className="text-sm text-ink-400 text-center py-8">
                                    No blocked dates
                                </p>
                            ) : (
                                blockedDates
                                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                                    .map((blocked, index) => (
                                        <div
                                            key={index}
                                            className="p-3 bg-red-50 rounded-lg border border-red-100 flex items-start justify-between"
                                        >
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm">
                                                    {blocked.date.toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                                <p className="text-xs text-ink-400 mt-1">{blocked.reason}</p>
                                            </div>
                                            <button
                                                onClick={() => handleUnblockDate(blocked.date)}
                                                className="p-1 hover:bg-red-200 rounded transition-colors"
                                            >
                                                <X size={16} className="text-red-600" />
                                            </button>
                                        </div>
                                    ))
                            )}
                        </div>
                    </FluidCard>

                    {/* Tips */}
                    <FluidCard className="bg-primary/5 border-primary/20">
                        <h3 className="font-bold mb-2">💡 Pro Tip</h3>
                        <p className="text-sm text-ink-400">
                            Keep your calendar updated to avoid booking conflicts and maintain high client satisfaction.
                        </p>
                    </FluidCard>
                </div>
            </div>

            {/* Block Date Modal */}
            {showBlockModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 max-w-md w-full"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">Block Date</h3>
                            <button
                                onClick={() => {
                                    setShowBlockModal(false);
                                    setBlockReason('');
                                    setSelectedDate(null);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <p className="text-ink-400 mb-4">
                            {selectedDate && selectedDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Reason</label>
                            <textarea
                                value={blockReason}
                                onChange={(e) => setBlockReason(e.target.value)}
                                placeholder="Why are you blocking this date?"
                                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                rows={3}
                            />
                        </div>

                        <div className="flex gap-2">
                            <ElasticButton
                                onClick={handleBlockDate}
                                disabled={!blockReason}
                                className="flex-1"
                            >
                                Block Date
                            </ElasticButton>
                            <ElasticButton
                                variant="ghost"
                                onClick={() => {
                                    setShowBlockModal(false);
                                    setBlockReason('');
                                    setSelectedDate(null);
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
