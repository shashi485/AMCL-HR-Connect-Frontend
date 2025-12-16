import React, { useEffect, useState } from 'react';
import { performanceAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

/* =====================================================
   ADMIN CREATE REVIEW FORM (NEW - UI SAFE)
===================================================== */
const CreateReviewForm = ({ onCreated }) => {
  const [employees, setEmployees] = useState([]);
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

  const submit = async () => {
    if (!form.userId || !form.review_period) {
      alert('Please select employee and review period');
      return;
    }

    await performanceAPI.createReview(form);
    onCreated();
    alert('Performance review created successfully');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Create Performance Review</h2>

      <select
        className="w-full mb-3 border rounded p-2"
        onChange={e => setForm({ ...form, userId: e.target.value })}
      >
        <option value="">Select Employee</option>
        <option value="ALL">All Employees</option>
        {employees.map(e => (
          <option key={e.id} value={e.id}>
            {e.full_name} ({e.employee_id})
          </option>
        ))}
      </select>

      <input
        className="w-full mb-3 border rounded p-2"
        placeholder="Review Period (e.g. Q1 2025)"
        onChange={e => setForm({ ...form, review_period: e.target.value })}
      />

      <textarea
        className="w-full mb-3 border rounded p-2"
        placeholder="Goals"
        onChange={e => setForm({ ...form, goals: e.target.value })}
      />

      <textarea
        className="w-full mb-3 border rounded p-2"
        placeholder="Achievements"
        onChange={e => setForm({ ...form, achievements: e.target.value })}
      />

      <textarea
        className="w-full mb-3 border rounded p-2"
        placeholder="Manager Feedback"
        onChange={e => setForm({ ...form, manager_feedback: e.target.value })}
      />

      <button
        onClick={submit}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
      >
        Submit Review
      </button>
    </div>
  );
};

/* =====================================================
   MAIN PERFORMANCE PAGE (UNCHANGED UI)
===================================================== */
const Performance = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line
  }, []);

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

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

  if (loading) {
    return (
      <div className="min-h-screen pt-24 text-center">
        <p>Loading performance reviews...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER (UNCHANGED) */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Performance Reviews</h1>
          <p className="text-gray-600 text-sm">Track your performance and achievements</p>
        </div>

        {/* ✅ ADMIN CREATE REVIEW (ONLY ADDITION) */}
        {(user.role === 'Admin' || user.role === 'HR') && (
          <CreateReviewForm onCreated={loadReviews} />
        )}

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        {/* REVIEWS LIST (UNCHANGED) */}
        {reviews.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl shadow">
            No Performance Reviews Yet
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews.map(review => (
              <div
                key={review.id}
                className="bg-white rounded-2xl shadow border overflow-hidden"
              >
                <div className="bg-indigo-600 text-white p-6">
                  <h2 className="text-xl font-bold">{review.review_period}</h2>
                  <p className="text-sm">{formatDate(review.created_at)}</p>
                  <p className="text-2xl font-bold mt-2">⭐ {review.rating}/5</p>
                </div>

                <div className="p-6 space-y-3">
                  {(user.role === 'Admin' || user.role === 'HR') && (
                    <p className="font-semibold">
                      Employee: {review.employee_name}
                    </p>
                  )}

                  {review.goals && <p><b>Goals:</b> {review.goals}</p>}
                  {review.achievements && <p><b>Achievements:</b> {review.achievements}</p>}
                  {review.manager_feedback && (
                    <p className="italic">"{review.manager_feedback}"</p>
                  )}

                  <span className="text-xs bg-green-100 px-3 py-1 rounded-full">
                    {review.status || 'Completed'}
                  </span>
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
