import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { FinderStepBasicInfo } from './finder-steps/FinderStepBasicInfo';
import { FinderStepPreferences } from './finder-steps/FinderStepPreferences';

export const FinderOnboardingPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        whatsapp: '',

        // Step 2: Preferences
        currentCity: '',
        destinationCity: '',
        moveDate: '',
        budgetRange: '',
        preferredLanguage: ''
    });

    const totalSteps = 2;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Submit form and create account
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        } else {
            navigate('/register');
        }
    };

    const handleSubmit = () => {
        console.log('Finder Registration Data:', formData);

        // Register the user with preferences
        const success = register({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            role: 'finder',
            finderPreferences: {
                destinationCity: formData.destinationCity,
                currentCity: formData.currentCity,
                budgetRange: formData.budgetRange,
                preferredLanguage: formData.preferredLanguage,
                moveDate: formData.moveDate
            }
        });

        if (success) {
            // Redirect to finder dashboard
            navigate('/dashboard');
        } else {
            alert('Registration failed. Email might already be in use.');
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
                        {[1, 2].map(step => (
                            <div
                                key={step}
                                className={`h-2 w-16 sm:w-24 rounded-full transition-colors duration-300 ${step <= currentStep ? 'bg-primary' : 'bg-gray-200'
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
                            <FinderStepBasicInfo
                                data={formData}
                                updateData={updateData}
                                onNext={handleNext}
                            />
                        )}
                        {currentStep === 2 && (
                            <FinderStepPreferences
                                data={formData}
                                updateData={updateData}
                                onNext={handleNext}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
