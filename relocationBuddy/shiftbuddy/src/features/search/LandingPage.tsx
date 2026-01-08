import { HeroSection } from './components/HeroSection';
import { PartnerTicker } from './components/PartnerTicker';
import { CityGrid } from './components/CityGrid';
import { TestimonialStories } from './components/TestimonialStories';

export const LandingPage = () => {
    return (
        <div className="min-h-screen ">
            <HeroSection />
            <PartnerTicker />
            <TestimonialStories />
            <CityGrid />
        </div>
    );
};
