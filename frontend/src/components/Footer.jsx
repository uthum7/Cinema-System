// frontend/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <Film className="w-8 h-8 text-white relative" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                CinePlex
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Your ultimate destination for discovering and booking the latest movie releases. Experience cinema like never before!
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 transition-all duration-300 hover:scale-110 group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 transition-all duration-300 hover:scale-110 group"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 transition-all duration-300 hover:scale-110 group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 transition-all duration-300 hover:scale-110 group"
              >
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/movies" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>Movies</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/schedule" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>Schedule</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/account" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/booking" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>Book Tickets</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>FAQs</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>Terms of Service</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a 
                    href="mailto:support@cineplex.com" 
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    support@cineplex.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a 
                    href="tel:+11234567890" 
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    +1 (123) 456-7890
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="text-white">
                    123 Cinema Street<br />
                    Entertainment City, EC 12345
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} CinePlex. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;