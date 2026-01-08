import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/routing/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { LandingPage } from '@/features/search/LandingPage';
import { ListingPage } from '@/features/buddy-listing/ListingPage';
import { DelhiSearchPage } from '@/features/search/DelhiSearchPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { AuthPage } from '@/features/auth/AuthPage';
import { BuddyProfilePage } from '@/features/buddy-listing/BuddyProfilePage';
import { BuddyOnboardingPage } from '@/features/onboarding/BuddyOnboardingPage';
import { RoleSelectionPage } from '@/features/onboarding/RoleSelectionPage';
import { FinderOnboardingPage } from '@/features/onboarding/FinderOnboardingPage';
import { TestPage } from '@/features/TestPage';

// Buddy Dashboard Pages
import { BuddyDashboardPage } from '@/features/buddy-dashboard/BuddyDashboardPage';
import { BuddyBookingsPage } from '@/features/buddy-dashboard/BuddyBookingsPage';
import { BuddyEarningsPage } from '@/features/buddy-dashboard/BuddyEarningsPage';
import { BuddyReviewsPage } from '@/features/buddy-dashboard/BuddyReviewsPage';
import { BuddyCalendarPage } from '@/features/buddy-dashboard/BuddyCalendarPage';
import { BuddyProfilePage as BuddyProfileManagement } from '@/features/buddy-dashboard/BuddyProfilePage';
import { BuddyAnalyticsPage } from '@/features/buddy-dashboard/BuddyAnalyticsPage';

// Finder Dashboard Pages
import { SavedBuddiesPage } from '@/features/finder-dashboard/SavedBuddiesPage';
import { MessagesPage } from '@/features/finder-dashboard/MessagesPage';
import { FinderSettingsPage } from '@/features/finder-dashboard/FinderSettingsPage';
import { FinderBookingsPage } from '@/features/finder-dashboard/FinderBookingsPage';



function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/search" element={<ListingPage />} />
                        <Route path="/search/delhi" element={<DelhiSearchPage />} />
                        <Route path="/buddy/:id" element={<BuddyProfilePage />} />
                        <Route path="/become-buddy" element={<BuddyOnboardingPage />} />
                        <Route path="/register" element={<RoleSelectionPage />} />
                        <Route path="/register/buddy" element={<BuddyOnboardingPage />} />
                        <Route path="/register/finder" element={<FinderOnboardingPage />} />
                        <Route path="/login" element={<AuthPage />} />
                        <Route path="/signup" element={<AuthPage />} />
                        <Route path="/test" element={<TestPage />} />

                        {/* Finder Dashboard Routes (Protected) */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute requiredRole="finder">
                                    <DashboardPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/bookings"
                            element={
                                <ProtectedRoute requiredRole="finder">
                                    <FinderBookingsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/saved"
                            element={
                                <ProtectedRoute requiredRole="finder">
                                    <SavedBuddiesPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/messages"
                            element={
                                <ProtectedRoute requiredRole="finder">
                                    <MessagesPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/settings"
                            element={
                                <ProtectedRoute requiredRole="finder">
                                    <FinderSettingsPage />
                                </ProtectedRoute>
                            }
                        />

                        {/* Buddy Dashboard Routes (Protected) */}
                        <Route
                            path="/buddy-dashboard"
                            element={
                                <ProtectedRoute requiredRole="buddy">
                                    <BuddyDashboardPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/buddy-dashboard/bookings"
                            element={
                                <ProtectedRoute requiredRole="buddy">
                                    <BuddyBookingsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/buddy-dashboard/earnings"
                            element={
                                <ProtectedRoute requiredRole="buddy">
                                    <BuddyEarningsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/buddy-dashboard/reviews"
                            element={
                                <ProtectedRoute requiredRole="buddy">
                                    <BuddyReviewsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/buddy-dashboard/calendar"
                            element={
                                <ProtectedRoute requiredRole="buddy">
                                    <BuddyCalendarPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/buddy-dashboard/profile"
                            element={
                                <ProtectedRoute requiredRole="buddy">
                                    <BuddyProfileManagement />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/buddy-dashboard/analytics"
                            element={
                                <ProtectedRoute requiredRole="buddy">
                                    <BuddyAnalyticsPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;
