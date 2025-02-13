"use client";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <ul className="space-y-1">
                            <li><a href="/dashboard" className="hover:text-indigo-400 transition-colors">Dashboard</a></li>
                            <li><a href="/login" className="hover:text-indigo-400 transition-colors">Login</a></li>
                            <li><a href="/register" className="hover:text-indigo-400 transition-colors">Register</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                        <p>Email: support@example.com</p>
                        <p>Phone: +1 (123) 456-7890</p>
                    </div>

                    {/* Social Media Links */}
                    <div className="text-center md:text-right">
                        <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                        <div className="flex justify-center md:justify-end space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">Twitter</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">Instagram</a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Product Management System. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
