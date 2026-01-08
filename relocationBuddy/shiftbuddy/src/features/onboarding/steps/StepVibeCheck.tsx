
import { useState, useRef } from 'react';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { Camera, Video, StopCircle, Trash2 } from 'lucide-react';

interface StepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
}

export const StepVibeCheck = ({ data, updateData, onNext }: StepProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            updateData({ photo: e.target.files[0] });
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            const chunks: Blob[] = [];
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
                updateData({ introVideo: blob });

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing media devices:", err);
            alert("Could not access camera/microphone. Please allow permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const resetVideo = () => {
        setVideoUrl(null);
        updateData({ introVideo: null });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.photo) {
            alert("Please upload a profile photo.");
            return;
        }
        if (!data.introVideo) {
            alert("Please record an intro video.");
            return;
        }
        onNext();
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-ink-900 mb-2">Vibe Check</h2>
                <p className="text-ink-400">Parents trust faces, not text. Show them who you are.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Profile Photo */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-ink-900 border-b pb-2">1. Profile Photo</h3>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                            {data.photo ? (
                                <img
                                    src={URL.createObjectURL(data.photo)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Camera className="text-gray-400" size={32} />
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block w-full">
                                <span className="sr-only">Choose profile photo</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary/10 file:text-primary
                    hover:file:bg-primary/20
                  "
                                />
                            </label>
                            <p className="text-xs text-ink-400 mt-2">Upload a clear selfie. Smile required! :)</p>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-ink-900 border-b pb-2">2. Your Bio (140 chars)</h3>
                    <div>
                        <textarea
                            required
                            maxLength={140}
                            value={data.bio}
                            onChange={(e) => updateData({ bio: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none h-24 resize-none"
                            placeholder="I'm Rahul. I help techies find flats near Cyber Hub without brokers."
                        />
                        <p className="text-xs text-right text-ink-400 mt-1">
                            {data.bio.length}/140
                        </p>
                    </div>
                </div>

                {/* Intro Video */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-ink-900 border-b pb-2">3. The Pitch (15s)</h3>

                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mb-4">
                        <p className="text-sm font-medium text-primary mb-1">🎥 Video Prompt:</p>
                        <p className="text-ink-600 italic">
                            {data.persona === 'student' && '"Tell us your favorite cheap food spot near college."'}
                            {data.persona === 'professional' && '"Tell us why your area is best for office goers."'}
                            {data.persona === 'local' && '"Tell us a hidden gem in your neighborhood."'}
                            {!data.persona && '"Tell us why you know this area best."'}
                        </p>
                    </div>

                    <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
                        {!videoUrl && !isRecording && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70">
                                <Video size={48} className="mb-2" />
                                <p>Camera Preview</p>
                            </div>
                        )}

                        {/* Live Camera View */}
                        <video
                            ref={videoRef}
                            className={`w-full h-full object-cover ${videoUrl ? 'hidden' : 'block'}`}
                            muted
                            playsInline
                        />

                        {/* Recorded Playback */}
                        {videoUrl && (
                            <video
                                src={videoUrl}
                                className="w-full h-full object-cover"
                                controls
                            />
                        )}

                        {/* Controls Overlay */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                            {!isRecording && !videoUrl && (
                                <button
                                    type="button"
                                    onClick={startRecording}
                                    className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors shadow-lg"
                                >
                                    <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                                    Record
                                </button>
                            )}

                            {isRecording && (
                                <button
                                    type="button"
                                    onClick={stopRecording}
                                    className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-colors shadow-lg"
                                >
                                    <StopCircle size={18} />
                                    Stop Recording
                                </button>
                            )}

                            {videoUrl && (
                                <button
                                    type="button"
                                    onClick={resetVideo}
                                    className="flex items-center gap-2 px-6 py-2 bg-white text-red-600 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    <Trash2 size={18} />
                                    Retake
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <ElasticButton type="submit" className="w-full">
                        Next Step
                    </ElasticButton>
                </div>
            </form>
        </div>
    );
};
