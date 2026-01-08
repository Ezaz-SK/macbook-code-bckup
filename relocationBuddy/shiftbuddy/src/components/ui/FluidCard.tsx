import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/cn';

interface FluidCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
}

export const FluidCard = ({ children, className, ...props }: FluidCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "bg-surface rounded-3xl shadow-gravity-sm hover:shadow-gravity-lg transition-shadow duration-300 p-6",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};
