import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate(); // ✅ ADDED
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await dashboardAPI.getStats();
            setStats(response.data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadgeClasses = (status) => {
        switch (status) {
            case 'Present':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Absent':
                return 'bg-rose-100 text-rose-800 border-rose-200';
            case 'Half Day':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'On Leave':
                return 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const StatCard = ({ title, value, unit, icon, colorClasses, delay = 0 }) => (
        <div 
            className="bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1 border border-gray-100" 
            style={{ animationDelay: `${delay}ms`, animation: 'fadeIn 0.6s ease-out forwards' }}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{title}</p>
                    <p className="text-4xl font-extrabold text-gray-900 mb-1">{value}</p>
                    <p className="text-sm text-gray-500">{unit}</p>
                </div>
                <div className={`w-14 h-14 ${colorClasses} rounded-xl flex items-center justify-center shadow-md`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
        </div>
    );
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-12 px-4 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full border-4 border-t-4 border-gray-200 h-16 w-16 mb-4 border-t-indigo-600"></div>
                    <p className="text-lg font-semibold text-indigo-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                
                {/* Welcome Header */}
                <div className="mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                    <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                        <div className="mb-4 md:mb-0">
                            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                                Hello, <span className="text-indigo-200">{user?.full_name}!</span> 👋
                            </h1>
                            <p className="text-indigo-100 text-base md:text-lg">
                                Your daily overview is ready. Let's make it productive!
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="text-6xl opacity-40 transform -rotate-12">🚀</div>
                        </div>
                    </div>
                </div>

                {user?.role === 'Employee' ? (
                    <>
                        {/* Employee Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard title="Attendance" value={stats?.attendanceThisMonth || 0} unit="Days this month" icon="📅" colorClasses="bg-emerald-100 text-emerald-600" />
                            <StatCard title="Sick Leave" value={stats?.leaveBalance?.sick_leave || 0} unit="Days available" icon="🤒" colorClasses="bg-sky-100 text-sky-600" />
                            <StatCard title="Casual Leave" value={stats?.leaveBalance?.casual_leave || 0} unit="Days available" icon="🏖️" colorClasses="bg-amber-100 text-amber-600" />
                            <StatCard title="Paid Leave" value={stats?.leaveBalance?.paid_leave || 0} unit="Days available" icon="💰" colorClasses="bg-purple-100 text-purple-600" />
                        </div>

                        {/* Attendance + Announcements */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* Attendance Table (UNCHANGED) */}
                            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900">Recent Attendance</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Check In</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Check Out</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {stats?.recentAttendance?.slice(0, 5).map((att, i) => (
                                                <tr key={i}>
                                                    <td className="px-6 py-4">{formatDate(att.date)}</td>
                                                    <td className="px-6 py-4">{att.check_in || '-'}</td>
                                                    <td className="px-6 py-4">{att.check_out || '-'}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeClasses(att.status)}`}>
                                                            {att.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Announcements (ONLY CLICK ADDED) */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900">Announcements</h3>
                                </div>
                                <div className="p-4 space-y-3">
                                    {stats?.announcements?.slice(0, 4).map((ann, index) => (
                                        <div
                                            key={index}
                                            onClick={() => navigate('/announcements')}
                                            className="cursor-pointer bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all"
                                        >
                                            <h4 className="font-bold truncate">{ann.title}</h4>
                                            <p className="text-xs text-gray-600 line-clamp-2">{ann.content}</p>
                                            <span className="text-xs text-indigo-500 mt-2 block">
                                                {formatDate(ann.created_at)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Dashboard;
