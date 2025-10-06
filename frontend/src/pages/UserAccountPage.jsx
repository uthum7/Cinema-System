// frontend/src/pages/UserAccountPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Edit2, Save, X, Ticket, Calendar, Clock, MapPin, AlertCircle, CheckCircle, XCircle, Camera } from 'lucide-react';

const UserAccountPage = () => {
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://picsum.photos/seed/useravatar/100/100',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([
    { id: 'b1', movie: 'Inception', showtime: '2023-10-27 19:00', seats: 'A5, A6', status: 'Confirmed', total: 25.00, img: 'https://picsum.photos/seed/inception_booking/60/60', hall: 'Hall A' },
    { id: 'b2', movie: 'Dune', showtime: '2023-10-28 13:00', seats: 'C10, C11, C12', status: 'Completed', total: 37.50, img: 'https://picsum.photos/seed/dune_booking/60/60', hall: 'Hall B' },
    { id: 'b3', movie: 'The Dark Knight', showtime: '2023-10-27 15:00', seats: 'B2, B3', status: 'Cancelled', total: 25.00, img: 'https://picsum.photos/seed/darkknight_booking/60/60', hall: 'Hall C' },
    { id: 'b4', movie: 'Oppenheimer', showtime: '2023-10-28 20:00', seats: 'D1, D2', status: 'Completed', total: 25.00, img: 'https://picsum.photos/seed/oppenheimer_booking/60/60', hall: 'Hall D' },
  ]);
  const [showCancelConfirm, setShowCancelConfirm] = useState(null);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = () => {
    alert('Profile updated!');
    setIsEditingProfile(false);
  };

  const handleCancelBooking = (bookingId) => {
    setBookingHistory(prev =>
      prev.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'Cancelling...' } : booking
      )
    );
    setTimeout(() => {
      setBookingHistory(prev =>
        prev.map(booking =>
          booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
        )
      );
      alert(`Booking ${bookingId} cancelled successfully.`);
    }, 1500);
    setShowCancelConfirm(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'Cancelling...':
        return <AlertCircle className="w-4 h-4 animate-pulse" />;
      default:
        return null;
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Cancelling...':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero Header */}
      <div className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-purple-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-64 h-64 bg-indigo-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-purple-600 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Account
            </span>
          </h1>
          <p className="text-xl text-gray-300">Manage your profile and booking history</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Profile Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="relative group">
                <img 
                  src={userProfile.avatar} 
                  alt="User Avatar" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/50 shadow-lg shadow-purple-500/30"
                />
                {isEditingProfile && (
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center border-4 border-gray-900 hover:scale-110 transition-transform shadow-lg">
                    <Camera className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-3xl font-bold flex items-center space-x-2">
                    <User className="w-8 h-8 text-purple-400" />
                    <span>Profile Details</span>
                  </h2>
                  {!isEditingProfile ? (
                    <button
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                      onClick={() => setIsEditingProfile(true)}
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
                        onClick={handleProfileSave}
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        className="flex items-center space-x-2 px-6 py-3 bg-gray-700 rounded-xl font-bold hover:bg-gray-600 transition-all duration-300"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 mb-2">
                      <User className="w-4 h-4" />
                      <span>Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userProfile.name}
                      onChange={handleProfileChange}
                      readOnly={!isEditingProfile}
                      className={`w-full p-4 rounded-xl border transition-all ${
                        isEditingProfile 
                          ? 'bg-black/40 text-white border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent' 
                          : 'bg-gray-800/50 text-gray-300 border-white/5 cursor-not-allowed'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 mb-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userProfile.email}
                      readOnly
                      className="w-full p-4 rounded-xl border bg-gray-800/50 text-gray-300 border-white/5 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking History Section */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="flex items-center space-x-3 mb-8">
            <Ticket className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold">Booking History</h2>
          </div>

          <div className="space-y-4">
            {bookingHistory.map(booking => {
              const isCancelled = booking.status === 'Cancelled';
              const isCancelling = booking.status === 'Cancelling...';
              
              return (
                <div
                  key={booking.id}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isCancelled 
                      ? 'bg-gray-900/50 border-red-500/20' 
                      : 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-white/10 hover:border-purple-500/50'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Movie Poster */}
                      <img 
                        src={booking.img} 
                        alt={booking.movie}
                        className="w-20 h-20 rounded-xl object-cover border-2 border-white/10"
                      />

                      {/* Booking Details */}
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Movie</p>
                          <p className="font-bold text-white">{booking.movie}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1 flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Date & Time</span>
                          </p>
                          <p className="font-semibold text-white">{booking.showtime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1 flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>Seats</span>
                          </p>
                          <p className="font-semibold text-white">{booking.seats}</p>
                          <p className="text-xs text-gray-500">{booking.hall}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Total</p>
                          <p className="font-bold text-2xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            ${booking.total.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
                        <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border font-semibold ${getStatusStyles(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span>{booking.status}</span>
                        </div>

                        {!isCancelled && !isCancelling && (
                          <button
                            className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 font-bold rounded-xl hover:bg-red-600/30 transition-all duration-300"
                            onClick={() => setShowCancelConfirm(booking.id)}
                          >
                            Cancel Booking
                          </button>
                        )}

                        {isCancelled && (
                          <button
                            className="px-4 py-2 bg-gray-700/50 text-gray-500 font-bold rounded-xl cursor-not-allowed"
                            disabled
                          >
                            Cancelled
                          </button>
                        )}

                        {isCancelling && (
                          <button
                            className="px-4 py-2 bg-yellow-600/20 border border-yellow-500/30 text-yellow-400 font-bold rounded-xl cursor-wait"
                            disabled
                          >
                            Cancelling...
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {bookingHistory.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 bg-purple-600/20 rounded-full flex items-center justify-center">
                  <Ticket className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No bookings yet</h3>
                <p className="text-gray-400 mb-6">Start booking your favorite movies now!</p>
                <Link 
                  to="/movies"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  <span>Browse Movies</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl shadow-2xl border border-white/10 max-w-md w-full">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-600/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">Cancel Booking?</h3>
            <p className="text-gray-400 text-center mb-8">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => handleCancelBooking(showCancelConfirm)} 
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
              >
                Yes, Cancel
              </button>
              <button 
                onClick={() => setShowCancelConfirm(null)} 
                className="flex-1 px-6 py-3 bg-gray-700 rounded-xl font-bold hover:bg-gray-600 transition-all duration-300"
              >
                No, Keep It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountPage;