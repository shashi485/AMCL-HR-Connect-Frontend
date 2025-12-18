import React, { useEffect, useState } from 'react';
import { performanceAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

/* ================= ICONS ================= */
const TrophyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AwardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 4v16m8-8H4" />
  </svg>
);

/* ================= ADMIN CREATE REVIEW ================= */
const CreateReviewForm = ({ onCreated }) => {
  const [employees, setEmployees] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [form, setForm] = useState({
    userId: '',
    rating: 5,
    review_period: '',
    goals: '',
    achievements: '',
    manager_feedback: ''
  });

  useEffect(() => {
    performanceAPI.getEmployees().then(res => setEmployees(res.data));
  }, []);

  const resetForm = () => {
    setForm({
      userId: '',
      rating: 5,
      review_period: '',
      goals: '',
      achievements: '',
      manager_feedback: ''
    });
  };

  const submit = async () => {
    if (!form.userId || !form.review_period) {
      alert('Please select employee and review period');
      return;
    }

    await performanceAPI.createReview(form);
    alert('Performance review created successfully');
    resetForm();
    setIsExpanded(false);
    onCreated();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
      <div 
        className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 cursor-pointer hover:from-indigo-600 hover:to-purple-600 transition-all"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <PlusIcon />
            </div>
            <div>
              <h2 className="text-xl font-bold">Create Performance Review</h2>
              <p className="text-sm text-indigo-100">Add a new review for employees</p>
            </div>
          </div>
          <svg 
            className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="space-y-4">
            {/* Employee Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <UserIcon />
                Select Employee
              </label>
              <select
                value={form.userId}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-white"
                onChange={e => setForm({ ...form, userId: e.target.value })}
              >
                <option value="">Choose an employee...</option>
                <option value="ALL">📋 All Employees</option>
                {employees.map(e => (
                  <option key={e.id} value={e.id}>
                    👤 {e.full_name} ({e.employee_id})
                  </option>
                ))}
              </select>
            </div>

            {/* Review Period */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <CalendarIcon />
                Review Period
              </label>
              <input
                value={form.review_period}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                placeholder="e.g., Q1 2025, January 2025"
                onChange={e => setForm({ ...form, review_period: e.target.value })}
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rating: {form.rating}/5
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, rating: star })}
                    className={`transform hover:scale-110 transition-transform ${
                      star <= form.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <StarIcon filled={star <= form.rating} />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">({form.rating} star{form.rating !== 1 ? 's' : ''})</span>
              </div>
            </div>

            {/* Goals */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <TargetIcon />
                Goals
              </label>
              <textarea
                value={form.goals}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none h-24"
                placeholder="Enter goals for this review period..."
                onChange={e => setForm({ ...form, goals: e.target.value })}
              />
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <AwardIcon />
                Achievements
              </label>
              <textarea
                value={form.achievements}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none h-24"
                placeholder="Describe key achievements and accomplishments..."
                onChange={e => setForm({ ...form, achievements: e.target.value })}
              />
            </div>

            {/* Manager Feedback */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MessageIcon />
                Manager Feedback
              </label>
              <textarea
                value={form.manager_feedback}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none h-24"
                placeholder="Add manager's feedback and comments..."
                onChange={e => setForm({ ...form, manager_feedback: e.target.value })}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={submit}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <PlusIcon />
                Create Review
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setIsExpanded(false);
                }}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= MAIN PAGE ================= */
const Performance = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReviews = async () => {
    try {
      const res = await performanceAPI.getReviews();
      setReviews(res.data);
      setError('');
    } catch {
      setError('Failed to fetch performance reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'from-green-400 to-emerald-500';
    if (rating >= 3.5) return 'from-blue-400 to-cyan-500';
    if (rating >= 2.5) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading performance reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform text-white">
              <TrophyIcon />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Performance Reviews
              </h1>
              <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                Track progress and celebrate achievements
              </p>
            </div>
          </div>
        </div>

        {/* CREATE FORM */}
        {(user.role === 'Admin' || user.role === 'HR') && (
          <CreateReviewForm onCreated={loadReviews} />
        )}

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 text-red-700 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 font-medium">
              ⚠️ {error}
            </div>
          </div>
        )}

        {/* REVIEWS */}
        {reviews.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-lg text-center border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
              <TrophyIcon />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Performance Reviews Yet</h3>
            <p className="text-gray-500">Reviews will appear here once they are created</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews.map(r => (
              <div 
                key={r.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:scale-[1.02]"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${getRatingColor(r.rating)} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon />
                      <h3 className="font-bold text-lg">{r.review_period}</h3>
                    </div>
                    <div className="flex items-center gap-1 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      {[1, 2, 3, 4, 5].map(star => (
                        <StarIcon key={star} filled={star <= r.rating} />
                      ))}
                    </div>
                  </div>
                  <div className="text-3xl font-bold">{r.rating}/5</div>
                  <p className="text-sm text-white text-opacity-90">Overall Rating</p>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {r.goals && (
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                          <TargetIcon />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-sm mb-1">Goals</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">{r.goals}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {r.achievements && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                          <AwardIcon />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-sm mb-1">Achievements</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">{r.achievements}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {r.manager_feedback && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                          <MessageIcon />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-sm mb-1">Manager Feedback</h4>
                          <p className="text-gray-700 text-sm italic leading-relaxed">"{r.manager_feedback}"</p>
                        </div>
                      </div>
                    </div>
                  )}
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