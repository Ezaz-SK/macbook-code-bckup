// Comprehensive Delhi Localities and Zones Data

export interface DelhiLocality {
    id: string;
    name: string;
    zone: 'North' | 'South' | 'East' | 'West' | 'Central' | 'New Delhi' | 'North East' | 'North West' | 'South West' | 'South East';
    district: string;
    pincode: string[];
    popular: boolean; // Top localities
    amenities: string[];
    avgRent?: string;
    metroConnectivity: boolean;
}

export const DELHI_ZONES = [
    'North Delhi',
    'South Delhi',
    'East Delhi',
    'West Delhi',
    'Central Delhi',
    'New Delhi',
    'North East Delhi',
    'North West Delhi',
    'South West Delhi',
    'South East Delhi'
];

export const DELHI_DISTRICTS = [
    'Central Delhi',
    'East Delhi',
    'New Delhi',
    'North Delhi',
    'North East Delhi',
    'North West Delhi',
    'Shahdara',
    'South Delhi',
    'South East Delhi',
    'South West Delhi',
    'West Delhi'
];

export const DELHI_LOCALITIES: DelhiLocality[] = [
    // South Delhi - Popular Areas
    {
        id: 'hauz-khas',
        name: 'Hauz Khas',
        zone: 'South',
        district: 'South Delhi',
        pincode: ['110016'],
        popular: true,
        amenities: ['Metro', 'Cafes', 'Nightlife', 'Markets', 'Parks'],
        avgRent: '₹25,000 - ₹50,000',
        metroConnectivity: true
    },
    {
        id: 'saket',
        name: 'Saket',
        zone: 'South',
        district: 'South Delhi',
        pincode: ['110017'],
        popular: true,
        amenities: ['Metro', 'Mall', 'Hospitals', 'Schools'],
        avgRent: '₹30,000 - ₹60,000',
        metroConnectivity: true
    },
    {
        id: 'green-park',
        name: 'Green Park',
        zone: 'South',
        district: 'South Delhi',
        pincode: ['110016'],
        popular: true,
        amenities: ['Metro', 'Markets', 'Restaurants'],
        avgRent: '₹28,000 - ₹55,000',
        metroConnectivity: true
    },
    {
        id: 'greater-kailash',
        name: 'Greater Kailash (GK)',
        zone: 'South',
        district: 'South Delhi',
        pincode: ['110048', '110049'],
        popular: true,
        amenities: ['Metro', 'M-Block Market', 'Restaurants', 'Hospitals'],
        avgRent: '₹35,000 - ₹70,000',
        metroConnectivity: true
    },
    {
        id: 'defence-colony',
        name: 'Defence Colony',
        zone: 'South',
        district: 'South Delhi',
        pincode: ['110024'],
        popular: true,
        amenities: ['Metro', 'Markets', 'Restaurants'],
        avgRent: '₹30,000 - ₹65,000',
        metroConnectivity: true
    },
    {
        id: 'lajpat-nagar',
        name: 'Lajpat Nagar',
        zone: 'South',
        district: 'South Delhi',
        pincode: ['110024'],
        popular: true,
        amenities: ['Metro', 'Central Market', 'Shopping'],
        avgRent: '₹20,000 - ₹40,000',
        metroConnectivity: true
    },
    {
        id: 'nehru-place',
        name: 'Nehru Place',
        zone: 'South',
        district: 'South Delhi',
        pincode: ['110019'],
        popular: true,
        amenities: ['Metro', 'IT Hub', 'Markets'],
        avgRent: '₹18,000 - ₹35,000',
        metroConnectivity: true
    },
    {
        id: 'malviya-nagar',
        name: 'Malviya Nagar',
        zone: 'South',
        district: 'South Delhi',
        pincode: ['110017'],
        popular: true,
        amenities: ['Metro', 'Markets', 'Restaurants'],
        avgRent: '₹22,000 - ₹45,000',
        metroConnectivity: true
    },

    // North Delhi
    {
        id: 'rohini',
        name: 'Rohini',
        zone: 'North West',
        district: 'North West Delhi',
        pincode: ['110085', '110086', '110089'],
        popular: true,
        amenities: ['Metro', 'Markets', 'Malls', 'Parks'],
        avgRent: '₹15,000 - ₹30,000',
        metroConnectivity: true
    },
    {
        id: 'pitampura',
        name: 'Pitampura',
        zone: 'North West',
        district: 'North West Delhi',
        pincode: ['110034', '110088'],
        popular: true,
        amenities: ['Metro', 'TV Tower', 'Markets'],
        avgRent: '₹16,000 - ₹32,000',
        metroConnectivity: true
    },
    {
        id: 'model-town',
        name: 'Model Town',
        zone: 'North',
        district: 'North Delhi',
        pincode: ['110009'],
        popular: true,
        amenities: ['Metro', 'Green Area', 'Markets'],
        avgRent: '₹20,000 - ₹40,000',
        metroConnectivity: true
    },
    {
        id: 'civil-lines',
        name: 'Civil Lines',
        zone: 'North',
        district: 'North Delhi',
        pincode: ['110054'],
        popular: false,
        amenities: ['Delhi University', 'Historic Area'],
        avgRent: '₹25,000 - ₹50,000',
        metroConnectivity: true
    },

    // West Delhi
    {
        id: 'rajouri-garden',
        name: 'Rajouri Garden',
        zone: 'West',
        district: 'West Delhi',
        pincode: ['110027'],
        popular: true,
        amenities: ['Metro', 'Markets', 'Restaurants', 'Malls'],
        avgRent: '₹18,000 - ₹35,000',
        metroConnectivity: true
    },
    {
        id: 'janakpuri',
        name: 'Janakpuri',
        zone: 'West',
        district: 'West Delhi',
        pincode: ['110058'],
        popular: true,
        amenities: ['Metro', 'District Center', 'Parks'],
        avgRent: '₹15,000 - ₹30,000',
        metroConnectivity: true
    },
    {
        id: 'dwarka',
        name: 'Dwarka',
        zone: 'South West',
        district: 'South West Delhi',
        pincode: ['110075', '110077', '110078'],
        popular: true,
        amenities: ['Metro', 'Malls', 'Airport Proximity', 'Sectors'],
        avgRent: '₹12,000 - ₹28,000',
        metroConnectivity: true
    },
    {
        id: 'uttam-nagar',
        name: 'Uttam Nagar',
        zone: 'West',
        district: 'West Delhi',
        pincode: ['110059'],
        popular: false,
        amenities: ['Metro', 'Markets'],
        avgRent: '₹10,000 - ₹20,000',
        metroConnectivity: true
    },

    // East Delhi
    {
        id: 'mayur-vihar',
        name: 'Mayur Vihar',
        zone: 'East',
        district: 'East Delhi',
        pincode: ['110091', '110096'],
        popular: true,
        amenities: ['Metro', 'Malls', 'Markets'],
        avgRent: '₹15,000 - ₹30,000',
        metroConnectivity: true
    },
    {
        id: 'preet-vihar',
        name: 'Preet Vihar',
        zone: 'East',
        district: 'East Delhi',
        pincode: ['110092'],
        popular: true,
        amenities: ['Metro', 'Markets', 'Community Center'],
        avgRent: '₹14,000 - ₹28,000',
        metroConnectivity: true
    },
    {
        id: 'laxmi-nagar',
        name: 'Laxmi Nagar',
        zone: 'East',
        district: 'East Delhi',
        pincode: ['110092'],
        popular: true,
        amenities: ['Metro', 'Central Market', 'Coaching Hubs'],
        avgRent: '₹12,000 - ₹25,000',
        metroConnectivity: true
    },
    {
        id: 'noida-border',
        name: 'Anand Vihar',
        zone: 'East',
        district: 'East Delhi',
        pincode: ['110092'],
        popular: false,
        amenities: ['Metro', 'ISBT', 'Railway Station'],
        avgRent: '₹13,000 - ₹26,000',
        metroConnectivity: true
    },

    // Central Delhi
    {
        id: 'connaught-place',
        name: 'Connaught Place (CP)',
        zone: 'New Delhi',
        district: 'New Delhi',
        pincode: ['110001'],
        popular: true,
        amenities: ['Metro', 'Shopping', 'Offices', 'Restaurants'],
        avgRent: '₹40,000 - ₹80,000',
        metroConnectivity: true
    },
    {
        id: 'karol-bagh',
        name: 'Karol Bagh',
        zone: 'Central',
        district: 'Central Delhi',
        pincode: ['110005'],
        popular: true,
        amenities: ['Metro', 'Markets', 'Shopping Hub'],
        avgRent: '₹18,000 - ₹35,000',
        metroConnectivity: true
    },
    {
        id: 'paharganj',
        name: 'Paharganj',
        zone: 'Central',
        district: 'Central Delhi',
        pincode: ['110055'],
        popular: false,
        amenities: ['Railway Station', 'Budget Hotels', 'Markets'],
        avgRent: '₹10,000 - ₹20,000',
        metroConnectivity: true
    },

    // South West Delhi
    {
        id: 'vasant-kunj',
        name: 'Vasant Kunj',
        zone: 'South West',
        district: 'South West Delhi',
        pincode: ['110070'],
        popular: true,
        amenities: ['Metro', 'Malls', 'Ambience Mall', 'DLF Promenade'],
        avgRent: '₹25,000 - ₹55,000',
        metroConnectivity: true
    },
    {
        id: 'vasant-vihar',
        name: 'Vasant Vihar',
        zone: 'South West',
        district: 'South West Delhi',
        pincode: ['110057'],
        popular: true,
        amenities: ['Upscale Area', 'Embassies', 'Restaurants'],
        avgRent: '₹40,000 - ₹90,000',
        metroConnectivity: false
    },

    // North East Delhi
    {
        id: 'dilshad-garden',
        name: 'Dilshad Garden',
        zone: 'North East',
        district: 'North East Delhi',
        pincode: ['110095'],
        popular: false,
        amenities: ['Metro', 'Markets'],
        avgRent: '₹10,000 - ₹20,000',
        metroConnectivity: true
    },

    // More South Delhi
    {
        id: 'south-ex',
        name: 'South Extension',
        zone: 'South',
        district: 'South Delhi',
        pincode: ['110049'],
        popular: true,
        amenities: ['Metro', 'Shopping', 'Restaurants', 'Markets'],
        avgRent: '₹30,000 - ₹65,000',
        metroConnectivity: true
    },
    {
        id: 'cr-park',
        name: 'CR Park',
        zone: 'South',
        district: 'South Delhi',
        pincode: ['110019'],
        popular: true,
        amenities: ['Metro', 'Bengali Culture', 'Markets'],
        avgRent: '₹20,000 - ₹40,000',
        metroConnectivity: true
    },
    {
        id: 'kalkaji',
        name: 'Kalkaji',
        zone: 'South',
        district: 'South Delhi',
        pincode: ['110019'],
        popular: true,
        amenities: ['Metro', 'Temple', 'Markets'],
        avgRent: '₹18,000 - ₹35,000',
        metroConnectivity: true
    }
];

// Get popular localities
export const getPopularLocalities = (): DelhiLocality[] => {
    return DELHI_LOCALITIES.filter(loc => loc.popular);
};

// Get localities by zone
export const getLocalitiesByZone = (zone: string): DelhiLocality[] => {
    return DELHI_LOCALITIES.filter(loc => loc.zone === zone);
};

// Get localities with metro
export const getMetroConnectedLocalities = (): DelhiLocality[] => {
    return DELHI_LOCALITIES.filter(loc => loc.metroConnectivity);
};

// Search localities
export const searchLocalities = (query: string): DelhiLocality[] => {
    const lowerQuery = query.toLowerCase();
    return DELHI_LOCALITIES.filter(loc =>
        loc.name.toLowerCase().includes(lowerQuery) ||
        loc.zone.toLowerCase().includes(lowerQuery) ||
        loc.district.toLowerCase().includes(lowerQuery)
    );
};
