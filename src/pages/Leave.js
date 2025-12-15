import React, { useEffect, useState } from 'react';
import { leaveAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Leave = () => {
    const { user } = useAuth();

    const [leaves, setLeaves] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Apply Leave (Employee)
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [applyData, setApplyData] = useState({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const isAdminOrHR =
        user?.role?.toLowerCase() === 'admin' ||
        user?.role?.toLowerCase() === 'hr';

    /* ================= LOAD LEAVES ================= */
    useEffect(() => {
        loadLeaves();
        // eslint-disable-next-line
    }, []);

    const loadLeaves = async () => {
        try {
            const res = isAdminOrHR
                ? await leaveAPI.getAllLeaves()
                : await leaveAPI.getMyLeaves();
            setLeaves(res.data);
            setError('');
        } catch {
            setError('Failed to fetch leaves');
        }
    };

    /* ================= APPLY LEAVE ================= */
    const handleApplyLeave = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!applyData.leaveType || !applyData.startDate || !applyData.endDate || !applyData.reason) {
            setError('All fields are required');
            return;
        }

        if (new Date(applyData.startDate) > new Date(applyData.endDate)) {
            setError('End date must be after start date');
            return;
        }

        try {
            await leaveAPI.applyLeave(applyData);
            setMessage('Leave applied successfully');
            setShowApplyForm(false);
            setApplyData({
                leaveType: '',
                startDate: '',
                endDate: '',
                reason: ''
            });
            loadLeaves();
        } catch {
            setError('Failed to apply leave');
        }
    };

    /* ================= ADMIN ACTION ================= */
    const handleLeaveAction = async (leaveId, status) => {
        try {
            await leaveAPI.updateLeaveStatus(leaveId, status);
            setMessage(`Leave ${status.toLowerCase()} successfully`);
            loadLeaves();
        } catch {
            setError('Failed to update leave status');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Leave Management
                </h1>

                {/* ALERTS */}
                {error && <p className="text-red-600 mb-4">{error}</p>}
                {message && <p className="text-green-600 mb-4">{message}</p>}

                {/* ================= APPLY LEAVE (EMPLOYEE ONLY) ================= */}
                {!isAdminOrHR && (
                    <div className="mb-8">
                        <button
                            onClick={() => setShowApplyForm(!showApplyForm)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 font-semibold"
                        >
                            {showApplyForm ? '✕ Cancel' : '+ Apply for Leave'}
                        </button>

                        {showApplyForm && (
                            <form
                                onSubmit={handleApplyLeave}
                                className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6"
                            >
                                <div className="border-b border-gray-200 pb-4 mb-4">
                                    <h2 className="text-xl font-bold text-gray-900">Apply for Leave</h2>
                                    <p className="text-sm text-gray-600 mt-1">Fill in the details to submit your leave request</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Leave Type
                                    </label>
                                    <select
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        value={applyData.leaveType}
                                        onChange={(e) =>
                                            setApplyData({ ...applyData, leaveType: e.target.value })
                                        }
                                    >
                                        <option value="">Select Leave Type</option>
                                        <option value="Sick">🏥 Sick Leave</option>
                                        <option value="Casual">☀️ Casual Leave</option>
                                        <option value="Emergency">🚨 Emergency Leave</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            From Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            value={applyData.startDate}
                                            onChange={(e) =>
                                                setApplyData({ ...applyData, startDate: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            To Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            value={applyData.endDate}
                                            onChange={(e) =>
                                                setApplyData({ ...applyData, endDate: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Reason
                                    </label>
                                    <textarea
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                        placeholder="Please provide a detailed reason for your leave request..."
                                        value={applyData.reason}
                                        onChange={(e) =>
                                            setApplyData({ ...applyData, reason: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold transition-all duration-200"
                                    >
                                        Submit Leave Request
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowApplyForm(false)}
                                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {/* ================= LEAVE TABLE ================= */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-white">
                            {isAdminOrHR ? 'All Leave Requests' : 'My Leave Requests'}
                        </h2>
                        <p className="text-purple-100 text-sm mt-1">
                            {isAdminOrHR ? 'Manage employee leave applications' : 'Track your leave history and status'}
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <tr>
                                    {isAdminOrHR && (
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Employee
                                        </th>
                                    )}
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        From
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        To
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Days
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    {isAdminOrHR && (
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    )}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {leaves.length === 0 ? (
                                    <tr>
                                        <td colSpan={isAdminOrHR ? 7 : 6} className="p-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <p className="text-gray-500 font-medium">No leave records found</p>
                                                <p className="text-gray-400 text-sm mt-1">Leave applications will appear here</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    leaves.map((l, index) => (
                                        <tr 
                                            key={l.id} 
                                            className={`hover:bg-gray-50 transition-colors ${
                                                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                            }`}
                                        >
                                            {isAdminOrHR && (
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold mr-3">
                                                            {l.full_name?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-medium text-gray-900">{l.full_name}</span>
                                                    </div>
                                                </td>
                                            )}
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                    l.leave_type === 'Sick' ? 'bg-red-100 text-red-800' :
                                                    l.leave_type === 'Casual' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-orange-100 text-orange-800'
                                                }`}>
                                                    {l.leave_type === 'Sick' ? '🏥' : l.leave_type === 'Casual' ? '☀️' : '🚨'} {l.leave_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 font-medium">
                                                {new Date(l.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 font-medium">
                                                {new Date(l.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-700 font-bold">
                                                    {l.days}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                                    l.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                    l.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {l.status === 'Approved' ? '✓ ' : l.status === 'Rejected' ? '✗ ' : '⏳ '}
                                                    {l.status}
                                                </span>
                                            </td>

                                            {isAdminOrHR && (
                                                <td className="px-6 py-4">
                                                    {l.status === 'Pending' ? (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleLeaveAction(l.id, 'Approved')}
                                                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200"
                                                            >
                                                                ✓ Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleLeaveAction(l.id, 'Rejected')}
                                                                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200"
                                                            >
                                                                ✗ Reject
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 font-medium">—</span>
                                                    )}
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Leave;