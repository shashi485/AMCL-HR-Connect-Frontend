import React, { useEffect, useState } from 'react';
import { announcementAPI } from '../services/api';

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      // ✅ FIX: correct API method name
      const res = await announcementAPI.getAll();
      setAnnouncements(res.data);
    } catch (err) {
      console.error('Failed to load announcements', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 text-center text-gray-600">
        Loading announcements...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          All Announcements
        </h1>

        {announcements.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center shadow">
            No announcements yet
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white p-6 rounded-xl shadow border border-gray-100"
              >
                <h2 className="text-xl font-bold mb-1 text-gray-900">
                  {ann.title}
                </h2>

                <p className="text-gray-600 mb-3">
                  {ann.content}
                </p>

                <span className="text-xs text-indigo-500">
                  {new Date(ann.created_at).toLocaleDateString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
