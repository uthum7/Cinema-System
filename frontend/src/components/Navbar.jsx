// frontend/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Menu, X, User, Ticket } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const hideNavbar = location.pathname === '/signup' ||
                     location.pathname === '/signin' ||
                     location.pathname === '/forgot-password';

  if (hideNavbar) {
    return null;
  }

  const isLoggedIn = false;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/movies', label: 'Movies' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/account', label: 'My Account' },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Film className="w-8 h-8 text-white relative" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              CinePlex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium ${
                  location.pathname === link.path ? 'text-white' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}

            {!isLoggedIn ? (
              <>
                <Link
                  to="/signin"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/booking"
                  className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Book Now</span>
                </Link>
                <Link
                  to="/account"
                  className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  <User className="w-5 h-5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-gray-300 hover:text-white transition-colors py-2 ${
                  location.pathname === link.path ? 'text-white font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}

            {!isLoggedIn ? (
              <>
                <Link
                  to="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-semibold"
              >
                Book Now
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;