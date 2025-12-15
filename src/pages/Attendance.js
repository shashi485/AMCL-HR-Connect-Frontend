import React, { useEffect, useState } from 'react';
import { attendanceAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Attendance = () => {
  const { user } = useAuth();

  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  // ADMIN VIEW STATE
  const [view, setView] = useState('list'); // list | employee
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  /* ================= ICONS ================= */

  const CalendarIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const TrendingUpIcon = () => (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const XCircleIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const ArrowLeftIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  /* ================= LOAD ATTENDANCE ================= */

  useEffect(() => {
    loadAttendance();
    // eslint-disable-next-line
  }, []);

  const loadAttendance = async () => {
    try {
      let res;

      if (user.role === 'Admin' || user.role === 'HR') {
        res = await attendanceAPI.getTodayAttendance();
      } else {
        res = await attendanceAPI.getMyAttendance();
      }

      setRecords(res.data);
      setView('list');
      setError('');
    } catch {
      setError('Failed to fetch attendance');
    }
  };

  /* ================= ADMIN: OPEN EMPLOYEE ================= */

  const openEmployeeAttendance = async (employee) => {
    try {
      const res = await attendanceAPI.getEmployeeAttendance(employee.id);
      setRecords(res.data);
      setSelectedEmployee(employee);
      setView('employee');
    } catch {
      setError('Failed to fetch employee attendance');
    }
  };

  /* ================= UI HELPERS ================= */

  const getStatusBadge = (status) => {
    const styles = {
      Present: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200',
      Working: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200',
      Absent: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200'
    };

    const icons = {
      Present: <CheckCircleIcon />,
      Working: <ClockIcon />,
      Absent: <XCircleIcon />
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100'}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  const stats = {
    present: records.filter(r => r.status === 'Present').length,
    absent: records.filter(r => r.status === 'Absent').length,
    total: records.length
  };

  const attendanceRate =
    stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(1) : 0;

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <CalendarIcon />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Attendance
              </h1>
              <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Track and manage attendance records
              </p>
            </div>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 text-red-700 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <XCircleIcon />
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* BACK BUTTON (ADMIN) */}
        {view === 'employee' && (
          <div className="mb-6">
            <button
              onClick={loadAttendance}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
            >
              <ArrowLeftIcon />
              Back to Today's Attendance
            </button>
            {selectedEmployee && (
              <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <UserIcon />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Viewing attendance for</p>
                    <p className="font-semibold text-gray-900">{selectedEmployee.full_name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* EMPLOYEE STATS */}
        {user.role === 'Employee' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm font-medium">Attendance Rate</span>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUpIcon />
                </div>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {attendanceRate}%
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${attendanceRate}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm font-medium">Present Days</span>
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-green-600">
                  <CheckCircleIcon />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600">{stats.present}</div>
              <p className="text-xs text-gray-500 mt-2">Total working days</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm font-medium">Absent Days</span>
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-rose-100 rounded-xl flex items-center justify-center text-red-600">
                  <XCircleIcon />
                </div>
              </div>
              <div className="text-3xl font-bold text-red-600">{stats.absent}</div>
              <p className="text-xs text-gray-500 mt-2">Days marked absent</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm font-medium">Total Records</span>
                <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl flex items-center justify-center">
                  <CalendarIcon />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-700">{stats.total}</div>
              <p className="text-xs text-gray-500 mt-2">All time records</p>
            </div>
          </div>
        )}

        {/* QUICK ACTIONS */}
        {user.role === 'Employee' && (
          <div className="bg-white p-6 rounded-2xl shadow-md mb-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Quick Actions</h3>
            <div className="flex gap-4">
              <button
                onClick={() => attendanceAPI.checkIn().then(loadAttendance)}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <CheckCircleIcon />
                Check In
              </button>
              <button
                onClick={() => attendanceAPI.checkOut().then(loadAttendance)}
                className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <XCircleIcon />
                Check Out
              </button>
            </div>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  {(user.role === 'Admin' || user.role === 'HR') && view === 'list' && (
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Employee
                    </th>
                  )}
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <CalendarIcon />
                        </div>
                        <p className="text-gray-500 font-medium">No attendance records found</p>
                        <p className="text-sm text-gray-400">Records will appear here once created</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  records.map((r, i) => (
                    <tr key={i} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors duration-150">
                      {(user.role === 'Admin' || user.role === 'HR') && view === 'list' && (
                        <td
                          className="px-6 py-4 text-blue-600 font-medium cursor-pointer hover:text-purple-600 transition-colors"
                          onClick={() => openEmployeeAttendance(r)}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {r.full_name?.charAt(0) || 'U'}
                            </div>
                            {r.full_name}
                          </div>
                        </td>
                      )}
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {r.date ? new Date(r.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        }) : 'Today'}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {r.check_in ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                            <ClockIcon />
                            {r.check_in}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {r.check_out ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                            <ClockIcon />
                            {r.check_out}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(r.status)}</td>
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