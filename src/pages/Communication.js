import React, { useEffect, useState } from 'react';
import { communicationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Communication = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    receiverId: '',
    subject: '',
    message: ''
  });

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    loadMessages();
    if (user.role === 'Admin' || user.role === 'HR') {
      communicationAPI.getEmployees().then(res => setEmployees(res.data));
    }
  }, []);

  const loadMessages = async () => {
    try {
      const res = await communicationAPI.getMessages();
      setMessages(res.data);
      setError('');
    } catch {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEND MESSAGE ================= */
  const handleSend = async (e) => {
    e.preventDefault();

    try {
      await communicationAPI.sendMessage(formData);
      setShowForm(false);
      setFormData({ receiverId: '', subject: '', message: '' });
      loadMessages();
    } catch {
      setError('Failed to send message');
    }
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="min-h-screen pt-24 text-center">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Communication</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-6 py-2 rounded-xl"
          >
            {showForm ? 'Cancel' : 'New Message'}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* SEND MESSAGE FORM */}
        {showForm && (
          <form
            onSubmit={handleSend}
            className="bg-white p-6 rounded-xl shadow mb-6"
          >
            {(user.role === 'Admin' || user.role === 'HR') && (
              <select
                className="w-full mb-3 border p-2 rounded"
                value={formData.receiverId}
                onChange={e =>
                  setFormData({ ...formData, receiverId: e.target.value })
                }
                required
              >
                <option value="">Select Employee</option>
                <option value="ALL">All Employees</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.full_name} ({emp.employee_id})
                  </option>
                ))}
              </select>
            )}

            <input
              className="w-full mb-3 border p-2 rounded"
              placeholder="Subject"
              value={formData.subject}
              onChange={e =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
            />

            <textarea
              className="w-full mb-3 border p-2 rounded"
              rows="4"
              placeholder="Message"
              value={formData.message}
              onChange={e =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />

            <button className="bg-green-600 text-white px-6 py-2 rounded-xl">
              Send Message
            </button>
          </form>
        )}

        {/* MESSAGE LIST */}
        {messages.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center">
            No messages yet
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                onClick={() => {
                  if (!msg.is_read) communicationAPI.markRead(msg.id);
                }}
                className="bg-white p-6 rounded-xl shadow cursor-pointer"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">{msg.subject}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      msg.is_read
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {msg.is_read ? 'Seen' : 'Unseen'}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-2">
                  From: {msg.sender_name}
                </p>

                <p>{msg.message}</p>

                {(user.role === 'Admin' || user.role === 'HR') && (
                  <div className="flex gap-4 mt-3 text-sm">
                    <button
                      className="text-blue-600"
                      onClick={() => {
                        const updated = prompt(
                          'Edit message',
                          msg.message
                        );
                        if (updated) {
                          communicationAPI
                            .updateMessage(msg.id, {
                              subject: msg.subject,
                              message: updated
                            })
                            .then(loadMessages);
                        }
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600"
                      onClick={() => {
                        if (window.confirm('Delete this message?')) {
                          communicationAPI
                            .deleteMessage(msg.id)
                            .then(loadMessages);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Communication;
