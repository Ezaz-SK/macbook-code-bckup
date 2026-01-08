// Extended mock data for Finder features

import { MOCK_BUDDY_BOOKINGS } from './mockData';

// Mock saved/favorite buddies
export const MOCK_SAVED_BUDDIES = [
    {
        id: '1',
        name: 'Rahul Sharma',
        college: 'Christ University',
        location: 'Koramangala',
        languages: ['English', 'Hindi', 'Kannada'],
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60',
        rating: 4.8,
        reviews: 124,
        responseTime: '2 hours',
        savedDate: new Date('2024-11-15')
    },
    {
        id: '2',
        name: 'Priya Patel',
        college: 'NIFT Bangalore',
        location: 'Indiranagar',
        languages: ['English', 'Hindi', 'Gujarati'],
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
        rating: 4.9,
        reviews: 89,
        responseTime: '1 hour',
        savedDate: new Date('2024-11-20')
    },
    {
        id: '4',
        name: 'Sneha Reddy',
        college: 'Mount Carmel College',
        location: 'Whitefield',
        languages: ['English', 'Telugu', 'Kannada'],
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
        rating: 4.9,
        reviews: 210,
        responseTime: '3 hours',
        savedDate: new Date('2024-12-01')
    }
];

// Mock conversations/messages
export const MOCK_CONVERSATIONS = [
    {
        id: 'conv-1',
        buddyId: '1',
        buddyName: 'Rahul Sharma',
        buddyPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60',
        lastMessage: 'I found 3 great properties that match your requirements!',
        lastMessageTime: new Date('2024-12-04T10:30:00'),
        unreadCount: 2,
        messages: [
            {
                id: 'm1',
                senderId: 'finder-1',
                senderName: 'You',
                content: 'Hi Rahul! Looking for a 2BHK in Koramangala, budget 30k',
                timestamp: new Date('2024-12-03T14:00:00'),
                read: true
            },
            {
                id: 'm2',
                senderId: '1',
                senderName: 'Rahul Sharma',
                content: 'Hey! Sure, I can help. What\'s your move-in date?',
                timestamp: new Date('2024-12-03T14:15:00'),
                read: true
            },
            {
                id: 'm3',
                senderId: 'finder-1',
                senderName: 'You',
                content: 'Preferably by Dec 15th',
                timestamp: new Date('2024-12-03T14:20:00'),
                read: true
            },
            {
                id: 'm4',
                senderId: '1',
                senderName: 'Rahul Sharma',
                content: 'Perfect! Let me scout some options',
                timestamp: new Date('2024-12-03T14:25:00'),
                read: true
            },
            {
                id: 'm5',
                senderId: '1',
                senderName: 'Rahul Sharma',
                content: 'I found 3 great properties that match your requirements!',
                timestamp: new Date('2024-12-04T10:30:00'),
                read: false
            }
        ]
    },
    {
        id: 'conv-2',
        buddyId: '2',
        buddyName: 'Priya Patel',
        buddyPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
        lastMessage: 'Thanks for confirming! See you tomorrow at 2 PM',
        lastMessageTime: new Date('2024-12-03T18:00:00'),
        unreadCount: 0,
        messages: [
            {
                id: 'm6',
                senderId: 'finder-1',
                senderName: 'You',
                content: 'Are you available for a property tour tomorrow?',
                timestamp: new Date('2024-12-03T16:00:00'),
                read: true
            },
            {
                id: 'm7',
                senderId: '2',
                senderName: 'Priya Patel',
                content: 'Yes! 2 PM works for me',
                timestamp: new Date('2024-12-03T16:30:00'),
                read: true
            },
            {
                id: 'm8',
                senderId: 'finder-1',
                senderName: 'You',
                content: 'Perfect! Let\'s meet at Indiranagar metro',
                timestamp: new Date('2024-12-03T17:00:00'),
                read: true
            },
            {
                id: 'm9',
                senderId: '2',
                senderName: 'Priya Patel',
                content: 'Thanks for confirming! See you tomorrow at 2 PM',
                timestamp: new Date('2024-12-03T18:00:00'),
                read: true
            }
        ]
    }
];

// Finder bookings (from finder's perspective)
export const MOCK_FINDER_BOOKINGS = MOCK_BUDDY_BOOKINGS.map(booking => ({
    ...booking,
    // Swap names for finder perspective
    buddyName: booking.buddyName,
    buddyPhoto: (booking as any).finderPhoto,
    finderName: (booking as any).finderName,
}));
