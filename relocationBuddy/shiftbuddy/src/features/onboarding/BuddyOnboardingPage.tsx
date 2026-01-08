import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { StepBasicInfo } from './steps/StepBasicInfo';
import { StepPersona } from './steps/StepPersona';
import { StepExpertise } from './steps/StepExpertise';
import { StepVibeCheck } from './steps/StepVibeCheck';
import { StepLegal } from './steps/StepLegal';

export type PersonaType = 'student' | 'professional' | 'local';

export const BuddyOnboardingPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Identity
        fullName: '',
        phone: '',
        whatsapp: '',
        email: '',
        password: '',

        // Step 2: Persona
        persona: '' as PersonaType | '',
        // Student Fields
        college: '',
        course: '',
        year: '',
        // Pro Fields
        company: '',
        designation: '',
        linkedin: '',
        // Local Fields
        yearsLived: 1,
        occupation: '',

        // Step 3: Expertise
        city: '',
        zone: '',
        localities: [] as string[],
        languages: [] as string[],

        // Step 4: Vibe Check
        photo: null as File | null,
        introVideo: null as Blob | null,
        bio: '',

        // Step 5: Trust Shield
        aadhar: '',
        collegeId: null as File | null,
        workProof: null as File | null,
        addressProof: null as File | null,
        upiId: '',
    });

    const totalSteps = 5;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Submit form and create account
            console.log('Form Submitted:', formData);

            const success = register({
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                role: 'buddy'
            });

            if (success) {
                // Redirect to buddy dashboard
                navigate('/buddy-dashboard');
            } else {
                alert('Registration failed. Email might already be in use.');
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        } else {
            navigate(-1);
        }
    };

    const updateData = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-10">
            <div className="max-w-2xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={handleBack}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(step => (
                            <div
                                key={step}
                                className={`h-2 w-8 sm:w-12 rounded-full transition-colors duration-300 ${step <= currentStep ? 'bg-primary' : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="w-10" />
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentStep === 1 && (
                            <StepBasicInfo data={formData} updateData={updateData} onNext={handleNext} />
                        )}
                        {currentStep === 2 && (
                            <StepPersona data={formData} updateData={updateData} onNext={handleNext} />
                        )}
                        {currentStep === 3 && (
                            <StepExpertise data={formData} updateData={updateData} onNext={handleNext} />
                        )}
                        {currentStep === 4 && (
                            <StepVibeCheck data={formData} updateData={updateData} onNext={handleNext} />
                        )}
                        {currentStep === 5 && (
                            <StepLegal data={formData} updateData={updateData} onNext={handleNext} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
