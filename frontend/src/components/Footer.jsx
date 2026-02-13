// frontend/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6 mt-auto relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/5 to-rose-950/5"></div>
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-rose-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-amber-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Film className="w-7 h-7 text-white" />
                </div>
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                CinePlex
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Your ultimate destination for discovering and booking the latest movie releases. Experience cinema like never before!
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-11 h-11 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-amber-600/20 hover:to-rose-600/20 hover:border-amber-500/30 transition-all duration-300 hover:scale-110 group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-11 h-11 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-amber-600/20 hover:to-rose-600/20 hover:border-amber-500/30 transition-all duration-300 hover:scale-110 group"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-11 h-11 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-amber-600/20 hover:to-rose-600/20 hover:border-amber-500/30 transition-all duration-300 hover:scale-110 group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-11 h-11 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-amber-600/20 hover:to-rose-600/20 hover:border-amber-500/30 transition-all duration-300 hover:scale-110 group"
              >
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black text-white mb-6 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-3 group"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span className="font-medium">Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/movies" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-3 group"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span className="font-medium">Movies</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/schedule" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-3 group"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span className="font-medium">Schedule</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/account" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-3 group"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span className="font-medium">My Account</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-black text-white mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-3 group"
                >
                  <span className="w-2 h-2 bg-rose-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span className="font-medium">Help Center</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-3 group"
                >
                  <span className="w-2 h-2 bg-rose-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span className="font-medium">FAQs</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-3 group"
                >
                  <span className="w-2 h-2 bg-rose-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span className="font-medium">Privacy Policy</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-3 group"
                >
                  <span className="w-2 h-2 bg-rose-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span className="font-medium">Terms of Service</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-3 group"
                >
                  <span className="w-2 h-2 bg-rose-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span className="font-medium">Contact Us</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-black text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <Mail className="w-5 h-5 text-amber-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-500 font-bold mb-1">Email</p>
                  <a 
                    href="mailto:support@cineplex.com" 
                    className="text-white hover:text-amber-400 transition-colors font-medium"
                  >
                    support@cineplex.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <Phone className="w-5 h-5 text-amber-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-500 font-bold mb-1">Phone</p>
                  <a 
                    href="tel:+11234567890" 
                    className="text-white hover:text-amber-400 transition-colors font-medium"
                  >
                    +1 (123) 456-7890
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-500 font-bold mb-1">Address</p>
                  <p className="text-white font-medium leading-relaxed">
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
            <p className="text-gray-500 text-sm text-center md:text-left flex items-center space-x-2">
              <span>© {currentYear} CinePlex. All rights reserved.</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                <span>for movie lovers</span>
              </span>
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-medium">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-medium">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-medium">
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