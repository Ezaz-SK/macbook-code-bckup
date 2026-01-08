import { ElasticButton } from '@/components/ui/ElasticButton';
import { GraduationCap, Briefcase, MapPin } from 'lucide-react';
import type { PersonaType } from '../BuddyOnboardingPage';

interface StepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
}

export const StepPersona = ({ data, updateData, onNext }: StepProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.persona) {
            alert("Please select a persona.");
            return;
        }
        onNext();
    };

    const personas = [
        {
            id: 'student',
            title: 'I am a Student',
            icon: GraduationCap,
            desc: 'Students get 2x more bookings in June/July!',
            color: 'bg-blue-50 text-blue-600 border-blue-200',
        },
        {
            id: 'professional',
            title: 'I am a Professional',
            icon: Briefcase,
            desc: 'Professionals are preferred by job-seekers.',
            color: 'bg-purple-50 text-purple-600 border-purple-200',
        },
        {
            id: 'local',
            title: 'I am a Local Resident',
            icon: MapPin,
            desc: 'Long-term residents are rated highest for safety.',
            color: 'bg-orange-50 text-orange-600 border-orange-200',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-ink-900 mb-2">Which describes you best?</h2>
                <p className="text-ink-400">This helps us match you with the right Finders.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Persona Selection */}
                <div className="grid grid-cols-1 gap-4">
                    {personas.map((p) => {
                        const Icon = p.icon;
                        const isSelected = data.persona === p.id;
                        return (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => updateData({ persona: p.id as PersonaType })}
                                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${isSelected
                                    ? `${p.color} border-current shadow-sm`
                                    : 'bg-white border-gray-100 hover:border-gray-200 text-ink-600'
                                    }`}
                            >
                                <div className={`p-3 rounded-full bg-white ${isSelected ? '' : 'bg-gray-50'}`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{p.title}</h3>
                                    <p className="text-sm opacity-80">{p.desc}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Conditional Fields */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    {data.persona === 'student' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="font-semibold text-ink-900 flex items-center gap-2">
                                <GraduationCap size={18} /> Student Details
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-ink-900 mb-1">College Name</label>
                                <input
                                    type="text"
                                    required
                                    value={data.college}
                                    onChange={(e) => updateData({ college: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                                    placeholder="e.g. Delhi University - Hansraj"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-ink-900 mb-1">Course</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.course}
                                        onChange={(e) => updateData({ course: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                                        placeholder="e.g. B.Com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-ink-900 mb-1">Year</label>
                                    <select
                                        required
                                        value={data.year}
                                        onChange={(e) => updateData({ year: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                                    >
                                        <option value="">Select</option>
                                        <option value="1st Year">1st Year</option>
                                        <option value="2nd Year">2nd Year</option>
                                        <option value="3rd Year">3rd Year</option>
                                        <option value="Final Year">Final Year</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {data.persona === 'professional' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="font-semibold text-ink-900 flex items-center gap-2">
                                <Briefcase size={18} /> Work Details
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-ink-900 mb-1">Current Company</label>
                                <input
                                    type="text"
                                    required
                                    value={data.company}
                                    onChange={(e) => updateData({ company: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                                    placeholder="e.g. Deloitte, TCS"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ink-900 mb-1">Designation</label>
                                <input
                                    type="text"
                                    required
                                    value={data.designation}
                                    onChange={(e) => updateData({ designation: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                                    placeholder="e.g. Analyst, Designer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ink-900 mb-1">LinkedIn URL (Optional)</label>
                                <input
                                    type="url"
                                    value={data.linkedin}
                                    onChange={(e) => updateData({ linkedin: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>
                        </div>
                    )}

                    {data.persona === 'local' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="font-semibold text-ink-900 flex items-center gap-2">
                                <MapPin size={18} /> Resident Details
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-ink-900 mb-1">
                                    How long have you lived here? ({data.yearsLived} Years)
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={data.yearsLived}
                                    onChange={(e) => updateData({ yearsLived: parseInt(e.target.value) })}
                                    className="w-full accent-primary"
                                />
                                <div className="flex justify-between text-xs text-ink-400 mt-1">
                                    <span>1 Year</span>
                                    <span>10+ Years</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ink-900 mb-1">What do you do?</label>
                                <input
                                    type="text"
                                    required
                                    value={data.occupation}
                                    onChange={(e) => updateData({ occupation: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                                    placeholder="e.g. Freelancer, Homemaker, Business"
                                />
                            </div>
                        </div>
                    )}

                    {!data.persona && (
                        <div className="text-center py-8 text-ink-400 italic">
                            Select a persona above to see more fields.
                        </div>
                    )}
                </div>

                <div className="pt-4">
                    <ElasticButton type="submit" className="w-full" disabled={!data.persona}>
                        Next Step
                    </ElasticButton>
                </div>
            </form>
        </div>
    );
};
