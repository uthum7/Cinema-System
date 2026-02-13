// frontend/src/pages/admin/DashboardPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Film, 
  Ticket, 
  DollarSign,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  Eye,
  Star,
  Activity
} from 'lucide-react';

const DashboardPage = () => {
  // Statistics Data
  const stats = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$45,234',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'emerald',
      description: 'vs last month'
    },
    {
      id: 2,
      title: 'Total Bookings',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: Ticket,
      color: 'from-violet-600 to-purple-600',
      bgColor: 'violet',
      description: 'vs last month'
    },
    {
      id: 3,
      title: 'Active Users',
      value: '856',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'blue',
      description: 'vs last month'
    },
    {
      id: 4,
      title: 'Movies Showing',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: Film,
      color: 'from-fuchsia-600 to-pink-600',
      bgColor: 'fuchsia',
      description: 'new this week'
    }
  ];

  // Recent Bookings
  const recentBookings = [
    { 
      id: 'BK1234', 
      user: 'Alice Johnson', 
      movie: 'Inception',
      poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
      seats: 2, 
      amount: 25.00, 
      status: 'Confirmed',
      time: '2 mins ago'
    },
    { 
      id: 'BK1235', 
      user: 'Bob Smith', 
      movie: 'The Dark Knight',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      seats: 3, 
      amount: 37.50, 
      status: 'Confirmed',
      time: '5 mins ago'
    },
    { 
      id: 'BK1236', 
      user: 'Carol White', 
      movie: 'Dune',
      poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
      seats: 4, 
      amount: 50.00, 
      status: 'Pending',
      time: '8 mins ago'
    },
    { 
      id: 'BK1237', 
      user: 'David Brown', 
      movie: 'Oppenheimer',
      poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      seats: 1, 
      amount: 12.50, 
      status: 'Confirmed',
      time: '12 mins ago'
    },
    { 
      id: 'BK1238', 
      user: 'Eve Davis', 
      movie: 'Interstellar',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      seats: 2, 
      amount: 25.00, 
      status: 'Confirmed',
      time: '15 mins ago'
    }
  ];

  // Top Movies
  const topMovies = [
    { 
      id: 1, 
      title: 'Inception', 
      poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
      bookings: 234, 
      revenue: 2925.00,
      rating: 8.8,
      occupancy: 87
    },
    { 
      id: 2, 
      title: 'The Dark Knight', 
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      bookings: 198, 
      revenue: 2475.00,
      rating: 9.0,
      occupancy: 82
    },
    { 
      id: 3, 
      title: 'Oppenheimer', 
      poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      bookings: 187, 
      revenue: 2337.50,
      rating: 8.4,
      occupancy: 79
    },
    { 
      id: 4, 
      title: 'Dune', 
      poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
      bookings: 156, 
      revenue: 1950.00,
      rating: 8.5,
      occupancy: 75
    }
  ];

  // Quick Actions
  const quickActions = [
    { title: 'Add Movie', link: '/admin/movies', icon: Film, color: 'from-blue-600 to-cyan-600' },
    { title: 'Manage Schedules', link: '/admin/schedules', icon: Calendar, color: 'from-violet-600 to-purple-600' },
    { title: 'View Bookings', link: '/admin/bookings', icon: Ticket, color: 'from-emerald-600 to-teal-600' },
    { title: 'User Management', link: '/admin/users', icon: Users, color: 'from-fuchsia-600 to-pink-600' }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white min-h-screen p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/30">
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-blue-400">ADMIN PANEL</span>
            </div>
            <h1 className="text-6xl font-black mb-3">
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-slate-400 text-lg">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-sm">Last updated</p>
            <p className="text-white font-bold text-lg">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div 
              key={stat.id}
              className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 shadow-xl overflow-hidden"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <IconComponent className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <p className="text-slate-400 text-sm font-semibold mb-2">{stat.title}</p>
                <div className="flex items-end justify-between mb-3">
                  <h3 className="text-4xl font-black text-white">{stat.value}</h3>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                    stat.trend === 'up' 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    <span className="text-xs font-bold">{stat.change}</span>
                  </div>
                </div>
                <p className="text-slate-500 text-xs">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-black mb-6 flex items-center space-x-3">
          <Activity className="w-6 h-6 text-violet-400" />
          <span>Quick Actions</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className={`group relative bg-gradient-to-br ${action.color} rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500"></div>
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <IconComponent className="w-10 h-10 text-white" />
                  <span className="text-white font-black">{action.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black flex items-center space-x-3">
                <Ticket className="w-8 h-8 text-emerald-400" />
                <span>Recent Bookings</span>
              </h2>
              <Link 
                to="/admin/bookings" 
                className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center space-x-1 group"
              >
                <span>View All</span>
                <ArrowUp className="w-4 h-4 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="group flex items-center space-x-4 p-4 bg-slate-800/50 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Movie Poster */}
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-white/10">
                    <img 
                      src={booking.poster} 
                      alt={booking.movie}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Booking Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-bold text-sm truncate">{booking.movie}</h4>
                        <p className="text-slate-400 text-xs">{booking.user}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ml-2 ${
                        booking.status === 'Confirmed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-4 text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Ticket className="w-3 h-3" />
                          <span>{booking.seats} seats</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{booking.time}</span>
                        </span>
                      </div>
                      <span className="text-emerald-400 font-bold">${booking.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Movies */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-violet-400" />
                <span>Top Movies</span>
              </h2>
            </div>

            <div className="space-y-6">
              {topMovies.map((movie, index) => (
                <div 
                  key={movie.id}
                  className="group relative"
                >
                  <div className="flex items-start space-x-4">
                    {/* Rank Badge */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                      index === 0 ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-500 text-white' :
                      index === 2 ? 'bg-gradient-to-br from-amber-700 to-amber-800 text-white' :
                      'bg-slate-700 text-slate-400'
                    }`}>
                      #{index + 1}
                    </div>

                    {/* Movie Poster */}
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-white/10">
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Movie Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-sm mb-2 truncate group-hover:text-violet-300 transition-colors">
                        {movie.title}
                      </h4>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Bookings</span>
                          <span className="text-white font-bold">{movie.bookings}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Revenue</span>
                          <span className="text-emerald-400 font-bold">${movie.revenue.toFixed(0)}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Occupancy</span>
                          <span className="text-blue-400 font-bold">{movie.occupancy}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3 ml-14">
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full transition-all duration-1000"
                        style={{ width: `${movie.occupancy}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;