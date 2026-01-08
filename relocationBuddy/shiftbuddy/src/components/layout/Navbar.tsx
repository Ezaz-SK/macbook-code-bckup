import { Link } from 'react-router-dom';
import { ElasticButton } from '@/components/ui/ElasticButton';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between bg-surface/70 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 shadow-gravity-sm">
                <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
                    <span className="text-2xl">🚀</span> ShiftBuddy
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-400">
                    <Link to="/search" className="hover:text-primary transition-colors">Find a Buddy</Link>
                    <Link to="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
                    <Link to="/stories" className="hover:text-primary transition-colors">Stories</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
                    <Link to="/become-buddy">
                        <ElasticButton variant="secondary" className="!py-2 !px-4 text-sm">
                            Join as Buddy
                        </ElasticButton>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
