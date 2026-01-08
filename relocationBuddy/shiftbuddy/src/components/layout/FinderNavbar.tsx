import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ElasticButton } from '@/components/ui/ElasticButton';
import {
    LayoutDashboard,
    Calendar,
    Heart,
    MessageSquare,
    Settings,
    LogOut,
    Search,
    ChevronDown
} from 'lucide-react';

export const FinderNavbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    const navLinks = [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/dashboard/bookings', label: 'My Bookings', icon: Calendar },
        { to: '/dashboard/saved', label: 'Saved Buddies', icon: Heart },
        { to: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
        { to: '/dashboard/settings', label: 'Settings', icon: Settings }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/dashboard" className="text-xl font-bold text-primary flex items-center gap-2">
                    <span className="text-2xl">🚀</span> ShiftBuddy
                </Link>

                {/* Navigation Links */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(link.to)
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

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Find Buddy Button */}
                    <Link to="/search/delhi">
                        <ElasticButton variant="secondary" className="!py-2 !px-4 text-sm flex items-center gap-2">
                            <Search size={16} />
                            Find a Buddy
                        </ElasticButton>
                    </Link>

                    {/* User Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <img
                                src={user?.photoUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60'}
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
                                </div>

                                <Link
                                    to="/dashboard/settings"
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-ink-600 hover:bg-gray-50 transition-colors"
                                    onClick={() => setShowDropdown(false)}
                                >
                                    <Settings size={16} />
                                    Settings
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
            </div>
        </nav>
    );
};
