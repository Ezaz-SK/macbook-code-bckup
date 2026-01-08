import { BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface VerifiedBadgeProps {
    className?: string;
    size?: number;
}

export const VerifiedBadge = ({ className, size = 20 }: VerifiedBadgeProps) => {
    return (
        <div className={`relative group inline-flex items-center ${className}`}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <BadgeCheck size={size} className="text-blue-500 fill-blue-50" />
            </motion.div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-ink-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Identity Verified
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink-900" />
            </div>
        </div>
    );
};
