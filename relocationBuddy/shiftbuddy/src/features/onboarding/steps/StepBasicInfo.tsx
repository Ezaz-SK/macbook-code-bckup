import { ElasticButton } from '@/components/ui/ElasticButton';


interface StepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
}

export const StepBasicInfo = ({ data, updateData, onNext }: StepProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, trigger OTP verification here
        onNext();
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-ink-900 mb-2">Create your Buddy Account</h2>
                <p className="text-ink-400">Let's start with the basics. Your name must match your Aadhar card.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-ink-900 mb-1">Full Name</label>
                    <input
                        type="text"
                        required
                        value={data.fullName}
                        onChange={(e) => updateData({ fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="e.g. Rahul Sharma"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-ink-900 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={data.phone}
                        onChange={(e) => updateData({ phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="10-digit mobile number"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-ink-900 mb-1">WhatsApp Number</label>
                    <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={data.whatsapp || data.phone}
                        onChange={(e) => updateData({ whatsapp: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="For quick communication"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-ink-900 mb-1">Email Address</label>
                    <input
                        type="email"
                        required
                        value={data.email}
                        onChange={(e) => updateData({ email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="rahul@college.edu"
                    />
                    <p className="text-xs text-green-600 mt-1">Tip: Use your college email for a higher trust score.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-ink-900 mb-1">Password</label>
                    <input
                        type="password"
                        required
                        minLength={8}
                        value={data.password}
                        onChange={(e) => updateData({ password: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Min. 8 characters"
                    />
                </div>

                <div className="pt-4">
                    <ElasticButton type="submit" className="w-full">
                        Continue
                    </ElasticButton>
                </div>
            </form>
        </div>
    );
};
