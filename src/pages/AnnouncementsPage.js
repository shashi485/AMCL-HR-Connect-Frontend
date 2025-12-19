import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../services/api';

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= ICONS ================= */
  const MegaphoneIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const BellIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const res = await dashboardAPI.getStats();
      setAnnouncements(res.data.announcements || []);
    } catch (err) {
      console.error('Failed to load announcements', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading announcements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform text-white">
              <MegaphoneIcon />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                All Announcements
              </h1>
              <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                Stay updated with company news and updates
              </p>
            </div>
          </div>
        </div>

        {/* ANNOUNCEMENTS */}
        {announcements.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-lg text-center border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
              <BellIcon />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Announcements Yet</h3>
            <p className="text-gray-500">New announcements will appear here when posted</p>
          </div>
        ) : (
          <div className="space-y-5">
            {announcements.map((ann, index) => (
              <div 
                key={ann.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:scale-[1.01]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Announcement Header */}
                <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-1">
                  <div className="bg-white p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                            <BellIcon />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">{ann.title}</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed mt-3">{ann.content}</p>
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarIcon />
                        <span className="font-medium">
                          {new Date(ann.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-xs font-semibold rounded-full border border-orange-200">
                        Official Announcement
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;