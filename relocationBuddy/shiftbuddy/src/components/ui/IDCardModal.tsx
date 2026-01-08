import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';


interface IDCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    buddy: {
        name: string;
        college: string;
        photoUrl: string;
        id: string;
    };
}

export const IDCardModal = ({ isOpen, onClose, buddy }: IDCardModalProps) => {
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
                            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                            exit={{ scale: 0.9, opacity: 0, rotateX: 20 }}
                            className="pointer-events-auto w-full max-w-sm"
                        >
                            <div className="relative">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                {/* ID Card Design */}
                                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200 relative">
                                    {/* Header Pattern */}
                                    <div className="h-24 bg-primary relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,white,transparent)]" />
                                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white rounded-t-[50%]" />
                                        <div className="absolute top-4 left-0 right-0 text-center text-white font-bold tracking-widest text-sm opacity-80">
                                            BUDDY ID
                                        </div>
                                    </div>

                                    <div className="px-6 pb-8 text-center -mt-12 relative z-10">
                                        {/* Photo */}
                                        <div className="w-24 h-24 mx-auto rounded-full p-1 bg-white shadow-lg mb-4">
                                            <img
                                                src={buddy.photoUrl}
                                                alt={buddy.name}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>

                                        {/* Info */}
                                        <h2 className="text-xl font-bold text-ink-900 mb-1">{buddy.name}</h2>
                                        <p className="text-primary font-medium text-sm mb-6">{buddy.college}</p>

                                        <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3 text-sm border border-gray-100">
                                            <div className="flex justify-between">
                                                <span className="text-ink-400">ID Number</span>
                                                <span className="font-mono font-medium text-ink-900">SB-{buddy.id.padStart(4, '0')}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-ink-400">Course</span>
                                                <span className="font-medium text-ink-900">B.B.A.</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-ink-400">Valid Thru</span>
                                                <span className="font-medium text-ink-900">May 2025</span>
                                            </div>
                                        </div>

                                        {/* Verified Stamp */}
                                        <div className="mt-6 flex items-center justify-center gap-2 text-green-600 bg-green-50 py-2 rounded-lg border border-green-100">
                                            <ShieldCheck size={18} />
                                            <span className="font-bold text-sm uppercase tracking-wide">Verified Buddy</span>
                                        </div>
                                    </div>

                                    {/* Holographic Strip Effect */}
                                    <div className="h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent absolute bottom-0 left-0 right-0" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
