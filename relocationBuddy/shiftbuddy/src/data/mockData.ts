// Mock data for the entire application
// This will be replaced with real API calls later

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'finder' | 'buddy' | 'admin';
    phone?: string;
    photoUrl?: string;
    createdAt: Date;
}

export interface Booking {
    id: string;
    finderId: string;
    finderName: string;
    finderPhoto?: string;
    buddyId: string;
    buddyName: string;
    service: string;
    status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
    amount: number;
    bookedDate: Date;
    moveDate: Date;
    milestones: Milestone[];
    messages?: Message[];
}

export interface Milestone {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate?: Date;
    completedDate?: Date;
}

export interface Review {
    id: string;
    bookingId: string;
    reviewerId: string;
    reviewerName: string;
    reviewerPhoto?: string;
    rating: number;
    comment: string;
    createdAt: Date;
    helpful: number;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: Date;
    read: boolean;
}

export interface Transaction {
    id: string;
    bookingId: string;
    amount: number;
    type: 'payment' | 'payout' | 'refund';
    status: 'pending' | 'completed' | 'failed';
    date: Date;
    description: string;
}

export interface BuddyStats {
    totalEarnings: number;
    todayEarnings: number;
    weekEarnings: number;
    monthEarnings: number;
    activeBookings: number;
    pendingRequests: number;
    completedBookings: number;
    averageRating: number;
    totalReviews: number;
    responseTime: string;
    acceptanceRate: number;
    profileViews: number;
}

// Mock current user (Buddy)
export const MOCK_CURRENT_BUDDY: User = {
    id: 'buddy-1',
    name: 'Rahul Sharma',
    email: 'rahul@shiftbuddy.com',
    role: 'buddy',
    phone: '+91 98765 43210',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60',
    createdAt: new Date('2024-01-15')
};

// Mock Buddy Stats
export const MOCK_BUDDY_STATS: BuddyStats = {
    totalEarnings: 145000,
    todayEarnings: 2500,
    weekEarnings: 12000,
    monthEarnings: 45000,
    activeBookings: 5,
    pendingRequests: 3,
    completedBookings: 47,
    averageRating: 4.8,
    totalReviews: 124,
    responseTime: '2 hours',
    acceptanceRate: 92,
    profileViews: 1250
};

// Mock Bookings for Buddy
export const MOCK_BUDDY_BOOKINGS: Booking[] = [
    {
        id: 'booking-1',
        finderId: 'finder-1',
        finderName: 'Priya Mehta',
        finderPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
        buddyId: 'buddy-1',
        buddyName: 'Rahul Sharma',
        service: 'House Hunting + Negotiation',
        status: 'in-progress',
        amount: 5000,
        bookedDate: new Date('2024-11-20'),
        moveDate: new Date('2024-12-15'),
        milestones: [
            {
                id: 'm1',
                title: 'Initial Consultation',
                description: 'Understand requirements and preferences',
                status: 'completed',
                dueDate: new Date('2024-11-21'),
                completedDate: new Date('2024-11-21')
            },
            {
                id: 'm2',
                title: 'Property Shortlist',
                description: 'Find and shortlist 5 properties',
                status: 'in-progress',
                dueDate: new Date('2024-12-05')
            },
            {
                id: 'm3',
                title: 'Virtual Tour',
                description: 'Conduct video tours of shortlisted properties',
                status: 'pending',
                dueDate: new Date('2024-12-08')
            },
            {
                id: 'm4',
                title: 'Negotiation & Closing',
                description: 'Negotiate rent and finalize property',
                status: 'pending',
                dueDate: new Date('2024-12-12')
            }
        ]
    },
    {
        id: 'booking-2',
        finderId: 'finder-2',
        finderName: 'Amit Kumar',
        finderPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
        buddyId: 'buddy-1',
        buddyName: 'Rahul Sharma',
        service: 'Full Relocation Package',
        status: 'pending',
        amount: 8000,
        bookedDate: new Date('2024-12-03'),
        moveDate: new Date('2024-12-20'),
        milestones: []
    },
    {
        id: 'booking-3',
        finderId: 'finder-3',
        finderName: 'Sneha Reddy',
        finderPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
        buddyId: 'buddy-1',
        buddyName: 'Rahul Sharma',
        service: 'House Hunting',
        status: 'pending',
        amount: 3000,
        bookedDate: new Date('2024-12-04'),
        moveDate: new Date('2024-12-25'),
        milestones: []
    },
    {
        id: 'booking-4',
        finderId: 'finder-4',
        finderName: 'Vikram Singh',
        finderPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
        buddyId: 'buddy-1',
        buddyName: 'Rahul Sharma',
        service: 'City Orientation',
        status: 'completed',
        amount: 2000,
        bookedDate: new Date('2024-10-15'),
        moveDate: new Date('2024-11-01'),
        milestones: [
            {
                id: 'm5',
                title: 'City Tour',
                description: 'Show around key areas',
                status: 'completed',
                completedDate: new Date('2024-11-02')
            }
        ]
    }
];

