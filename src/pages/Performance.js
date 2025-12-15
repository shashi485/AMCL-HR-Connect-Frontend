import React, { useEffect, useState } from 'react';
import { performanceAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Performance = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // SVG Icons
    const TrophyIcon = ({ className = "w-6 h-6" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
    );
    const StarIcon = ({ className = "w-5 h-5" }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );
    const XCircleIcon = ({ className = "w-5 h-5" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
    const ChartIcon = ({ className = "w-16 h-16" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    );
    const TargetIcon = ({ className = "w-4 h-4" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    useEffect(() => {
        loadReviews();
        // eslint-disable-next-line
    }, []);

    const loadReviews = async () => {
        try {
            const res = await performanceAPI.getReviews();
            setReviews(res.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch performance reviews');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 pb-12 px-4">
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading performance reviews...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg text-white">
                            <TrophyIcon />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Performance Reviews</h1>
                            <p className="text-gray-600 text-sm mt-1">Track your performance and achievements</p>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                        <div className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5">
                            <XCircleIcon />
                        </div>
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                {/* Reviews Content */}
                {reviews.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                        <div className="text-indigo-200 mb-6 flex justify-center">
                            <ChartIcon />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            No Performance Reviews Yet
                        </h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Performance reviews will appear here once they are created by your manager.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold mb-1">
                                                {review.review_period}
                                            </h2>
                                            <p className="text-indigo-100 text-sm">
                                                {formatDate(review.created_at)}
                                            </p>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                            <div className="flex items-center space-x-1">
                                                <StarIcon className="w-5 h-5 text-yellow-300" />
                                                <span className="text-2xl font-bold">{review.rating}</span>
                                                <span className="text-sm text-indigo-100">/5</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Rating Stars */}
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon
                                                key={star}
                                                className={`w-5 h-5 ${
                                                    star <= review.rating
                                                        ? 'text-yellow-300'
                                                        : 'text-white/30'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6 space-y-4">
                                    {(user.role === 'Admin' || user.role === 'HR') && (
                                        <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                {review.full_name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Employee</p>
                                                <p className="font-semibold text-gray-900">{review.full_name}</p>
                                            </div>
                                        </div>
                                    )}

                                    {review.goals && (
                                        <div className="bg-blue-50 rounded-xl p-4">
                                            <div className="flex items-start space-x-2">
                                                <div className="text-blue-600 mt-0.5">
                                                    <TargetIcon />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-blue-900 text-sm mb-1">Goals</p>
                                                    <p className="text-gray-700 text-sm">{review.goals}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {review.achievements && (
                                        <div className="bg-green-50 rounded-xl p-4">
                                            <div className="flex items-start space-x-2">
                                                <div className="text-green-600 mt-0.5">
                                                    <TrophyIcon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-green-900 text-sm mb-1">Achievements</p>
                                                    <p className="text-gray-700 text-sm">{review.achievements}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {review.manager_feedback && (
                                        <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
                                            <p className="font-semibold text-purple-900 text-sm mb-2">Manager Feedback</p>
                                            <p className="text-gray-700 text-sm italic">"{review.manager_feedback}"</p>
                                        </div>
                                    )}

                                    <div className="pt-3 flex justify-between items-center">
                                        <span
                                            className={`inline-flex items-center px-4 py-2 text-xs rounded-full font-semibold ${
                                                review.status === 'Completed'
                                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                            }`}
                                        >
                                            {review.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Performance;