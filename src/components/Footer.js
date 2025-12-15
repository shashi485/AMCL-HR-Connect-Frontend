import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="mt-auto px-4 pb-4">
            {/* Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
            
            <div className="max-w-[1400px] mx-auto bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                {/* Main Footer Content */}
                <div className="px-8 lg:px-12 py-12 relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {/* Company Info */}
                        <div className="lg:col-span-1 space-y-5">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-2xl font-black text-white">A</span>
                                </div>
                                <div className="text-xl font-black text-white tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    AMCL HR Connect
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                Empowering organizations with advanced employee management solutions to boost productivity and enhance workplace satisfaction.
                            </p>
                            
                            {/* Social Links */}
                            <div className="flex space-x-3">
                                <a href="#" className="w-10 h-10 bg-white/5 hover:bg-blue-600 border border-white/10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg group">
                                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/5 hover:bg-blue-600 border border-white/10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg group">
                                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/5 hover:bg-blue-600 border border-white/10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg group">
                                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/5 hover:bg-blue-600 border border-white/10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg group">
                                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        {/* Site Map */}
                        <div>
                            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                <li><a href="/dashboard" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Dashboard</span>
                                </a></li>
                                <li><a href="/profile" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Profile</span>
                                </a></li>
                                <li><a href="/attendance" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Attendance</span>
                                </a></li>
                                <li><a href="/leave" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Leave</span>
                                </a></li>
                                <li><a href="/performance" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Performance</span>
                                </a></li>
                                <li><a href="/communication" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Messages</span>
                                </a></li>
                            </ul>
                        </div>
                        
                        {/* Resources */}
                        <div>
                            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Resources
                            </h4>
                            <ul className="space-y-3">
                                <li><a href="/help" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Help Center</span>
                                </a></li>
                                <li><a href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Contact Us</span>
                                </a></li>
                                <li><a href="/documentation" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Documentation</span>
                                </a></li>
                                <li><a href="/careers" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Careers</span>
                                </a></li>
                            </ul>
                        </div>
                        
                        {/* Legal */}
                        <div>
                            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Legal
                            </h4>
                            <ul className="space-y-3">
                                <li><a href="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Privacy Policy</span>
                                </a></li>
                                <li><a href="/terms" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Terms of Service</span>
                                </a></li>
                                <li><a href="/cookies" className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2 group" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:w-2 transition-all"></span>
                                    <span>Cookie Policy</span>
                                </a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Back to Top Button */}
                    <div className="mt-12 flex justify-center">
                        <button 
                            onClick={scrollToTop}
                            className="flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-blue-600 border border-white/10 text-white rounded-xl transition-all font-semibold text-sm hover:scale-105 hover:shadow-lg group"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            <span>BACK TO TOP</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 lg:px-12 py-5 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                            © {currentYear} Employee Management System. All Rights Reserved.
                        </p>
                        {/* <div className="flex items-center space-x-4 text-sm">
                            <span className="text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>Made with</span>
                            <span className="text-red-400 animate-pulse">❤️</span>
                            <span className="text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>for better workplace</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;