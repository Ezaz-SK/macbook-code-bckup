import { ElasticButton } from '@/components/ui/ElasticButton';
import { MapPin, Calendar, DollarSign, Globe } from 'lucide-react';

interface FinderStepPreferencesProps {
    data: {
        currentCity: string;
        destinationCity: string;
        moveDate: string;
        budgetRange: string;
        preferredLanguage: string;
    };
    updateData: (data: any) => void;
    onNext: () => void;
}

export const FinderStepPreferences = ({ data, updateData, onNext }: FinderStepPreferencesProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!data.destinationCity || !data.moveDate || !data.budgetRange) {
            alert('Please fill in all required fields');
            return;
        }

        onNext();
    };

    const budgetRanges = [
        '₹2,000 - ₹5,000',
        '₹5,000 - ₹10,000',
        '₹10,000 - ₹20,000',
        '₹20,000+'
    ];

    const languages = [
        'English',
        'Hindi',
        'Tamil',
        'Telugu',
        'Kannada',
        'Malayalam',
        'Bengali',
        'Marathi'
    ];

    const cities = [
        'Bangalore',
        'Mumbai',
        'Delhi',
        'Hyderabad',
        'Chennai',
        'Pune',
        'Kolkata',
        'Ahmedabad',
        'Gurgaon',
        'Noida'
    ];

    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Your Relocation Details 📍</h2>
                <p className="text-ink-400">Help us find the perfect buddy for you</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Current City */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-ink-900 flex items-center gap-2">
                        <MapPin size={16} />
                        Current City (Optional)
                    </label>
                    <select
                        value={data.currentCity}
                        onChange={(e) => updateData({ currentCity: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                        <option value="">Select your current city</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                {/* Destination City */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-ink-900 flex items-center gap-2">
                        <MapPin size={16} className="text-primary" />
                        Destination City*
                    </label>
                    <select
                        value={data.destinationCity}
                        onChange={(e) => updateData({ destinationCity: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        required
                    >
                        <option value="">Where are you moving to?</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                {/* Expected Move Date */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-ink-900 flex items-center gap-2">
                        <Calendar size={16} />
                        Expected Move Date*
                    </label>
                    <input
                        type="date"
                        value={data.moveDate}
                        onChange={(e) => updateData({ moveDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        required
                    />
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-ink-900 flex items-center gap-2">
                        <DollarSign size={16} />
                        Budget Range*
                    </label>
                    <select
                        value={data.budgetRange}
                        onChange={(e) => updateData({ budgetRange: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        required
                    >
                        <option value="">Select your budget</option>
                        {budgetRanges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                        ))}
                    </select>
                    <p className="text-xs text-ink-400">Estimated budget for buddy services</p>
                </div>

                {/* Preferred Language */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-ink-900 flex items-center gap-2">
                        <Globe size={16} />
                        Preferred Language*
                    </label>
                    <select
                        value={data.preferredLanguage}
                        onChange={(e) => updateData({ preferredLanguage: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        required
                    >
                        <option value="">Select preferred language</option>
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                        <strong>Almost done! 🎉</strong> We'll use this information to match you with the best buddies in {data.destinationCity || 'your destination city'}.
                    </p>
                </div>

                <ElasticButton type="submit" className="w-full mt-6">
                    Create Account
                </ElasticButton>
            </form>
        </div>
    );
};
