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
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Communication</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-5 py-2 rounded">
            {showForm ? 'Cancel' : 'New'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={send} className="bg-white p-6 rounded shadow mb-6">

            {user.role !== 'Employee' && (
              <select
                className="w-full mb-3 border p-2 rounded"
                value={sendType}
                onChange={e => setSendType(e.target.value)}
              >
                <option value="message">Message</option>
                <option value="announcement">Announcement</option>
              </select>
            )}

            {sendType === 'message' && user.role !== 'Employee' && (
              <select
                className="w-full mb-3 border p-2 rounded"
                value={form.receiverId}
                onChange={e => setForm({ ...form, receiverId: e.target.value })}
              >
                <option value="">Select Employee</option>
                <option value="ALL">All Employees</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.full_name}
                  </option>
                ))}
              </select>
            )}

            <input
              className="w-full mb-3 border p-2 rounded"
              placeholder="Subject"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              required
            />

            <textarea
              className="w-full mb-3 border p-2 rounded"
              rows="4"
              placeholder="Message"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
            />

            <button className="bg-green-600 text-white px-6 py-2 rounded">
              Send
            </button>
          </form>
        )}

        {messages.map(msg => (
          <div key={msg.id} className="bg-white p-5 rounded shadow mb-3">
            <h3 className="font-semibold">{msg.subject}</h3>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communication;
