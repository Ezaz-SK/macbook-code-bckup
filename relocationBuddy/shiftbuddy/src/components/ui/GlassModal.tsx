import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';

interface GlassModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export const GlassModal = ({ isOpen, onClose, children, title }: GlassModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <FluidCard className="w-full max-w-lg pointer-events-auto bg-surface/90 backdrop-blur-xl border border-white/20">
                            <div className="flex items-center justify-between mb-4">
                                {title && <h2 className="text-xl font-bold">{title}</h2>}
                                <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            {children}
                        </FluidCard>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
