import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const StatCard = ({ title, value, unit, icon, colorClasses }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between">
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase">{title}</p>
          <p className="text-4xl font-extrabold">{value}</p>
          <p className="text-sm text-gray-500">{unit}</p>
        </div>
        <div className={`w-14 h-14 ${colorClasses} rounded-xl flex items-center justify-center`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Welcome */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-extrabold">
            Hello, {user?.full_name} 👋
          </h1>
          <p className="text-indigo-100">Your daily overview</p>
        </div>

        {user?.role === 'Employee' ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Attendance" value={stats?.attendanceThisMonth || 0} unit="Days" icon="📅" colorClasses="bg-emerald-100 text-emerald-600" />
              <StatCard title="Sick Leave" value={stats?.leaveBalance?.sick_leave || 0} unit="Days" icon="🤒" colorClasses="bg-sky-100 text-sky-600" />
              <StatCard title="Casual Leave" value={stats?.leaveBalance?.casual_leave || 0} unit="Days" icon="🏖️" colorClasses="bg-amber-100 text-amber-600" />
              <StatCard title="Paid Leave" value={stats?.leaveBalance?.paid_leave || 0} unit="Days" icon="💰" colorClasses="bg-purple-100 text-purple-600" />
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-2xl shadow-lg border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-bold">Announcements</h3>
              </div>

              <div className="p-4 space-y-3">
                {stats?.announcements?.length > 0 ? (
                  stats.announcements.map((ann, index) => (
                    <div
                      key={index}
                      onClick={() => navigate('/announcements')}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border hover:shadow-md transition-all cursor-pointer"
                    >
                      <h4 className="font-bold truncate">{ann.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {ann.content}
                      </p>
                      <span className="text-xs text-indigo-500 block mt-2">
                        {formatDate(ann.created_at)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No announcements</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Admin stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Employees" value={stats?.totalEmployees || 0} unit="Total" icon="👥" colorClasses="bg-emerald-100 text-emerald-600" />
              <StatCard title="Present Today" value={stats?.presentToday || 0} unit="Today" icon="✅" colorClasses="bg-sky-100 text-sky-600" />
              <StatCard title="Pending Leaves" value={stats?.pendingLeaves || 0} unit="Requests" icon="⏳" colorClasses="bg-rose-100 text-rose-600" />
              <StatCard title="Month" value={new Date().toLocaleString('en-US', { month: 'long' })} unit={new Date().getFullYear()} icon="📆" colorClasses="bg-purple-100 text-purple-600" />
            </div>

            {/* Admin Announcements */}
            <div className="bg-white rounded-2xl shadow-lg border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-bold">Recent Announcements</h3>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats?.announcements?.length > 0 ? (
                  stats.announcements.map((ann, index) => (
                    <div
                      key={index}
                      onClick={() => navigate('/announcements')}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border hover:shadow-lg transition-all cursor-pointer"
                    >
                      <h4 className="font-bold">{ann.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {ann.content}
                      </p>
                      <span className="text-xs text-indigo-500 block mt-2">
                        {formatDate(ann.created_at)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 col-span-2">
                    No announcements
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
