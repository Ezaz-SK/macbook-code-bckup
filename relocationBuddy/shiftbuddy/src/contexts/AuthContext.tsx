import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'finder' | 'buddy';
    phone?: string;
    photoUrl?: string;
    isNewUser?: boolean;
    finderPreferences?: {
        destinationCity: string;
        currentCity?: string;
        budgetRange: string;
        preferredLanguage: string;
        moveDate: string;
    };
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => boolean;
    register: (userData: {
        name: string;
        email: string;
        password: string;
        phone?: string;
        role: 'finder' | 'buddy';
        finderPreferences?: {
            destinationCity: string;
            currentCity?: string;
            budgetRange: string;
            preferredLanguage: string;
            moveDate: string;
        };
    }) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user credentials
const MOCK_USERS: Array<User & { password: string }> = [
    {
        id: 'finder-1',
        name: 'Alex Johnson',
        email: 'finder@test.com',
        password: 'password123',
        role: 'finder',
        phone: '+91 98765 12345',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60'
    },
    {
        id: 'buddy-1',
        name: 'Rahul Sharma',
        email: 'buddy@test.com',
        password: 'password123',
        role: 'buddy',
        phone: '+91 98765 43210',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60'
    }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('shiftbuddy_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Failed to parse saved user:', error);
                localStorage.removeItem('shiftbuddy_user');
            }
        }
    }, []);

    const login = (email: string, password: string): boolean => {
        const foundUser = MOCK_USERS.find(
            u => u.email === email && u.password === password
        );

        if (foundUser) {
            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem('shiftbuddy_user', JSON.stringify(userWithoutPassword));
            return true;
        }

        return false;
    };

    const register = (userData: {
        name: string;
        email: string;
        password: string;
        phone?: string;
        role: 'finder' | 'buddy';
        finderPreferences?: {
            destinationCity: string;
            currentCity?: string;
            budgetRange: string;
            preferredLanguage: string;
            moveDate: string;
        };
    }): boolean => {
        // Check if email already exists
        const emailExists = MOCK_USERS.some(u => u.email === userData.email);

        if (emailExists) {
            return false;
        }

        // Create new user
        const newUser: User & { password: string } = {
            id: `${userData.role}-${Date.now()}`,
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            phone: userData.phone,
            photoUrl: userData.role === 'buddy'
                ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60'
                : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
            isNewUser: true,
            finderPreferences: userData.finderPreferences
        };

        // Add to mock users array
        MOCK_USERS.push(newUser);

        // Auto-login the new user
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('shiftbuddy_user', JSON.stringify(userWithoutPassword));

        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('shiftbuddy_user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
