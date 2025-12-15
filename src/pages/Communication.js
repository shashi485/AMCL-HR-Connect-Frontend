import React, { useEffect, useState } from 'react';
import { communicationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Communication = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        receiverId: '',
        subject: '',
        message: ''
    });

    // SVG Icons
    const MessageIcon = ({ className = "w-6 h-6" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    );
    const SendIcon = ({ className = "w-5 h-5" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
    );
    const XIcon = ({ className = "w-5 h-5" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
    const MailIcon = ({ className = "w-16 h-16" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
    const XCircleIcon = ({ className = "w-5 h-5" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    /* ================= LOAD MESSAGES ================= */
    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const res = await communicationAPI.getMessages();
            setMessages(res.data);
            setError('');
        } catch (err) {
            setError('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    /* ================= SEND MESSAGE ================= */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            await communicationAPI.sendMessage(formData);
            setShowForm(false);
            setFormData({ receiverId: '', subject: '', message: '' });
            loadMessages();
        } catch (err) {
            setError('Failed to send message');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 pt-24 pb-12 px-4">
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading messages...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 pt-24 pb-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg text-white">
                            <MessageIcon />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Communication</h1>
                            <p className="text-gray-600 text-sm mt-1">Send and receive messages</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all ${
                            showForm
                                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                                : 'bg-gradient-to-r from-green-600 to-teal-600 hover:scale-105 text-white'
                        }`}
                    >
                        {showForm ? (
                            <>
                                <XIcon />
                                <span>Cancel</span>
                            </>
                        ) : (
                            <>
                                <SendIcon />
                                <span>New Message</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                        <div className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5">
                            <XCircleIcon />
                        </div>
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                {/* ================= SEND MESSAGE FORM ================= */}
                {showForm && (
                    <form onSubmit={handleSend} className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compose New Message</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Receiver User ID
                                </label>
                                <input
                                    type="number"
                                    name="receiverId"
                                    placeholder="Enter receiver's user ID"
                                    value={formData.receiverId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Enter message subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    placeholder="Type your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
                                    rows="5"
                                />
                            </div>
                            <button 
                                type="submit"
                                className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                            >
                                <SendIcon />
                                <span>Send Message</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* ================= MESSAGE LIST ================= */}
                {messages.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                        <div className="text-green-200 mb-6 flex justify-center">
                            <MailIcon />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            No Messages Yet
                        </h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Your inbox is empty. Start a conversation by sending a new message.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{msg.subject}</h3>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <span>From:</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-6 h-6 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                    {msg.sender_name?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-gray-700">{msg.sender_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 whitespace-nowrap">
                                        {new Date(msg.created_at).toLocaleString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-green-500">
                                    <p className="text-gray-700 leading-relaxed">{msg.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Communication;