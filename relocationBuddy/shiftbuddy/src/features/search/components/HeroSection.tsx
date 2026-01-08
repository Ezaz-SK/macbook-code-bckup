import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
    const navigate = useNavigate();
    const [textIndex, setTextIndex] = useState(0);
    const cities = ["Delhi", "Bangalore", "Pune", "Mumbai", "Hyderabad"];
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const currentCity = cities[textIndex % cities.length];
        const typeSpeed = isDeleting ? 50 : 150;

        const timer = setTimeout(() => {
            if (!isDeleting && displayText === currentCity) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setTextIndex((prev) => prev + 1);
            } else {
                setDisplayText(
                    currentCity.substring(0, displayText.length + (isDeleting ? -1 : 1))
                );
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, textIndex]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search?q=${searchQuery}`);
    };

    return (
        <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden text-ink-900">
            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-ink-900 flex flex-col md:flex-row items-center justify-center gap-3">
                        <span>Moving to</span>
                        <span className="inline-flex items-center justify-start min-w-[300px] text-primary">
                            {displayText}
                            <span className="animate-pulse text-ink-300 ml-1">|</span>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-ink-500 max-w-2xl mx-auto">
                        Don't deal with brokers. Rent a Local Buddy.
                    </p>
                </div>

                {/* Search Bar - Minimal & Fixed Width */}
                <div className="w-full max-w-2xl mx-auto">
                    <form onSubmit={handleSearch}>
                        <div className="relative flex items-center bg-white border-2 border-gray-100 rounded-2xl p-2 transition-colors hover:border-gray-200 focus-within:border-primary/50 shadow-sm">
                            <Search className="ml-4 text-gray-400 shrink-0" size={24} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for an area (e.g. Koramangala)"
                                className="w-full bg-transparent border-none px-4 py-3 text-lg text-ink-900 placeholder-gray-400 focus:ring-0 outline-none min-w-0"
                            />
                            <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-medium transition-all shrink-0">
                                Find Buddy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
