import React, { useEffect, useState } from 'react';
import { attendanceAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Attendance = () => {
    const { user } = useAuth();
    const [records, setRecords] = useState([]);
    const [error, setError] = useState('');

    // SVG Icons
    const CalendarIcon = () => (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    );
    const TrendingUpIcon = () => (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    );
    const CheckCircleIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
    const XCircleIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
    const ClockIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    useEffect(() => {
        loadAttendance();
        // eslint-disable-next-line
    }, []);

    const loadAttendance = async () => {
        try {
            let res;

            if (user.role === 'Admin' || user.role === 'HR') {
                res = await attendanceAPI.getAllAttendance();
            } else {
                res = await attendanceAPI.getMyAttendance();
            }

            setRecords(res.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch attendance');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            'Present': 'bg-green-100 text-green-800 border-green-200',
            'Absent': 'bg-red-100 text-red-800 border-red-200',
            'Half Day': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'Late': 'bg-orange-100 text-orange-800 border-orange-200'
        };
        
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    const stats = {
        present: records.filter(r => r.status === 'Present').length,
        absent: records.filter(r => r.status === 'Absent').length,
        total: records.length
    };

    const attendanceRate = stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <CalendarIcon />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
                            <p className="text-gray-600 text-sm mt-1">Track and manage attendance records</p>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                            <XCircleIcon />
                        </div>
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                {/* Stats Cards - Only for Employee */}
                {user.role === 'Employee' && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 text-sm font-medium">Attendance Rate</span>
                                <TrendingUpIcon />
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{attendanceRate}%</div>
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{ width: `${attendanceRate}%` }}></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 text-sm font-medium">Present Days</span>
                                <div className="text-green-600"><CheckCircleIcon /></div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{stats.present}</div>
                            <p className="text-xs text-gray-500 mt-1">Out of {stats.total} days</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 text-sm font-medium">Absent Days</span>
                                <div className="text-red-600"><XCircleIcon /></div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{stats.absent}</div>
                            <p className="text-xs text-gray-500 mt-1">Out of {stats.total} days</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 text-sm font-medium">Total Records</span>
                                <div className="text-purple-600"><CalendarIcon /></div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                            <p className="text-xs text-gray-500 mt-1">All time tracking</p>
                        </div>
                    </div>
                )}

                {/* Action Buttons - Only for Employee */}
                {user.role === 'Employee' && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => attendanceAPI.checkIn().then(loadAttendance)}
                                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                            >
                                <div className="text-white"><CheckCircleIcon /></div>
                                <span>Check In</span>
                            </button>
                            <button
                                onClick={() => attendanceAPI.checkOut().then(loadAttendance)}
                                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                            >
                                <div className="text-white"><ClockIcon /></div>
                                <span>Check Out</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Attendance Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900">Attendance Records</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check In</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check Out</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {records.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center">
                                            <div className="text-gray-300 mx-auto mb-3 flex justify-center">
                                                <CalendarIcon />
                                            </div>
                                            <p className="text-gray-500 font-medium">No attendance records</p>
                                        </td>
                                    </tr>
                                ) : (
                                    records.map((r, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                {new Date(r.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {r.check_in || <span className="text-gray-400">-</span>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {r.check_out || <span className="text-gray-400">-</span>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(r.status)}
                                            </td>
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

export default Attendance;