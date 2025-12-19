import React, { useEffect, useState } from 'react';
import { communicationAPI, announcementAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Communication = () => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [sendType, setSendType] = useState('message');
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    receiverId: '',
    subject: '',
    message: ''
  });

  /* ================= ICONS ================= */
  const ChatIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  const PlusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 4v16m8-8H4" />
    </svg>
  );

  const XIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const SendIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const MegaphoneIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  );

  const MailIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  useEffect(() => {
    loadMessages();
    if (user.role !== 'Employee') {
      communicationAPI.getEmployees().then(res => setEmployees(res.data));
    }
  }, []);

  const loadMessages = async () => {
    const res = await communicationAPI.getMessages();
    setMessages(res.data);
  };

  const send = async (e) => {
    e.preventDefault();

    try {
      if (sendType === 'announcement') {
        await announcementAPI.createAnnouncement({
          title: form.subject,
          content: form.message
        });
        alert('Announcement published successfully');
      } else {
        await communicationAPI.sendMessage(form);
        alert('Message sent successfully');
      }

      setForm({ receiverId: '', subject: '', message: '' });
      setShowForm(false);
      loadMessages();

    } catch (err) {
      alert('Failed to send');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform text-white">
              <ChatIcon />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Communication
              </h1>
              <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Send messages and announcements
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 ${
              showForm 
                ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white' 
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
            }`}
          >
            {showForm ? <XIcon /> : <PlusIcon />}
            {showForm ? 'Cancel' : 'New Message'}
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl mb-8 border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <SendIcon />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Compose Message</h2>
                  <p className="text-sm text-blue-100">Create a new message or announcement</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              
              {/* Send Type Selection */}
              {user.role !== 'Employee' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSendType('message')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        sendType === 'message'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <MailIcon />
                      <span className="font-medium">Message</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSendType('announcement')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        sendType === 'announcement'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <MegaphoneIcon />
                      <span className="font-medium">Announcement</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Receiver Selection */}
              {sendType === 'message' && user.role !== 'Employee' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <UserIcon />
                    Send To
                  </label>
                  <select
                    className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
                    value={form.receiverId}
                    onChange={e => setForm({ ...form, receiverId: e.target.value })}
                  >
                    <option value="">Select recipient...</option>
                    <option value="ALL">📢 All Employees</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        👤 {emp.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {sendType === 'announcement' ? 'Title' : 'Subject'}
                </label>
                <input
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  placeholder={sendType === 'announcement' ? 'Enter announcement title...' : 'Enter subject...'}
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {sendType === 'announcement' ? 'Content' : 'Message'}
                </label>
                <textarea
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                  rows="5"
                  placeholder={sendType === 'announcement' ? 'Write your announcement...' : 'Write your message...'}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              {/* Submit Button */}
              <button 
                onClick={send}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <SendIcon />
                {sendType === 'announcement' ? 'Publish Announcement' : 'Send Message'}
              </button>
            </div>
          </div>
        )}

        {/* MESSAGES */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg text-center border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <ChatIcon />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Messages Yet</h3>
              <p className="text-gray-500">Your messages will appear here</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={msg.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:scale-[1.01]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <MailIcon />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{msg.subject}</h3>
                      <p className="text-gray-700 leading-relaxed">{msg.message}</p>
                      
                      {msg.sender_name && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
                          <UserIcon />
                          <span>From: <span className="font-medium text-gray-700">{msg.sender_name}</span></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Communication;