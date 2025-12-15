import axios from 'axios';

/* ================= BASE CONFIG ================= */

const api = axios.create({
    baseURL: 'https://amcl-hr-connect-backend.onrender.com/api',
    withCredentials: true, // 🔴 MUST for session
    headers: {
        'Content-Type': 'application/json'
    }
});

// 🔴 ENSURE COOKIE IS ALWAYS SENT
api.interceptors.request.use(
    (config) => {
        config.withCredentials = true;
        return config;
    },
    (error) => Promise.reject(error)
);

/* ================= AUTH ================= */

export const authAPI = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data),
    logout: () => api.post('/auth/logout'),
    checkAuth: () => api.get('/auth/check')
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
    checkOut: () => api.post('/attendance/check-out')
};

/* ================= LEAVE ================= */

export const leaveAPI = {
    getMyLeaves: () => api.get('/leaves/my'),
    applyLeave: (data) => api.post('/leaves/apply', data)
};

/* ================= PERFORMANCE ================= */

export const performanceAPI = {
    getReviews: () => api.get('/performance')
};

/* ================= COMMUNICATION ================= */

export const communicationAPI = {
    getMessages: () => api.get('/messages'),
    getAnnouncements: () => api.get('/messages/announcements')
};

export default api;
