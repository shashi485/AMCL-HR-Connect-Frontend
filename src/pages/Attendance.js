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

  /* ================= ICONS (UNCHANGED) ================= */

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
      Present: 'bg-green-100 text-green-800',
      Working: 'bg-blue-100 text-blue-800',
      Absent: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100'}`}>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <CalendarIcon />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
            <p className="text-gray-600 text-sm">Track and manage attendance records</p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* BACK BUTTON (ADMIN) */}
        {view === 'employee' && (
          <button
            onClick={loadAttendance}
            className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ← Back to Today Attendance
          </button>
        )}

        {/* EMPLOYEE STATS */}
        {user.role === 'Employee' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <span className="text-gray-600 text-sm">Attendance Rate</span>
              <div className="text-3xl font-bold">{attendanceRate}%</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <span className="text-gray-600 text-sm">Present Days</span>
              <div className="text-3xl font-bold">{stats.present}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <span className="text-gray-600 text-sm">Absent Days</span>
              <div className="text-3xl font-bold">{stats.absent}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <span className="text-gray-600 text-sm">Total Records</span>
              <div className="text-3xl font-bold">{stats.total}</div>
            </div>
          </div>
        )}

        {/* QUICK ACTIONS */}
        {user.role === 'Employee' && (
          <div className="bg-white p-6 rounded-xl shadow mb-6 flex gap-4">
            <button
              onClick={() => attendanceAPI.checkIn().then(loadAttendance)}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg"
            >
              Check In
            </button>
            <button
              onClick={() => attendanceAPI.checkOut().then(loadAttendance)}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg"
            >
              Check Out
            </button>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {(user.role === 'Admin' || user.role === 'HR') && view === 'list' && (
                  <th className="px-6 py-4 text-left text-xs font-bold">Employee</th>
                )}
                <th className="px-6 py-4 text-left text-xs font-bold">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold">Check In</th>
                <th className="px-6 py-4 text-left text-xs font-bold">Check Out</th>
                <th className="px-6 py-4 text-left text-xs font-bold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {records.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No attendance records
                  </td>
                </tr>
              ) : (
                records.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {(user.role === 'Admin' || user.role === 'HR') && view === 'list' && (
                      <td
                        className="px-6 py-4 text-blue-600 cursor-pointer hover:underline"
                        onClick={() => openEmployeeAttendance(r)}
                      >
                        {r.full_name}
                      </td>
                    )}
                    <td className="px-6 py-4">
                      {r.date ? new Date(r.date).toLocaleDateString() : 'Today'}
                    </td>
                    <td className="px-6 py-4">{r.check_in || '-'}</td>
                    <td className="px-6 py-4">{r.check_out || '-'}</td>
                    <td className="px-6 py-4">{getStatusBadge(r.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Attendance;
