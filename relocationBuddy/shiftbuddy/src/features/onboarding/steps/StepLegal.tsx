import { ElasticButton } from '@/components/ui/ElasticButton';
import { Upload, ShieldCheck } from 'lucide-react';

interface StepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
}

export const StepLegal = ({ data, updateData, onNext }: StepProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation based on persona
        if (data.persona === 'student' && !data.collegeId) {
            alert("Please upload your College ID.");
            return;
        }
        if (data.persona === 'professional' && !data.workProof) {
            alert("Please upload Work Proof.");
            return;
        }
        if (data.persona === 'local' && !data.addressProof) {
            alert("Please upload Address Proof.");
            return;
        }
        onNext();
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (e.target.files && e.target.files[0]) {
            updateData({ [field]: e.target.files[0] });
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-ink-900 mb-2">Legal Shield</h2>
                <p className="text-ink-400">We verify every buddy to ensure safety. Your data is encrypted.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Aadhar Verification */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-ink-900 border-b pb-2">1. Identity Proof</h3>
                    <div>
                        <label className="block text-sm font-medium text-ink-900 mb-1">Aadhar Number</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                required
                                pattern="[0-9]{12}"
                                value={data.aadhar}
                                onChange={(e) => updateData({ aadhar: e.target.value })}
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                placeholder="12-digit Aadhar Number"
                            />
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-100 text-ink-600 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                </div>

                {/* Adaptive Proof */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-ink-900 border-b pb-2">2. Secondary Proof</h3>

                    {data.persona === 'student' && (
                        <div>
                            <label className="block w-full cursor-pointer">
                                <span className="sr-only">Upload College ID</span>
                                <div className={`
                  border-2 border-dashed rounded-xl p-6 text-center transition-colors
                  ${data.collegeId ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-primary hover:bg-primary/5'}
                `}>
                                    <div className="flex flex-col items-center gap-2">
                                        {data.collegeId ? (
                                            <>
                                                <ShieldCheck className="text-green-600" size={32} />
                                                <p className="font-medium text-green-700">{data.collegeId.name}</p>
                                                <p className="text-xs text-green-600">College ID Selected</p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="text-gray-400" size={32} />
                                                <p className="font-medium text-ink-600">Upload College ID</p>
                                                <p className="text-xs text-ink-400">Front side photo (JPG/PNG)</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'collegeId')}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}

                    {data.persona === 'professional' && (
                        <div>
                            <label className="block w-full cursor-pointer">
                                <span className="sr-only">Upload Work Proof</span>
                                <div className={`
                  border-2 border-dashed rounded-xl p-6 text-center transition-colors
                  ${data.workProof ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-primary hover:bg-primary/5'}
                `}>
                                    <div className="flex flex-col items-center gap-2">
                                        {data.workProof ? (
                                            <>
                                                <ShieldCheck className="text-green-600" size={32} />
                                                <p className="font-medium text-green-700">{data.workProof.name}</p>
                                                <p className="text-xs text-green-600">Work Proof Selected</p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="text-gray-400" size={32} />
                                                <p className="font-medium text-ink-600">Upload Offer Letter / ID</p>
                                                <p className="text-xs text-ink-400">Or verify work email later</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'workProof')}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}

                    {data.persona === 'local' && (
                        <div>
                            <label className="block w-full cursor-pointer">
                                <span className="sr-only">Upload Address Proof</span>
                                <div className={`
                  border-2 border-dashed rounded-xl p-6 text-center transition-colors
                  ${data.addressProof ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-primary hover:bg-primary/5'}
                `}>
                                    <div className="flex flex-col items-center gap-2">
                                        {data.addressProof ? (
                                            <>
                                                <ShieldCheck className="text-green-600" size={32} />
                                                <p className="font-medium text-green-700">{data.addressProof.name}</p>
                                                <p className="text-xs text-green-600">Address Proof Selected</p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="text-gray-400" size={32} />
                                                <p className="font-medium text-ink-600">Upload Utility Bill</p>
                                                <p className="text-xs text-ink-400">Electricity Bill / Rent Agreement</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'addressProof')}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}
                </div>

                {/* Bank Details */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-ink-900 border-b pb-2">3. Payout Details</h3>
                    <div>
                        <label className="block text-sm font-medium text-ink-900 mb-1">UPI ID (Primary)</label>
                        <input
                            type="text"
                            required
                            value={data.upiId}
                            onChange={(e) => updateData({ upiId: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            placeholder="e.g. rahul@okhdfcbank"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <ElasticButton type="submit" className="w-full">
                        Submit Application
                    </ElasticButton>
                    <p className="text-xs text-center text-ink-400 mt-4">
                        By submitting, you agree to our Terms of Service and Buddy Guidelines.
                    </p>
                </div>
            </form>
        </div>
    );
};
