import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { User, Briefcase, ArrowRight, AlertCircle } from 'lucide-react';

export const AuthPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState<'finder' | 'buddy'>('finder');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Attempt login
        const success = login(email, password);

        if (success) {
            // Redirect based on role (the login function already sets the correct user)
            // We need to check which role was logged in
            const redirectTo = email.includes('buddy') ? '/buddy-dashboard' : '/dashboard';
            navigate(redirectTo);
        } else {
            setError('Invalid email or password. Try: finder@test.com or buddy@test.com with password123');
        }
    };

    // Helper function to autofill credentials
    const autofillCredentials = (userRole: 'finder' | 'buddy') => {
        setEmail(`${userRole}@test.com`);
        setPassword('password123');
        setRole(userRole);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <FluidCard className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/20 relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        {isLogin ? 'Welcome Back' : 'Join ShiftBuddy'}
                    </h1>
                    <p className="text-ink-400">
                        {isLogin
                            ? 'Continue your weightless moving journey.'
                            : 'Start your weightless moving journey today.'}
                    </p>
                </div>

                {/* Quick Login Helper */}
                {isLogin && (
                    <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-800 mb-2 font-medium">Quick Test Login:</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => autofillCredentials('finder')}
                                className="flex-1 px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-xs font-medium text-blue-700 hover:bg-blue-50 transition-colors"
                            >
                                Login as Finder
                            </button>
                            <button
                                onClick={() => autofillCredentials('buddy')}
                                className="flex-1 px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-xs font-medium text-blue-700 hover:bg-blue-50 transition-colors"
                            >
                                Login as Buddy
                            </button>
                        </div>
                    </div>
                )}

                {/* Role Toggle */}
                <div className="bg-gray-100 p-1 rounded-xl flex mb-8 relative">
                    <motion.div
                        className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm"
                        initial={false}
                        animate={{
                            left: role === 'finder' ? 4 : '50%',
                            width: 'calc(50% - 4px)'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button
                        onClick={() => setRole('finder')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 relative z-10 text-sm font-medium transition-colors ${role === 'finder' ? 'text-ink-900' : 'text-ink-400'}`}
                    >
                        <User size={16} />
                        I'm a Finder
                    </button>
                    <button
                        onClick={() => setRole('buddy')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 relative z-10 text-sm font-medium transition-colors ${role === 'buddy' ? 'text-ink-900' : 'text-ink-400'}`}
                    >
                        <Briefcase size={16} />
                        I'm a Buddy
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                        <AlertCircle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-ink-900">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-ink-900">Email Address</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-ink-900">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-paper border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            required
                        />
                    </div>

                    <ElasticButton type="submit" className="w-full mt-6 group">
                        {isLogin ? 'Log In' : 'Create Account'}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </ElasticButton>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-ink-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => {
                            if (isLogin) {
                                // Redirect to registration page
                                navigate('/register');
                            } else {
                                setIsLogin(true);
                                setError('');
                            }
                        }}
                        className="text-primary font-semibold hover:underline"
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </div>
            </FluidCard>
        </div>
    );
};
