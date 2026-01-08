// Helper function to get buddies for the new finder welcome page
// Uses mock data but with city/budget filtering

export interface BuddyRecommendation {
    id: string;
    name: string;
    city: string;
    specialization: string;
    rating: number;
    reviews: number;
    startingPrice: number;
    photoUrl: string;
    languages: string[];
}

// Extended mock buddies with city and pricing info - Comprehensive Delhi coverage for investor demo
const EXTENDED_BUDDIES: BuddyRecommendation[] = [
    // Delhi Buddies - Comprehensive coverage
    {
        id: '1',
        name: 'Rahul Sharma',
        city: 'Delhi',
        specialization: 'Hauz K has Expert',
        rating: 4.9,
        reviews: 127,
        startingPrice: 2800,
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi']
    },
    {
        id: '2',
        name: 'Priya Patel',
        city: 'Delhi',
        specialization: 'South Delhi Specialist',
        rating: 4.8,
        reviews: 145,
        startingPrice: 3200,
        photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi', 'Gujarati']
    },
    {
        id: '3',
        name: 'Amit Kumar',
        city: 'Delhi',
        specialization: 'Dwarka & West Delhi Pro',
        rating: 4.7,
        reviews: 98,
        startingPrice: 2200,
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi', 'Punjabi']
    },
    {
        id: '4',
        name: 'Neha Singh',
        city: 'Delhi',
        specialization: 'Mayur Vihar & East Delhi',
        rating: 4.9,
        reviews: 112,
        startingPrice: 2500,
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi']
    },
    {
        id: '5',
        name: 'Vikram Rao',
        city: 'Delhi',
        specialization: 'Rohini & North Delhi',
        rating: 4.6,
        reviews: 82,
        startingPrice: 2400,
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi', 'Telugu']
    },
    {
        id: '6',
        name: 'Anjali Mehta',
        city: 'Delhi',
        specialization: 'Connaught Place & Central Delhi',
        rating: 4.8,
        reviews: 156,
        startingPrice: 3500,
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi']
    },
    {
        id: '7',
        name: 'Karan Malhotra',
        city: 'Delhi',
        specialization: 'Saket & GK Expert',
        rating: 4.9,
        reviews: 134,
        startingPrice: 3100,
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi', 'Punjabi']
    },
    {
        id: '8',
        name: 'Riya Kapoor',
        city: 'Delhi',
        specialization: 'Lajpat Nagar & CR Park',
        rating: 4.7,
        reviews: 89,
        startingPrice: 2600,
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi', 'Bengali']
    },
    {
        id: '9',
        name: 'Siddharth Jain',
        city: 'Delhi',
        specialization: 'Rajouri Garden Specialist',
        rating: 4.6,
        reviews: 76,
        startingPrice: 2300,
        photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi']
    },
    {
        id: '10',
        name: 'Pooja Agarwal',
        city: 'Delhi',
        specialization: 'Pitampura & Model Town',
        rating: 4.8,
        reviews: 103,
        startingPrice: 2700,
        photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi']
    },
    {
        id: '11',
        name: 'Arjun Verma',
        city: 'Delhi',
        specialization: 'Vasant Kunj & Vasant Vihar',
        rating: 4.9,
        reviews: 119,
        startingPrice: 3400,
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi']
    },
    {
        id: '12',
        name: 'Meera Reddy',
        city: 'Delhi',
        specialization: 'Preet Vihar & Laxmi Nagar',
        rating: 4.7,
        reviews: 94,
        startingPrice: 2200,
        photoUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi', 'Tamil']
    },
    {
        id: '13',
        name: 'Rohan Gupta',
        city: 'Delhi',
        specialization: 'Janakpuri & Tilak Nagar',
        rating: 4.6,
        reviews: 71,
        startingPrice: 2100,
        photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi']
    },
    {
        id: '14',
        name: 'Divya Chatterjee',
        city: 'Delhi',
        specialization: 'Karol Bagh Insider',
        rating: 4.8,
        reviews: 108,
        startingPrice: 2500,
        photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi', 'Bengali']
    },
    {
        id: '15',
        name: 'Aakash Sharma',
        city: 'Delhi',
        specialization: 'Defence Colony & Nehru Place',
        rating: 4.9,
        reviews: 142,
        startingPrice: 2900,
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi']
    },

    // Bangalore Buddies - For future expansion
    {
        id: '100',
        name: 'Sneha Nair',
        city: 'Bangalore',
        specialization: 'Koramangala Expert',
        rating: 4.8,
        reviews: 124,
        startingPrice: 3000,
        photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi', 'Kannada']
    },
    {
        id: '101',
        name: 'Rahul Krishnan',
        city: 'Bangalore',
        specialization: 'Whitefield & IT Parks',
        rating: 4.7,
        reviews: 89,
        startingPrice: 3200,
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Tamil', 'Kannada']
    },

    // Mumbai Buddies - For future expansion
    {
        id: '200',
        name: 'Aditi Desai',
        city: 'Mumbai',
        specialization: 'Andheri & Bandra',
        rating: 4.6,
        reviews: 78,
        startingPrice: 4000,
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60',
        languages: ['English', 'Hindi', 'Marathi']
    }
];

/**
 * Get recommended buddies based on finder preferences
 * @param destinationCity - The city the finder is moving to
 * @param budgetRange - Budget range string (e.g., "₹2,000 - ₹5,000")
 * @param preferredLanguage - Preferred language for communication
 * @returns Array of recommended buddies (max 4)
 */
export function getRecommendedBuddies(
    destinationCity?: string,
    budgetRange?: string,
    preferredLanguage?: string
): BuddyRecommendation[] {
    let filtered = [...EXTENDED_BUDDIES];

    // Filter by city
    if (destinationCity) {
        filtered = filtered.filter(
            buddy => buddy.city.toLowerCase() === destinationCity.toLowerCase()
        );
    }

    // Filter by budget
    if (budgetRange) {
        const maxBudget = parseBudgetRange(budgetRange);
        if (maxBudget) {
            filtered = filtered.filter(buddy => buddy.startingPrice <= maxBudget);
        }
    }

    // Filter by language
    if (preferredLanguage) {
        filtered = filtered.filter(buddy =>
            buddy.languages.some(
                lang => lang.toLowerCase() === preferredLanguage.toLowerCase()
            )
        );
    }

    // Sort by rating (highest first)
    filtered.sort((a, b) => b.rating - a.rating);

    // Return top 4
    return filtered.slice(0, 4);
}

/**
 * Parse budget range string to get maximum budget
 * @param budgetRange - Budget range string
 * @returns Maximum budget as number
 */
function parseBudgetRange(budgetRange: string): number | null {
    // Remove ₹ and commas, extract numbers
    const numbers = budgetRange.match(/\d+/g);
    if (!numbers || numbers.length === 0) return null;

    // If it ends with +, use a high number
    if (budgetRange.includes('+')) {
        return 999999; // Essentially no limit
    }

    // Otherwise, get the second number (max) or first if only one
    const maxBudget = numbers.length > 1 ? parseInt(numbers[1]) : parseInt(numbers[0]);
    return maxBudget;
}

/**
 * Get all buddies for a specific city
 * @param city - City name
 * @returns Array of all buddies in that city
 */
export function getBuddiesByCity(city: string): BuddyRecommendation[] {
    return EXTENDED_BUDDIES.filter(
        buddy => buddy.city.toLowerCase() === city.toLowerCase()
    );
}