// Mock Reviews
export const MOCK_BUDDY_REVIEWS: Review[] = [
    {
        id: 'review-1',
        bookingId: 'booking-4',
        reviewerId: 'finder-4',
        reviewerName: 'Vikram Singh',
        reviewerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
        rating: 5,
        comment: 'Rahul was amazing! He showed me all the best spots in Koramangala and helped me understand the local culture. Highly recommend!',
        createdAt: new Date('2024-11-05'),
        helpful: 12
    },
    {
        id: 'review-2',
        bookingId: 'booking-5',
        reviewerId: 'finder-5',
        reviewerName: 'Anjali Patel',
        rating: 5,
        comment: 'Super helpful and responsive. Found me the perfect apartment within my budget. Worth every rupee!',
        createdAt: new Date('2024-11-10'),
        helpful: 8
    },
    {
        id: 'review-3',
        bookingId: 'booking-6',
        reviewerId: 'finder-6',
        reviewerName: 'Rohan Desai',
        rating: 4,
        comment: 'Good service overall. Rahul knows the area well. Could have been a bit quicker with responses.',
        createdAt: new Date('2024-11-18'),
        helpful: 5
    }
];

// Mock Transactions
export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 'txn-1',
        bookingId: 'booking-1',
        amount: 5000,
        type: 'payment',
        status: 'completed',
        date: new Date('2024-11-20'),
        description: 'Payment received for House Hunting service'
    },
    {
        id: 'txn-2',
        bookingId: 'booking-4',
        amount: 2000,
        type: 'payout',
        status: 'completed',
        date: new Date('2024-11-05'),
        description: 'Payout for completed City Orientation'
    },
    {
        id: 'txn-3',
        bookingId: 'booking-7',
        amount: 3500,
        type: 'payout',
        status: 'pending',
        date: new Date('2024-12-01'),
        description: 'Pending payout for House Hunting'
    }
];

// Mock Earnings Data (for charts)
export const MOCK_EARNINGS_DATA = [
    { month: 'Jun', earnings: 25000 },
    { month: 'Jul', earnings: 32000 },
    { month: 'Aug', earnings: 28000 },
    { month: 'Sep', earnings: 35000 },
    { month: 'Oct', earnings: 42000 },
    { month: 'Nov', earnings: 45000 },
    { month: 'Dec', earnings: 12000 } // Current month (partial)
];

// Mock Booking Trends
export const MOCK_BOOKING_TRENDS = [
    { month: 'Jun', bookings: 6 },
    { month: 'Jul', bookings: 8 },
    { month: 'Aug', bookings: 7 },
    { month: 'Sep', bookings: 9 },
    { month: 'Oct', bookings: 11 },
    { month: 'Nov', bookings: 12 },
    { month: 'Dec', bookings: 3 } // Current month
];
