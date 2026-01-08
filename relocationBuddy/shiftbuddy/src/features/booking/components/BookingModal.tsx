import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassModal } from '@/components/ui/GlassModal';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { CheckCircle } from 'lucide-react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    buddyName: string;
    price: number;
}

export const BookingModal = ({ isOpen, onClose, buddyName, price }: BookingModalProps) => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');

    const handlePayment = () => {
        // Mock payment processing
        setTimeout(() => {
            setStep('success');
        }, 1500);
    };

    const handleFinish = () => {
        onClose();
        navigate('/dashboard');
    };

    return (
        <GlassModal isOpen={isOpen} onClose={onClose} title={step === 'success' ? '' : 'Book Your Buddy'}>
            {step === 'details' && (
                <div className="space-y-4">
                    <p className="text-ink-400">
                        You are booking <span className="font-bold text-ink-900">{buddyName}</span> for a relocation assistance service.
                    </p>

                    <div className="bg-paper p-4 rounded-xl space-y-2">
                        <div className="flex justify-between">
                            <span>Service Fee</span>
                            <span>₹{price}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Platform Fee</span>
                            <span>₹49</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
                            <span>Total</span>
                            <span>₹{price + 49}</span>
                        </div>
                    </div>

                    <ElasticButton onClick={() => setStep('payment')} className="w-full">
                        Proceed to Payment
                    </ElasticButton>
                </div>
            )}

            {step === 'payment' && (
                <div className="space-y-4">
                    <p className="text-ink-400">Select Payment Method (Mock)</p>

                    <div className="space-y-2">
                        {['UPI', 'Credit Card', 'Net Banking'].map((method) => (
                            <button
                                key={method}
                                onClick={handlePayment}
                                className="w-full p-4 text-left border border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors"
                            >
                                {method}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'success' && (
                <div className="text-center space-y-4 py-8">
                    <div className="flex justify-center text-green-500 mb-4">
                        <CheckCircle size={64} />
                    </div>
                    <h3 className="text-2xl font-bold">Booking Confirmed!</h3>
                    <p className="text-ink-400">
                        {buddyName} has been notified. You can track the progress in your dashboard.
                    </p>
                    <ElasticButton onClick={handleFinish} className="w-full">
                        Go to Dashboard
                    </ElasticButton>
                </div>
            )}
        </GlassModal>
    );
};
