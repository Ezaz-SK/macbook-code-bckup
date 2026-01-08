import { ElasticButton } from '@/components/ui/ElasticButton';
import { User, Mail, Lock, Phone, MessageCircle } from 'lucide-react';

interface FinderStepBasicInfoProps {
    data: {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
        phone: string;
        whatsapp: string;
    };
    updateData: (data: any) => void;
    onNext: () => void;
}

export const FinderStepBasicInfo = ({ data, updateData, onNext }: FinderStepBasicInfoProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!data.fullName || !data.email || !data.password) {
            alert('Please fill in all required fields');
            return;
        }

        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (data.password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        onNext();
    };

    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Let's Get Started! 🚀</h2>
                <p className="text-ink-400">Tell us a bit about yourself</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-ink-900 flex items-center gap-2">
                        <User size={16} />
                        Full Name*
                    </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={data.fullName}
                        onChange={(e) => updateData({ fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        required
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-ink-900 flex items-center gap-2">
                        <Mail size={16} />
                        Email Address*
                    </label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        value={data.email}
                        onChange={(e) => updateData({ email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        required
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-ink-900 flex items-center gap-2">
                        <Lock size={16} />
                        Password*
                    </label>
                    <input
                        type="password"
                        placeholder="Minimum 8 characters"
                        value={data.password}
                        onChange={(e) => updateData({ password: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        required
                        minLength={8}
                    />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-ink-900 flex items-center gap-2">
                        <Lock size={16} />
                        Confirm Password*
                    </label>
                    <input
                        type="password"
                        placeholder="Re-enter your password"
                        value={data.confirmPassword}
                        onChange={(e) => updateData({ confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        required
                    />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-ink-900 flex items-center gap-2">
                        <Phone size={16} />
                        Phone Number*
                    </label>
                    <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={data.phone}
                        onChange={(e) => updateData({ phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        required
                    />
                </div>

                {/* WhatsApp (Optional) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-ink-900 flex items-center gap-2">
                        <MessageCircle size={16} />
                        WhatsApp Number (Optional)
                    </label>
                    <input
                        type="tel"
                        placeholder="Same as phone or different"
                        value={data.whatsapp}
                        onChange={(e) => updateData({ whatsapp: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    <p className="text-xs text-ink-400">We'll use this for quick updates about your bookings</p>
                </div>

                <ElasticButton type="submit" className="w-full mt-6">
                    Continue
                </ElasticButton>
            </form>
        </div>
    );
};
