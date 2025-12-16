import React, { useEffect, useState } from 'react';
import { performanceAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

/* ================= ADMIN CREATE REVIEW ================= */
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
    onCreated();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Create Performance Review</h2>

      <select
        value={form.userId}
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
        value={form.review_period}
        className="w-full mb-3 border rounded p-2"
        placeholder="Review Period (e.g. Q1 2025)"
        onChange={e => setForm({ ...form, review_period: e.target.value })}
      />

      <textarea
        value={form.goals}
        className="w-full mb-3 border rounded p-2"
        placeholder="Goals"
        onChange={e => setForm({ ...form, goals: e.target.value })}
      />

      <textarea
        value={form.achievements}
        className="w-full mb-3 border rounded p-2"
        placeholder="Achievements"
        onChange={e => setForm({ ...form, achievements: e.target.value })}
      />

      <textarea
        value={form.manager_feedback}
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

  if (loading) return <p className="pt-24 text-center">Loading...</p>;

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">

        {(user.role === 'Admin' || user.role === 'HR') && (
          <CreateReviewForm onCreated={loadReviews} />
        )}

        {error && <div className="text-red-600">{error}</div>}

        {reviews.length === 0 ? (
          <div className="bg-white p-10 rounded shadow text-center">
            No Performance Reviews Yet
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews.map(r => (
              <div key={r.id} className="bg-white rounded shadow p-6">
                <h3 className="font-bold">{r.review_period}</h3>
                <p>⭐ {r.rating}/5</p>
                {r.goals && <p><b>Goals:</b> {r.goals}</p>}
                {r.achievements && <p><b>Achievements:</b> {r.achievements}</p>}
                {r.manager_feedback && <p>"{r.manager_feedback}"</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Performance;
