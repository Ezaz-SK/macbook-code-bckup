import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageSquare, Filter } from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { MOCK_BUDDY_REVIEWS, MOCK_BUDDY_STATS } from '@/data/mockData';

export const BuddyReviewsPage = () => {
    const stats = MOCK_BUDDY_STATS;
    const [selectedFilter, setSelectedFilter] = useState<'all' | number>('all');
    const [showReplyForm, setShowReplyForm] = useState<string | null>(null);

    const filteredReviews = selectedFilter === 'all'
        ? MOCK_BUDDY_REVIEWS
        : MOCK_BUDDY_REVIEWS.filter(r => r.rating === selectedFilter);

    const ratingDistribution = [
        { stars: 5, count: 98, percentage: 79 },
        { stars: 4, count: 20, percentage: 16 },
        { stars: 3, count: 4, percentage: 3 },
        { stars: 2, count: 2, percentage: 2 },
        { stars: 1, count: 0, percentage: 0 },
    ];

    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Reviews & Ratings</h1>
                <p className="text-ink-400">See what your clients are saying about you</p>
            </div>

            {/* Rating Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <FluidCard className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 md:col-span-1">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-yellow-600 mb-2">{stats.averageRating}</div>
                        <div className="flex justify-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={20}
                                    className={star <= Math.floor(stats.averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-ink-400">{stats.totalReviews} reviews</p>
                    </div>
                </FluidCard>

                <FluidCard className="md:col-span-2">
                    <h3 className="font-semibold mb-4">Rating Distribution</h3>
                    <div className="space-y-2">
                        {ratingDistribution.map((item) => (
                            <div key={item.stars} className="flex items-center gap-3">
                                <div className="flex items-center gap-1 w-16">
                                    <span className="text-sm font-medium">{item.stars}</span>
                                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                </div>
                                <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percentage}%` }}
                                        className="h-full bg-yellow-500"
                                        transition={{ duration: 0.5, delay: item.stars * 0.1 }}
                                    />
                                </div>
                                <span className="text-sm text-ink-400 w-12 text-right">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </FluidCard>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3 mb-6">
                <Filter size={18} className="text-ink-400" />
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setSelectedFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFilter === 'all'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-ink-400 hover:bg-gray-200'
                            }`}
                    >
                        All ({MOCK_BUDDY_REVIEWS.length})
                    </button>
                    {[5, 4, 3, 2, 1].map((stars) => (
                        <button
                            key={stars}
                            onClick={() => setSelectedFilter(stars)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${selectedFilter === stars
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-ink-400 hover:bg-gray-200'
                                }`}
                        >
                            {stars} <Star size={14} fill="currentColor" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                    <FluidCard className="text-center py-12">
                        <p className="text-ink-400">No reviews found for this rating</p>
                    </FluidCard>
                ) : (
                    filteredReviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <FluidCard>
                                {/* Reviewer Info */}
                                <div className="flex items-start gap-4 mb-4">
                                    {review.reviewerPhoto && (
                                        <img
                                            src={review.reviewerPhoto}
                                            alt={review.reviewerName}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-semibold">{review.reviewerName}</h4>
                                                <p className="text-xs text-ink-400">
                                                    {review.createdAt.toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={16}
                                                        className={
                                                            star <= review.rating
                                                                ? 'text-yellow-500 fill-yellow-500'
                                                                : 'text-gray-300'
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Review Comment */}
                                        <p className="text-ink-600 mb-3">{review.comment}</p>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4 text-sm">
                                            <button className="flex items-center gap-1 text-ink-400 hover:text-primary transition-colors">
                                                <ThumbsUp size={14} />
                                                <span>Helpful ({review.helpful})</span>
                                            </button>
                                            <button
                                                onClick={() => setShowReplyForm(showReplyForm === review.id ? null : review.id)}
                                                className="flex items-center gap-1 text-ink-400 hover:text-primary transition-colors"
                                            >
                                                <MessageSquare size={14} />
                                                <span>Reply</span>
                                            </button>
                                        </div>

                                        {/* Reply Form */}
                                        {showReplyForm === review.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-4 p-4 bg-gray-50 rounded-xl"
                                            >
                                                <textarea
                                                    placeholder="Write your response..."
                                                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                                    rows={3}
                                                />
                                                <div className="flex gap-2 mt-2">
                                                    <ElasticButton className="!py-2 text-sm">
                                                        Post Reply
                                                    </ElasticButton>
                                                    <ElasticButton
                                                        variant="ghost"
                                                        className="!py-2 text-sm border border-gray-200"
                                                        onClick={() => setShowReplyForm(null)}
                                                    >
                                                        Cancel
                                                    </ElasticButton>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </FluidCard>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Tips Card */}
            <FluidCard className="mt-8 bg-gradient-to-br from-primary/5 to-primary/10">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                    💡 Tips for Great Reviews
                </h3>
                <ul className="text-sm text-ink-600 space-y-1">
                    <li>• Respond to reviews promptly to show you care</li>
                    <li>• Thank clients for positive feedback</li>
                    <li>• Address concerns in negative reviews professionally</li>
                    <li>• Use feedback to improve your services</li>
                </ul>
            </FluidCard>
        </div>
    );
};
