import React, { useState, useEffect } from 'react';
import { profileAPI } from '../services/api';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await profileAPI.getProfile();
            setProfile(response.data);
            setFormData(response.data);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to load profile' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await profileAPI.updateProfile({
                fullName: formData.full_name,
                phone: formData.phone,
                address: formData.address,
                skills: formData.skills
            });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setEditing(false);
            fetchProfile();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile' });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-24 pb-12 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4">
                        <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <p className="text-gray-600 font-semibold">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                        <p className="text-gray-600 mt-1">Manage your personal information</p>
                    </div>
                    <button 
                        onClick={() => setEditing(!editing)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        <span>{editing ? '✕' : '✏️'}</span>
                        <span>{editing ? 'Cancel' : 'Edit Profile'}</span>
                    </button>
                </div>

                {/* Message Alert */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl border-l-4 ${
                        message.type === 'success' 
                            ? 'bg-green-50 border-green-500 text-green-700' 
                            : 'bg-red-50 border-red-500 text-red-700'
                    }`}>
                        <div className="flex items-center space-x-2">
                            <span className="text-xl">{message.type === 'success' ? '✓' : '⚠'}</span>
                            <span className="font-medium">{message.text}</span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
                            <div className="relative inline-block mb-4">
                                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-5xl font-black shadow-xl ring-4 ring-orange-100">
                                    {profile?.full_name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">{profile?.full_name}</h2>
                            <p className="text-sm font-semibold text-orange-600 mb-1">{profile?.role}</p>
                            <p className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">ID: {profile?.employee_id}</p>
                            
                            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                                <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 rounded-lg p-3">
                                    <span className="text-lg">📧</span>
                                    <span className="text-xs break-all">{profile?.email}</span>
                                </div>
                                {profile?.phone && (
                                    <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 rounded-lg p-3">
                                        <span className="text-lg">📞</span>
                                        <span className="text-xs">{profile.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            {editing ? (
                                <form onSubmit={handleSubmit} className="p-6">
                                    {/* Personal Information */}
                                    <div className="mb-8">
                                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 mb-4 border-l-4 border-orange-500">
                                            <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                                                <span>👤</span>
                                                <span>Personal Information</span>
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="full_name"
                                                    value={formData.full_name || ''}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Read Only)</label>
                                                <input
                                                    type="email"
                                                    value={profile?.email}
                                                    disabled
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed text-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone || ''}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Employee ID (Read Only)</label>
                                                <input
                                                    type="text"
                                                    value={profile?.employee_id}
                                                    disabled
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed text-gray-500"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                                                <textarea
                                                    name="address"
                                                    value={formData.address || ''}
                                                    onChange={handleChange}
                                                    rows="3"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Professional Information */}
                                    <div>
                                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 mb-4 border-l-4 border-amber-500">
                                            <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                                                <span>💼</span>
                                                <span>Professional Information</span>
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Department (Read Only)</label>
                                                <input
                                                    type="text"
                                                    value={profile?.department}
                                                    disabled
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed text-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Designation (Read Only)</label>
                                                <input
                                                    type="text"
                                                    value={profile?.designation}
                                                    disabled
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed text-gray-500"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
                                                <textarea
                                                    name="skills"
                                                    value={formData.skills || ''}
                                                    onChange={handleChange}
                                                    rows="3"
                                                    placeholder="e.g., JavaScript, React, Node.js, MySQL"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="w-full mt-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                                    >
                                        <span>💾</span>
                                        <span>Save Changes</span>
                                    </button>
                                </form>
                            ) : (
                                <div className="p-6">
                                    {/* Personal Information View */}
                                    <div className="mb-8">
                                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 mb-4 border-l-4 border-orange-500">
                                            <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                                                <span>👤</span>
                                                <span>Personal Information</span>
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                                                <p className="text-gray-900 font-medium break-all">{profile?.email}</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone</label>
                                                <p className="text-gray-900 font-medium">{profile?.phone || 'Not provided'}</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 md:col-span-2">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Address</label>
                                                <p className="text-gray-900 font-medium">{profile?.address || 'Not provided'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Professional Information View */}
                                    <div>
                                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 mb-4 border-l-4 border-amber-500">
                                            <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                                                <span>💼</span>
                                                <span>Professional Information</span>
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Employee ID</label>
                                                <p className="text-gray-900 font-medium">{profile?.employee_id}</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Department</label>
                                                <p className="text-gray-900 font-medium">{profile?.department}</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Designation</label>
                                                <p className="text-gray-900 font-medium">{profile?.designation}</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date of Joining</label>
                                                <p className="text-gray-900 font-medium">{profile?.date_of_joining ? new Date(profile.date_of_joining).toLocaleDateString() : 'N/A'}</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 md:col-span-2">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Skills</label>
                                                <p className="text-gray-900 font-medium">{profile?.skills || 'Not provided'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;