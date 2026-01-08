import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FluidCard } from '@/components/ui/FluidCard';
import { Briefcase, User, ArrowRight, Star } from 'lucide-react';

export const RoleSelectionPage = () => {
    const navigate = useNavigate();

    const roles = [
        {
            id: 'buddy',
            title: 'Join as Buddy',
            icon: Briefcase,
            description: 'Help people relocate and earn money',
            features: [
                'Set your own rates',
                'Flexible schedule',
                'Build your reputation',
                'Earn while helping others'
            ],
            color: 'from-purple-500 to-indigo-600',
            route: '/register/buddy'
        },
        {
            id: 'finder',
            title: 'Join as Finder',
            icon: User,
            description: 'Find trusted help for your relocation',
            features: [
                'Connect with local experts',
                'Get personalized assistance',
                'Save time and effort',
                'Smooth relocation experience'
            ],
            color: 'from-blue-500 to-cyan-600',
            route: '/register/finder'
        }
    ];

    return (
        <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden py-12">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="w-full max-w-5xl mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Choose Your ShiftBuddy Role
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-ink-400"
                    >
                        Whether you're looking for help or ready to provide it, we've got you covered.
                    </motion.p>
                </div>

                {/* Role Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {roles.map((role, index) => {
                        const Icon = role.icon;
                        return (
                            <motion.div
                                key={role.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                            >
                                <FluidCard className="h-full bg-white/90 backdrop-blur-xl border-2 border-transparent hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                                    onClick={() => navigate(role.route)}
                                >
                                    {/* Icon & Title */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${role.color} group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon size={32} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                                                {role.title}
                                            </h3>
                                            <p className="text-ink-400 text-sm">
                                                {role.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-3 mb-6">
                                        {role.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-ink-600">
                                                <Star size={16} className="text-primary flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => navigate(role.route)}
                                        className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        Get Started
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </FluidCard>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-8 text-sm text-ink-400"
                >
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-primary font-semibold hover:underline"
                    >
                        Log In
                    </button>
                </motion.div>
            </div>
        </div>
    );
};
