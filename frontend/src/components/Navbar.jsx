// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Film, Menu, X, User, LogOut, Ticket, Calendar, Home } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock user - replace with actual auth context
  const [user, setUser] = useState(null); // Set to user object when logged in

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-xl shadow-lg shadow-black/50 border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-rose-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-11 h-11 bg-gradient-to-br from-amber-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <Film className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
              CinePlex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-amber-600/20 to-rose-600/20 text-white border border-amber-500/30' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/movies"
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                isActive('/movies') 
                  ? 'bg-gradient-to-r from-amber-600/20 to-rose-600/20 text-white border border-amber-500/30' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Movies</span>
            </Link>
            <Link
              to="/schedule"
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                isActive('/schedule') 
                  ? 'bg-gradient-to-r from-amber-600/20 to-rose-600/20 text-white border border-amber-500/30' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule</span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-rose-500 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    <Link
                      to="/account"
                      className="block px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center space-x-2"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>My Account</span>
                    </Link>
                    <Link
                      to="/account/bookings"
                      className="block px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center space-x-2"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Ticket className="w-4 h-4" />
                      <span>My Bookings</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors flex items-center space-x-2 border-t border-white/10"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="px-5 py-2.5 text-white font-semibold hover:text-amber-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-rose-600 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-black/95 backdrop-blur-xl">
            <div className="space-y-2">
              <Link
                to="/"
                className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-amber-600/20 to-rose-600/20 text-white' 
                    : 'text-gray-300 hover:bg-white/5'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/movies"
                className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                  isActive('/movies') 
                    ? 'bg-gradient-to-r from-amber-600/20 to-rose-600/20 text-white' 
                    : 'text-gray-300 hover:bg-white/5'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Movies
              </Link>
              <Link
                to="/schedule"
                className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                  isActive('/schedule') 
                    ? 'bg-gradient-to-r from-amber-600/20 to-rose-600/20 text-white' 
                    : 'text-gray-300 hover:bg-white/5'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Schedule
              </Link>

              <div className="border-t border-white/10 pt-4 mt-4">
                {user ? (
                  <>
                    <Link
                      to="/account"
                      className="block px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/signin"
                      className="block px-4 py-3 text-center text-white font-semibold hover:bg-white/5 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-3 text-center bg-gradient-to-r from-amber-600 to-rose-600 rounded-xl font-bold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;