import { Linkedin, Instagram, Globe } from 'lucide-react';

interface SocialLinksProps {
    linkedin?: string;
    instagram?: string;
    website?: string;
}

export const SocialLinks = ({ linkedin, instagram, website }: SocialLinksProps) => {
    return (
        <div className="flex items-center gap-3">
            {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                    <Linkedin size={20} />
                </a>
            )}
            {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors">
                    <Instagram size={20} />
                </a>
            )}
            {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                    <Globe size={20} />
                </a>
            )}
        </div>
    );
};
