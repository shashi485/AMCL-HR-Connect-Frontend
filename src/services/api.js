import axios from 'axios';

/* ================= BASE CONFIG ================= */

const API_URL = 'https://amcl-hr-connect-backend.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // 🔴 REQUIRED for express-session
    headers: {
        'Content-Type': 'application/json'
    }
});

/* ================= AUTH ================= */

export const authAPI = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data), // ✅ FIXED
    logout: () => api.post('/auth/logout'),
    checkAuth: () => api.get('/auth/check')
};

/* ================= DASHBOARD ================= */

export const dashboardAPI = {
    getStats: () => api.get('/dashboard/stats')
};

/* ================= PROFILE ================= */
/* Profile is served from /users/me */

export const profileAPI = {
    getProfile: () => api.get('/users/me'),
    updateProfile: (data) => api.put('/users/me', data)
};

/* ================= ATTENDANCE ================= */

export const attendanceAPI = {
    getMyAttendance: () => api.get('/attendance/my'),
    checkIn: () => api.post('/attendance/check-in'),
    checkOut: () => api.post('/attendance/check-out'),
    getAllAttendance: () => api.get('/attendance/all') // Admin / HR
};

/* ================= LEAVE ================= */

export const leaveAPI = {
    getMyLeaves: () => api.get('/leaves/my'),
    applyLeave: (data) => api.post('/leaves/apply', data),
    getAllLeaves: () => api.get('/leaves/all'), // Admin / HR
    updateLeaveStatus: (leaveId, status) =>
        api.put('/leaves/status', { leaveId, status })
};

/* ================= PERFORMANCE ================= */

export const performanceAPI = {
    getReviews: () => api.get('/performance'),
    createReview: (data) => api.post('/performance', data) // Admin / HR
};

/* ================= COMMUNICATION ================= */

export const communicationAPI = {
    getMessages: () => api.get('/messages'),
    sendMessage: (data) => api.post('/messages', data),
    getUnreadCount: () => api.get('/messages/unread'),
    getAnnouncements: () => api.get('/messages/announcements'),
    createAnnouncement: (data) =>
        api.post('/messages/announcements', data)
};

/* ================= USERS (ADMIN / HR) ================= */

export const userAPI = {
    getUsers: () => api.get('/users'),
    getUserById: (id) => api.get(`/users/${id}`),
    deleteUser: (id) => api.delete(`/users/${id}`)
};

export default api;
