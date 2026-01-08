import { useAuth } from '@/contexts/AuthContext';
import { PublicNavbar } from './PublicNavbar';
import { FinderNavbar } from './FinderNavbar';
import { BuddyNavbar } from './BuddyNavbar';
import { Footer } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const { user, isAuthenticated } = useAuth();

    // Determine which navbar to show
    const renderNavbar = () => {
        if (!isAuthenticated) {
            return <PublicNavbar />;
        }
        return user?.role === 'buddy' ? <BuddyNavbar /> : <FinderNavbar />;
    };

    return (
        <div className="min-h-screen flex flex-col">
            {renderNavbar()}
            <main className="flex-grow pt-28 px-6">
                <div className="max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};
