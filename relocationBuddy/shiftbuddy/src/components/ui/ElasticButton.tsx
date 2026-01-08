import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ElasticButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
    className?: string;
}

export const ElasticButton = ({
    children,
    variant = 'primary',
    className,
    ...props
}: ElasticButtonProps) => {

    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-primary-soft text-primary hover:bg-primary-soft/80",
        accent: "bg-accent text-white hover:bg-accent/90",
        ghost: "bg-transparent text-ink-900 hover:bg-paper"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "px-6 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
