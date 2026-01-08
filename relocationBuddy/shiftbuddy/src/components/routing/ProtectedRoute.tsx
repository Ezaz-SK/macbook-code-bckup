import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'finder' | 'buddy';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user, isAuthenticated } = useAuth();

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If a specific role is required and user doesn't have it, redirect to appropriate dashboard
    if (requiredRole && user?.role !== requiredRole) {
        // Redirect to the user's appropriate dashboard
        const redirectTo = user?.role === 'buddy' ? '/buddy-dashboard' : '/dashboard';
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
