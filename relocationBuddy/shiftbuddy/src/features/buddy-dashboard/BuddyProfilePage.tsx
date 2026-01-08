import { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    DollarSign,
    Upload,
    Save,
    Eye,
    Languages,
    Briefcase
} from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { MOCK_CURRENT_BUDDY } from '@/data/mockData';

export const BuddyProfilePage = () => {
    const [formData, setFormData] = useState({
        name: MOCK_CURRENT_BUDDY.name,
        email: MOCK_CURRENT_BUDDY.email,
        phone: MOCK_CURRENT_BUDDY.phone || '',
        bio: 'Hey! I\'m a local expert in Koramangala with 3+ years of helping people find their perfect home in Bangalore. I specialize in tech-friendly neighborhoods and know all the best cafes, gyms, and hidden gems!',
        localities: ['Koramangala', 'HSR Layout', 'BTM Layout'],
        languages: ['English', 'Hindi', 'Kannada'],
        services: [
            { name: 'House Hunting', price: 3000, enabled: true },
            { name: 'Negotiation Support', price: 2000, enabled: true },
            { name: 'City Orientation', price: 2000, enabled: true },
            { name: 'Full Relocation Package', price: 8000, enabled: true },
        ],
        serviceArea: 'Koramangala & surrounding areas (5km radius)',
        experience: '3 years',
        availability: 'Weekdays 10 AM - 7 PM, Weekends by appointment'
    });

    const [previewMode, setPreviewMode] = useState(false);

    const updateField = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const updateService = (index: number, field: string, value: any) => {
        const newServices = [...formData.services];
        newServices[index] = { ...newServices[index], [field]: value };
        setFormData({ ...formData, services: newServices });
    };

    const addLocality = () => {
        const locality = prompt('Enter locality name:');
        if (locality) {
            updateField('localities', [...formData.localities, locality]);
        }
    };

    const removeLocality = (index: number) => {
        const newLocalities = formData.localities.filter((_, i) => i !== index);
        updateField('localities', newLocalities);
    };

    const addLanguage = () => {
        const language = prompt('Enter language:');
        if (language) {
            updateField('languages', [...formData.languages, language]);
        }
    };

    const removeLanguage = (index: number) => {
        const newLanguages = formData.languages.filter((_, i) => i !== index);
        updateField('languages', newLanguages);
    };

    const handleSave = () => {
        // TODO: API call to save profile
        alert('Profile saved successfully!');
    };

    if (previewMode) {
        return (
            <div className="py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Profile Preview</h1>
                        <p className="text-ink-400">This is how clients will see your profile</p>
                    </div>
                    <ElasticButton
                        variant="secondary"
                        onClick={() => setPreviewMode(false)}
                    >
                        Back to Edit
                    </ElasticButton>
                </div>

                <FluidCard className="max-w-4xl mx-auto">
                    <div className="flex items-start gap-6 mb-6">
                        <img
                            src={MOCK_CURRENT_BUDDY.photoUrl}
                            alt={formData.name}
                            className="w-24 h-24 rounded-2xl object-cover"
                        />
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-1">{formData.name}</h2>
                            <p className="text-ink-400 mb-3">{formData.experience} experience</p>
                            <div className="flex flex-wrap gap-2">
                                {formData.languages.map((lang, i) => (
                                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <span className="text-2xl font-bold">★ 4.8</span>
                            </div>
                            <p className="text-sm text-ink-400">124 reviews</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold mb-2">About</h3>
                        <p className="text-ink-600">{formData.bio}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="font-bold mb-2">Service Areas</h3>
                            <p className="text-sm text-ink-400 mb-2">{formData.serviceArea}</p>
                            <div className="flex flex-wrap gap-2">
                                {formData.localities.map((locality, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 rounded text-sm">
                                        {locality}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Availability</h3>
                            <p className="text-sm text-ink-400">{formData.availability}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Services & Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.services.filter(s => s.enabled).map((service, i) => (
                                <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold">{service.name}</h4>
                                        <span className="font-bold text-primary">₹{service.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FluidCard>
            </div>
        );
    }

    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Profile Management</h1>
                    <p className="text-ink-400">Update your profile information and services</p>
                </div>
                <div className="flex gap-2">
                    <ElasticButton
                        variant="secondary"
                        onClick={() => setPreviewMode(true)}
                        className="gap-2"
                    >
                        <Eye size={18} />
                        Preview
                    </ElasticButton>
                    <ElasticButton onClick={handleSave} className="gap-2">
                        <Save size={18} />
                        Save Changes
                    </ElasticButton>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <FluidCard>
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <User className="text-primary" size={20} />
                            Basic Information
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => updateField('name', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => updateField('bio', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    placeholder="Tell clients about yourself..."
                                />
                            </div>
                        </div>
                    </FluidCard>

                    {/* Service Areas */}
                    <FluidCard>
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <MapPin className="text-primary" size={20} />
                            Service Areas
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Localities</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {formData.localities.map((locality, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-lg flex items-center gap-2"
                                        >
                                            {locality}
                                            <button
                                                onClick={() => removeLocality(i)}
                                                className="hover:text-red-600 transition-colors"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <ElasticButton
                                    variant="ghost"
                                    onClick={addLocality}
                                    className="text-sm border border-gray-200"
                                >
                                    + Add Locality
                                </ElasticButton>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Service Area Description</label>
                                <input
                                    type="text"
                                    value={formData.serviceArea}
                                    onChange={(e) => updateField('serviceArea', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </FluidCard>

                    {/* Languages */}
                    <FluidCard>
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Languages className="text-primary" size={20} />
                            Languages
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.languages.map((language, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-primary/10 text-primary rounded-lg flex items-center gap-2"
                                >
                                    {language}
                                    <button
                                        onClick={() => removeLanguage(i)}
                                        className="hover:text-red-600 transition-colors"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <ElasticButton
                            variant="ghost"
                            onClick={addLanguage}
                            className="text-sm border border-gray-200"
                        >
                            + Add Language
                        </ElasticButton>
                    </FluidCard>

                    {/* Services & Pricing */}
                    <FluidCard>
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <DollarSign className="text-primary" size={20} />
                            Services & Pricing
                        </h3>
                        <div className="space-y-3">
                            {formData.services.map((service, i) => (
                                <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            checked={service.enabled}
                                            onChange={(e) => updateService(i, 'enabled', e.target.checked)}
                                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                value={service.name}
                                                onChange={(e) => updateService(i, 'name', e.target.value)}
                                                disabled={!service.enabled}
                                                className="px-3 py-2 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
                                            />
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">₹</span>
                                                <input
                                                    type="number"
                                                    value={service.price}
                                                    onChange={(e) => updateService(i, 'price', parseInt(e.target.value))}
                                                    disabled={!service.enabled}
                                                    className="w-full pl-8 pr-3 py-2 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FluidCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Profile Photo */}
                    <FluidCard>
                        <h3 className="font-bold mb-4">Profile Photo</h3>
                        <img
                            src={MOCK_CURRENT_BUDDY.photoUrl}
                            alt="Profile"
                            className="w-full aspect-square object-cover rounded-xl mb-4"
                        />
                        <ElasticButton variant="secondary" className="w-full !py-2 text-sm gap-2">
                            <Upload size={16} />
                            Upload New Photo
                        </ElasticButton>
                    </FluidCard>

                    {/* Intro Video */}
                    <FluidCard>
                        <h3 className="font-bold mb-4">Intro Video</h3>
                        <div className="aspect-video bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
                            <p className="text-sm text-ink-400">No video uploaded</p>
                        </div>
                        <ElasticButton variant="secondary" className="w-full !py-2 text-sm gap-2">
                            <Upload size={16} />
                            Upload Video
                        </ElasticButton>
                    </FluidCard>

                    {/* Experience & Availability */}
                    <FluidCard>
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Briefcase className="text-primary" size={18} />
                            Experience
                        </h3>
                        <input
                            type="text"
                            value={formData.experience}
                            onChange={(e) => updateField('experience', e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all mb-4"
                        />
                        <h3 className="font-bold mb-4 mt-6">Availability</h3>
                        <textarea
                            value={formData.availability}
                            onChange={(e) => updateField('availability', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        />
                    </FluidCard>
                </div>
            </div>
        </div>
    );
};
