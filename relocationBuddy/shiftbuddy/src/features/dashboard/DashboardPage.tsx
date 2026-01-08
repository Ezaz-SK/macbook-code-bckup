import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NewFinderWelcomePage } from '@/features/finder-dashboard/NewFinderWelcomePage';
import { NewFinderDashboard } from '@/features/dashboard/NewFinderDashboard';
import { ExistingFinderDashboard } from '@/features/dashboard/ExistingFinderDashboard';

export const DashboardPage = () => {
    const { user } = useAuth();
    const [showWelcome, setShowWelcome] = useState(false); // Default to false for smoother experience

    // Check if user is a new finder
    const isNewFinder = user?.isNewUser && user?.role === 'finder';

    // Optional: Show welcome page overlay if needed
    if (isNewFinder && showWelcome) {
        return <NewFinderWelcomePage onDismiss={() => setShowWelcome(false)} />;
    }

    // Render appropriate dashboard based on user status
    if (isNewFinder) {
        return <NewFinderDashboard />;
    }

    return <ExistingFinderDashboard />;
};
