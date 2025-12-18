import axios from 'axios';

/* ================= BASE CONFIG ================= */

const api = axios.create({
  baseURL: 'https://amcl-hr-connect-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

/* ================= JWT INTERCEPTOR ================= */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= AUTH ================= */

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data)
};

/* ================= DASHBOARD ================= */

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats')
};

/* ================= PROFILE ================= */

export const profileAPI = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data)
};

/* ================= ATTENDANCE ================= */

export const attendanceAPI = {
  getMyAttendance: () => api.get('/attendance/my'),
  checkIn: () => api.post('/attendance/check-in'),
  checkOut: () => api.post('/attendance/check-out'),

  getAllAttendance: () => api.get('/attendance/all'),
  getTodayAttendance: () => api.get('/attendance/today'),
  getEmployeeAttendance: (id) => api.get(`/attendance/employee/${id}`)
};

/* ================= LEAVE ================= */

export const leaveAPI = {
  getMyLeaves: () => api.get('/leaves/my'),
  applyLeave: (data) => api.post('/leaves/apply'),

  getAllLeaves: () => api.get('/leaves/all'),
  updateLeaveStatus: (leaveId, status) =>
    api.put('/leaves/status', { leaveId, status })
};

/* ================= PERFORMANCE ================= */

export const performanceAPI = {
  getReviews: () => api.get('/performance'),
  getEmployees: () => api.get('/performance/employees'),
  createReview: (data) => api.post('/performance', data)
};

/* ================= COMMUNICATION ================= */

export const communicationAPI = {
  getMessages: () => api.get('/messages'),
  getEmployees: () => api.get('/messages/employees'),

  sendMessage: (data) => api.post('/messages', data),
  markRead: (id) => api.put(`/messages/${id}/read`),

  updateMessage: (id, data) => api.put(`/messages/${id}`, data),
  deleteMessage: (id) => api.delete(`/messages/${id}`)
};

export default api;
