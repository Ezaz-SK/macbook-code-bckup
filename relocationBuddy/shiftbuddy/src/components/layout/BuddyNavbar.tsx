import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
    LayoutDashboard,
    Calendar as CalendarIcon,
    DollarSign,
    Star,
    CalendarDays,
    User,
    BarChart3,
    LogOut,
    ChevronDown
} from 'lucide-react';

export const BuddyNavbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    const navLinks = [
        { to: '/buddy-dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/buddy-dashboard/bookings', label: 'Bookings', icon: CalendarIcon },
        { to: '/buddy-dashboard/earnings', label: 'Earnings', icon: DollarSign },
        { to: '/buddy-dashboard/reviews', label: 'Reviews', icon: Star },
        { to: '/buddy-dashboard/calendar', label: 'Calendar', icon: CalendarDays },
        { to: '/buddy-dashboard/profile', label: 'Profile', icon: User },
        { to: '/buddy-dashboard/analytics', label: 'Analytics', icon: BarChart3 }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/buddy-dashboard" className="text-xl font-bold text-primary flex items-center gap-2">
                    <span className="text-2xl">🚀</span> ShiftBuddy
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-semibold">
                        BUDDY
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden xl:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive(link.to)
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-ink-600 hover:bg-gray-100 hover:text-primary'
                                    }`}
                            >
                                <Icon size={16} />
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* User Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <img
                            src={user?.photoUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60'}
                            alt={user?.name}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="hidden md:block text-sm font-medium text-ink-900">
                            {user?.name}
                        </span>
                        <ChevronDown size={16} className={`text-ink-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-semibold text-ink-900">{user?.name}</p>
                                <p className="text-xs text-ink-400">{user?.email}</p>
                                <p className="text-xs text-accent font-medium mt-1">Buddy Account</p>
                            </div>

                            <Link
                                to="/buddy-dashboard/profile"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-ink-600 hover:bg-gray-50 transition-colors"
                                onClick={() => setShowDropdown(false)}
                            >
                                <User size={16} />
                                My Profile
                            </Link>

                            <button
                                onClick={() => {
                                    logout();
                                    setShowDropdown(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
