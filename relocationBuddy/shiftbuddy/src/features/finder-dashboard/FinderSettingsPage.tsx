import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Bell,
    Lock,
    CreditCard,
    Globe,
    Moon,
    Sun,
    Save
} from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';

export const FinderSettingsPage = () => {
    const [formData, setFormData] = useState({
        // Personal Info
        name: 'Priya Mehta',
        email: 'priya.mehta@example.com',
        phone: '+91 98765 43210',
        city: 'Bangalore',

        // Preferences
        language: 'en',
        currency: 'INR',
        theme: 'light',

        // Notifications
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: true,
        bookingUpdates: true,
        promotions: false,

        // Privacy
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false
    });

    const [activeTab, setActiveTab] = useState('personal');

    const updateField = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy & Security', icon: Lock },
        { id: 'payments', label: 'Payment Methods', icon: CreditCard },
        { id: 'preferences', label: 'Preferences', icon: Globe }
    ];

    return (
        <div className="py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-ink-400">Manage your account and preferences</p>
                </div>
                <ElasticButton onClick={handleSave} className="gap-2">
                    <Save size={18} />
                    Save Changes
                </ElasticButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Tabs Sidebar */}
                <div className="lg:col-span-1">
                    <FluidCard className="p-0 overflow-hidden">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full p-4 flex items-center gap-3 text-left transition-colors border-b border-gray-100 last:border-0 ${activeTab === tab.id
                                        ? 'bg-primary/5 text-primary font-semibold'
                                        : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="text-sm">{tab.label}</span>
                                </button>
                            );
                        })}
                    </FluidCard>
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {activeTab === 'personal' && (
                            <FluidCard>
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <User className="text-primary" size={20} />
                                    Personal Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => updateField('name', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => updateField('email', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Phone</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => updateField('phone', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">City</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
                                            <input
                                                type="text"
                                                value={formData.city}
                                                onChange={(e) => updateField('city', e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </FluidCard>
                        )}

                        {activeTab === 'notifications' && (
                            <FluidCard>
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <Bell className="text-primary" size={20} />
                                    Notification Preferences
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                                        { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive text message updates' },
                                        { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive push notifications in browser' },
                                        { key: 'bookingUpdates', label: 'Booking Updates', description: 'Get notified about booking status changes' },
                                        { key: 'promotions', label: 'Promotions & Offers', description: 'Receive promotional emails and offers' }
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-sm mb-1">{item.label}</h4>
                                                <p className="text-xs text-ink-400">{item.description}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData[item.key as keyof typeof formData] as boolean}
                                                    onChange={(e) => updateField(item.key, e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </FluidCard>
                        )}

                        {activeTab === 'privacy' && (
                            <FluidCard>
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <Lock className="text-primary" size={20} />
                                    Privacy & Security
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold mb-3">Password</h4>
                                        <ElasticButton variant="secondary" className="gap-2">
                                            <Lock size={16} />
                                            Change Password
                                        </ElasticButton>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-3">Two-Factor Authentication</h4>
                                        <p className="text-sm text-ink-400 mb-3">
                                            Add an extra layer of security to your account
                                        </p>
                                        <ElasticButton variant="ghost" className="border border-gray-200">
                                            Enable 2FA
                                        </ElasticButton>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-3">Account Visibility</h4>
                                        <div className="space-y-2">
                                            {[
                                                { key: 'showEmail', label: 'Email visible to buddies' },
                                                { key: 'showPhone', label: 'Phone visible to buddies' }
                                            ].map((item) => (
                                                <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <span className="text-sm">{item.label}</span>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData[item.key as keyof typeof formData] as boolean}
                                                            onChange={(e) => updateField(item.key, e.target.checked)}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </FluidCard>
                        )}

                        {activeTab === 'payments' && (
                            <FluidCard>
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <CreditCard className="text-primary" size={20} />
                                    Payment Methods
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold">Visa •••• 4242</span>
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Default</span>
                                        </div>
                                        <p className="text-sm text-ink-400">Expires 12/2025</p>
                                    </div>
                                    <ElasticButton variant="ghost" className="w-full border border-gray-200">
                                        + Add Payment Method
                                    </ElasticButton>
                                </div>
                            </FluidCard>
                        )}

                        {activeTab === 'preferences' && (
                            <FluidCard>
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <Globe className="text-primary" size={20} />
                                    Preferences
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Language</label>
                                        <select
                                            value={formData.language}
                                            onChange={(e) => updateField('language', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                        >
                                            <option value="en">English</option>
                                            <option value="hi">Hindi</option>
                                            <option value="kn">Kannada</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Currency</label>
                                        <select
                                            value={formData.currency}
                                            onChange={(e) => updateField('currency', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                        >
                                            <option value="INR">INR (₹)</option>
                                            <option value="USD">USD ($)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Theme</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { value: 'light', label: 'Light', icon: Sun },
                                                { value: 'dark', label: 'Dark', icon: Moon }
                                            ].map((theme) => {
                                                const Icon = theme.icon;
                                                return (
                                                    <button
                                                        key={theme.value}
                                                        onClick={() => updateField('theme', theme.value)}
                                                        className={`p-4 rounded-xl border-2 transition-all ${formData.theme === theme.value
                                                            ? 'border-primary bg-primary/5'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <Icon size={24} className="mx-auto mb-2" />
                                                        <p className="text-sm font-medium">{theme.label}</p>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </FluidCard>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
