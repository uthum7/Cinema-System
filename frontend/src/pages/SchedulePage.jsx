// frontend/src/pages/SchedulePage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, TrendingUp, Film, ChevronRight, Sparkles, Star, Search, Filter } from 'lucide-react';

const SchedulePage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHall, setSelectedHall] = useState('');
  const [showtimes, setShowtimes] = useState([]);

  const dummyMovies = [
    { 
      id: 'm1', 
      title: 'Inception',
      poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
      rating: 8.8,
      genre: 'Sci-Fi'
    },
    { 
      id: 'm2', 
      title: 'The Dark Knight',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      rating: 9.0,
      genre: 'Action'
    },
    { 
      id: 'm3', 
      title: 'Dune',
      poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
      rating: 8.0,
      genre: 'Sci-Fi'
    },
    { 
      id: 'm4', 
      title: 'Oppenheimer',
      poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      rating: 8.5,
      genre: 'Biography'
    },
  ];

  const dummyShowtimes = [
    { id: 's1', movieId: 'm1', date: '2023-10-27', time: '14:00', hall: 'Hall A - Premium', availableSeats: 50, totalSeats: 100, isBestValue: false, price: 12.50 },
    { id: 's2', movieId: 'm1', date: '2023-10-27', time: '18:00', hall: 'Hall B - IMAX', availableSeats: 80, totalSeats: 120, isBestValue: true, price: 15.00 },
    { id: 's3', movieId: 'm1', date: '2023-10-28', time: '11:00', hall: 'Hall A - Premium', availableSeats: 95, totalSeats: 100, isBestValue: false, price: 12.50 },
    { id: 's4', movieId: 'm2', date: '2023-10-27', time: '15:00', hall: 'Hall C - Standard', availableSeats: 30, totalSeats: 150, isBestValue: false, price: 10.00 },
    { id: 's5', movieId: 'm2', date: '2023-10-27', time: '19:30', hall: 'Hall B - IMAX', availableSeats: 70, totalSeats: 120, isBestValue: true, price: 15.00 },
    { id: 's6', movieId: 'm3', date: '2023-10-28', time: '13:00', hall: 'Hall A - Premium', availableSeats: 110, totalSeats: 130, isBestValue: false, price: 12.50 },
    { id: 's7', movieId: 'm4', date: '2023-10-28', time: '20:00', hall: 'Hall D - Deluxe', availableSeats: 120, totalSeats: 150, isBestValue: false, price: 14.00 },
  ];

  useEffect(() => {
    setMovies(dummyMovies);
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    let filtered = dummyShowtimes;
    if (selectedMovie) {
      filtered = filtered.filter(st => st.movieId === selectedMovie);
    }
    if (selectedDate) {
      filtered = filtered.filter(st => st.date === selectedDate);
    }
    if (selectedHall) {
      filtered = filtered.filter(st => st.hall === selectedHall);
    }
    setShowtimes(filtered);
  }, [selectedMovie, selectedDate, selectedHall]);

  const getAvailabilityColor = (availableSeats, totalSeats) => {
    const percentage = (availableSeats / totalSeats) * 100;
    if (percentage > 50) return 'text-emerald-400';
    if (percentage > 20) return 'text-amber-400';
    return 'text-red-400';
  };

  const getAvailabilityBg = (availableSeats, totalSeats) => {
    const percentage = (availableSeats / totalSeats) * 100;
    if (percentage > 50) return 'bg-emerald-500/10 border-emerald-500/30';
    if (percentage > 20) return 'bg-amber-500/10 border-amber-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  const handleBooking = (showtimeId, movieId) => {
    navigate(`/booking/${movieId}?showtime=${showtimeId}`);
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero Header */}
      <div className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/40 via-black to-rose-950/40"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-amber-600 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-rose-600 rounded-full blur-[128px] animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-amber-500/20">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-black tracking-wider text-amber-400">PLAN YOUR VISIT</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-amber-300 via-white to-amber-300 bg-clip-text text-transparent drop-shadow-2xl">
              Movie Schedule
            </span>
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Find the perfect showtime for your cinematic experience
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Filters Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black flex items-center space-x-3">
                <Filter className="w-7 h-7 text-amber-400" />
                <span>Filter Showtimes</span>
              </h2>
              {(selectedMovie || selectedHall) && (
                <button
                  onClick={() => {
                    setSelectedMovie('');
                    setSelectedHall('');
                  }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Movie Filter */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-400 mb-3 flex items-center space-x-2 group-focus-within:text-amber-400 transition-colors">
                  <Film className="w-4 h-4" />
                  <span>Select Movie</span>
                </label>
                <select
                  className="w-full p-4 bg-black/50 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-2 focus:ring-amber-500 focus:border-amber-500/50 transition-all cursor-pointer font-medium appearance-none"
                  value={selectedMovie}
                  onChange={(e) => setSelectedMovie(e.target.value)}
                >
                  <option value="" className="bg-gray-900">All Movies</option>
                  {movies.map(movie => (
                    <option key={movie.id} value={movie.id} className="bg-gray-900">{movie.title}</option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-400 mb-3 flex items-center space-x-2 group-focus-within:text-amber-400 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>Select Date</span>
                </label>
                <input
                  type="date"
                  className="w-full p-4 bg-black/50 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-2 focus:ring-amber-500 focus:border-amber-500/50 transition-all font-medium"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              {/* Hall Filter */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-400 mb-3 flex items-center space-x-2 group-focus-within:text-amber-400 transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>Select Hall</span>
                </label>
                <select
                  className="w-full p-4 bg-black/50 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-2 focus:ring-amber-500 focus:border-amber-500/50 transition-all cursor-pointer font-medium appearance-none"
                  value={selectedHall}
                  onChange={(e) => setSelectedHall(e.target.value)}
                >
                  <option value="" className="bg-gray-900">All Halls</option>
                  <option value="Hall A - Premium" className="bg-gray-900">Hall A - Premium</option>
                  <option value="Hall B - IMAX" className="bg-gray-900">Hall B - IMAX</option>
                  <option value="Hall C - Standard" className="bg-gray-900">Hall C - Standard</option>
                  <option value="Hall D - Deluxe" className="bg-gray-900">Hall D - Deluxe</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-gray-400 font-medium">
              Showing <span className="text-white font-bold text-lg">{showtimes.length}</span> {showtimes.length === 1 ? 'showtime' : 'showtimes'}
            </p>
          </div>
          {selectedMovie && (
            <div className="flex items-center space-x-3 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl">
              <Film className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-amber-400">
                {movies.find(m => m.id === selectedMovie)?.title}
              </span>
            </div>
          )}
        </div>

        {/* Showtimes Grid */}
        {showtimes.length > 0 ? (
          <div className="grid gap-6">
            {showtimes.map((st, index) => {
              const movie = movies.find(m => m.id === st.movieId);
              return (
                <div
                  key={st.id}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:scale-[1.02] ${
                    st.isBestValue 
                      ? 'bg-gradient-to-r from-amber-900/30 to-rose-900/30 border-amber-500/30 hover:border-amber-500/50 shadow-lg shadow-amber-500/10' 
                      : 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-white/10 hover:border-amber-500/30'
                  }`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Best Value Badge */}
                  {st.isBestValue && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-2 rounded-full shadow-lg">
                        <TrendingUp className="w-4 h-4 text-white" />
                        <span className="text-white font-black text-sm">BEST VALUE</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* Left: Movie Info with Poster */}
                      <div className="flex items-center space-x-5">
                        <div className="relative group/poster">
                          <img 
                            src={movie?.poster || 'https://via.placeholder.com/80x120'} 
                            alt={movie?.title}
                            className="w-20 h-28 rounded-xl object-cover border-2 border-white/20 shadow-lg group-hover/poster:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">
                            {movie?.title || 'Unknown Movie'}
                          </h3>
                          <div className="flex items-center space-x-4 mb-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-sm font-bold text-amber-400">{movie?.rating}</span>
                            </div>
                            <div className="text-sm text-gray-400 font-semibold">{movie?.genre}</div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-amber-400" />
                              <span className="font-bold text-white text-base">{st.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-rose-400" />
                              <span className="text-gray-400 font-medium">{st.hall}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Center: Seats & Price Info */}
                      <div className="flex items-center space-x-6">
                        {/* Available Seats */}
                        <div className={`px-5 py-4 rounded-xl border-2 ${getAvailabilityBg(st.availableSeats, st.totalSeats)}`}>
                          <div className="flex items-center space-x-2 mb-1">
                            <Users className={`w-5 h-5 ${getAvailabilityColor(st.availableSeats, st.totalSeats)}`} />
                            <span className="text-xs text-gray-400 font-bold">Available Seats</span>
                          </div>
                          <div className={`text-2xl font-black ${getAvailabilityColor(st.availableSeats, st.totalSeats)}`}>
                            {st.availableSeats}/{st.totalSeats}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-center">
                          <p className="text-xs text-gray-500 font-bold mb-1">Price</p>
                          <p className="text-3xl font-black bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                            ${st.price}
                          </p>
                        </div>
                      </div>

                      {/* Right: Book Button */}
                      <button
                        onClick={() => handleBooking(st.id, st.movieId)}
                        disabled={st.availableSeats === 0}
                        className={`group/btn px-8 py-4 rounded-xl font-black text-lg transition-all duration-300 flex items-center space-x-3 ${
                          st.availableSeats === 0
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-2 border-gray-700'
                            : 'bg-gradient-to-r from-amber-600 to-rose-600 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105'
                        }`}
                      >
                        <span>{st.availableSeats === 0 ? 'Sold Out' : 'Book Now'}</span>
                        {st.availableSeats > 0 && (
                          <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="inline-block p-12 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/10">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-600/20 to-rose-600/20 rounded-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-amber-400" />
              </div>
              <h3 className="text-3xl font-black text-white mb-3">No Showtimes Available</h3>
              <p className="text-gray-400 text-lg mb-6">Try adjusting your filter selection</p>
              <button
                onClick={() => {
                  setSelectedMovie('');
                  setSelectedHall('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-rose-600 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SchedulePage;