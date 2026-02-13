// frontend/src/pages/UserAccountPage.jsx
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Ticket, Film, Edit, Save, X } from 'lucide-react';

const UserAccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Cinema Street, Movie City, MC 12345',
    memberSince: '2023-01-15'
  });

  const [editedInfo, setEditedInfo] = useState(userInfo);

  const bookingHistory = [
    {
      id: 'BK001',
      movie: 'Inception',
      poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
      date: '2023-10-27',
      time: '14:00',
      seats: ['A5', 'A6'],
      hall: 'Hall A',
      total: 25.00,
      status: 'Completed'
    },
    {
      id: 'BK002',
      movie: 'The Dark Knight',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      date: '2023-10-25',
      time: '19:30',
      seats: ['B3', 'B4'],
      hall: 'Hall B',
      total: 25.00,
      status: 'Completed'
    },
    {
      id: 'BK003',
      movie: 'Dune',
      poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
      date: '2023-11-05',
      time: '20:00',
      seats: ['C5'],
      hall: 'Hall A',
      total: 12.50,
      status: 'Upcoming'
    }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo(userInfo);
  };

  const handleSave = () => {
    setUserInfo(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(userInfo);
    setIsEditing(false);
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white min-h-screen pt-20">
      {/* Hero Header */}
      <div className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-900 to-cyan-900/30"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-96 h-96 bg-emerald-600 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-cyan-600 rounded-full blur-[128px] animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-emerald-500/30">
            <User className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-black tracking-wider text-emerald-400">MY PROFILE</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-4 leading-none">
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">
              My Account
            </span>
          </h1>
          <p className="text-xl text-slate-300 font-light">Manage your profile and bookings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/10 shadow-2xl">
              {/* Profile Picture */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-full flex items-center justify-center text-5xl font-black shadow-2xl shadow-emerald-500/50">
                    {userInfo.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 border-4 border-slate-900 rounded-full"></div>
                </div>
                <h2 className="text-3xl font-black mt-6 mb-2">{userInfo.name}</h2>
                <p className="text-slate-400 mb-4">Premium Member</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {new Date(userInfo.memberSince).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/40 rounded-xl p-4 text-center border border-white/10">
                  <p className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {bookingHistory.length}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">Total Bookings</p>
                </div>
                <div className="bg-black/40 rounded-xl p-4 text-center border border-white/10">
                  <p className="text-3xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {bookingHistory.filter(b => b.status === 'Upcoming').length}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">Upcoming</p>
                </div>
              </div>

              {/* Edit/Save Button */}
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl font-bold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl font-bold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/10 shadow-2xl">
              <h3 className="text-3xl font-black mb-8 flex items-center space-x-3">
                <User className="w-8 h-8 text-emerald-400" />
                <span>Personal Information</span>
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-3">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedInfo.name}
                      onChange={(e) => setEditedInfo({...editedInfo, name: e.target.value})}
                      className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-4 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-4 bg-black/40 rounded-xl border border-white/10">
                      <User className="w-5 h-5 text-emerald-400" />
                      <span className="text-white font-semibold">{userInfo.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-3">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedInfo.email}
                      onChange={(e) => setEditedInfo({...editedInfo, email: e.target.value})}
                      className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-4 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-4 bg-black/40 rounded-xl border border-white/10">
                      <Mail className="w-5 h-5 text-cyan-400" />
                      <span className="text-white font-semibold">{userInfo.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-3">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedInfo.phone}
                      onChange={(e) => setEditedInfo({...editedInfo, phone: e.target.value})}
                      className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-4 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-4 bg-black/40 rounded-xl border border-white/10">
                      <Phone className="w-5 h-5 text-violet-400" />
                      <span className="text-white font-semibold">{userInfo.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-3">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedInfo.address}
                      onChange={(e) => setEditedInfo({...editedInfo, address: e.target.value})}
                      className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-4 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-4 bg-black/40 rounded-xl border border-white/10">
                      <MapPin className="w-5 h-5 text-fuchsia-400" />
                      <span className="text-white font-semibold">{userInfo.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking History */}
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/10 shadow-2xl">
              <h3 className="text-3xl font-black mb-8 flex items-center space-x-3">
                <Ticket className="w-8 h-8 text-violet-400" />
                <span>Booking History</span>
              </h3>

              <div className="space-y-6">
                {bookingHistory.map((booking) => (
                  <div
                    key={booking.id}
                    className="group relative bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl overflow-hidden border-2 border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:scale-[1.02]"
                  >
                    <div className="flex gap-6 p-6">
                      {/* Movie Poster */}
                      <div className="relative w-24 h-36 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white/10">
                        <img
                          src={booking.poster}
                          alt={booking.movie}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      {/* Booking Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-2xl font-black text-white mb-1 group-hover:text-emerald-300 transition-colors">
                              {booking.movie}
                            </h4>
                            <p className="text-slate-400 text-sm">Booking ID: {booking.id}</p>
                          </div>
                          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                            booking.status === 'Upcoming'
                              ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400'
                              : 'bg-slate-700/20 border border-slate-600/30 text-slate-400'
                          }`}>
                            {booking.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <span className="text-slate-300">{booking.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Film className="w-4 h-4 text-violet-400" />
                            <span className="text-slate-300">{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-fuchsia-400" />
                            <span className="text-slate-300">{booking.hall}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Ticket className="w-4 h-4 text-amber-400" />
                            <span className="text-slate-300">{booking.seats.join(', ')}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                          <span className="text-slate-400 text-sm">Total Paid</span>
                          <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            ${booking.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;