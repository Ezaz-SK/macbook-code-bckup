import { ElasticButton } from '@/components/ui/ElasticButton';
import { Check } from 'lucide-react';

interface StepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
}

const CITIES = ['Bangalore', 'Delhi', 'Mumbai', 'Pune'];
const ZONES = ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Jayanagar'];
const LOCALITIES = ['4th Block', '5th Block', '6th Block', 'Ejipura', 'Sony World Signal', 'Wipro Park'];
const LANGUAGES = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Malayalam'];

export const StepExpertise = ({ data, updateData, onNext }: StepProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    const toggleSelection = (field: 'localities' | 'languages', value: string) => {
        const current = data[field] as string[];
        const updated = current.includes(value)
            ? current.filter(item => item !== value)
            : [...current, value];
        updateData({ [field]: updated });
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-ink-900 mb-2">Your Expertise</h2>
                <p className="text-ink-400">Tell us where you rule. This powers our search algorithm.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location Section */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-ink-900 border-b pb-2">Location</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-ink-900 mb-1">City</label>
                            <select
                                required
                                value={data.city}
                                onChange={(e) => updateData({ city: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                            >
                                <option value="">Select City</option>
                                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-ink-900 mb-1">Primary Zone</label>
                            <select
                                required
                                value={data.zone}
                                onChange={(e) => updateData({ zone: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                            >
                                <option value="">Select Zone</option>
                                {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-ink-900 mb-2">Specific Localities (Max 3)</label>
                        <div className="flex flex-wrap gap-2">
                            {LOCALITIES.map(loc => {
                                const isSelected = data.localities.includes(loc);
                                return (
                                    <button
                                        key={loc}
                                        type="button"
                                        onClick={() => {
                                            if (!isSelected && data.localities.length >= 3) return;
                                            toggleSelection('localities', loc);
                                        }}
                                        className={`px-3 py-1.5 rounded-full text-sm border transition-all ${isSelected
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white text-ink-600 border-gray-200 hover:border-primary/50'
                                            }`}
                                    >
                                        {loc}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Languages Section */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-ink-900 border-b pb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                        {LANGUAGES.map(lang => {
                            const isSelected = data.languages.includes(lang);
                            return (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => toggleSelection('languages', lang)}
                                    className={`px-3 py-1.5 rounded-full text-sm border transition-all flex items-center gap-1 ${isSelected
                                        ? 'bg-green-600 text-white border-green-600'
                                        : 'bg-white text-ink-600 border-gray-200 hover:border-green-500/50'
                                        }`}
                                >
                                    {isSelected && <Check size={14} />}
                                    {lang}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="pt-4">
                    <ElasticButton type="submit" className="w-full">
                        Next Step
                    </ElasticButton>
                </div>
            </form>
        </div>
    );
};
