// frontend/src/pages/SchedulePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, TrendingUp, Film, ChevronRight } from 'lucide-react';

const SchedulePage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHall, setSelectedHall] = useState('');
  const [showtimes, setShowtimes] = useState([]);

  const dummyMovies = [
    { id: 'm1', title: 'Inception' },
    { id: 'm2', title: 'The Dark Knight' },
    { id: 'm3', title: 'Dune' },
    { id: 'm4', title: 'Oppenheimer' },
  ];

  const dummyShowtimes = [
    { id: 's1', movieId: 'm1', date: '2023-10-27', time: '14:00', hall: 'Hall A', availableSeats: 50, totalSeats: 100, isBestValue: false, img: 'https://picsum.photos/seed/inception_hall/60/60' },
    { id: 's2', movieId: 'm1', date: '2023-10-27', time: '18:00', hall: 'Hall B', availableSeats: 80, totalSeats: 120, isBestValue: true, img: 'https://picsum.photos/seed/inception_hall_b/60/60' },
    { id: 's3', movieId: 'm1', date: '2023-10-28', time: '11:00', hall: 'Hall A', availableSeats: 95, totalSeats: 100, isBestValue: false, img: 'https://picsum.photos/seed/inception_hall_morning/60/60' },
    { id: 's4', movieId: 'm2', date: '2023-10-27', time: '15:00', hall: 'Hall C', availableSeats: 30, totalSeats: 150, isBestValue: false, img: 'https://picsum.photos/seed/darkknight_hall/60/60' },
    { id: 's5', movieId: 'm2', date: '2023-10-27', time: '19:30', hall: 'Hall B', availableSeats: 70, totalSeats: 120, isBestValue: true, img: 'https://picsum.photos/seed/darkknight_hall_b/60/60' },
    { id: 's6', movieId: 'm3', date: '2023-10-28', time: '13:00', hall: 'Hall A', availableSeats: 110, totalSeats: 130, isBestValue: false, img: 'https://picsum.photos/seed/dune_hall/60/60' },
    { id: 's7', movieId: 'm4', date: '2023-10-28', time: '20:00', hall: 'Hall D', availableSeats: 120, totalSeats: 150, isBestValue: false, img: 'https://picsum.photos/seed/oppenheimer_hall/60/60' },
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
    if (percentage > 50) return 'text-green-400';
    if (percentage > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getAvailabilityBg = (availableSeats, totalSeats) => {
    const percentage = (availableSeats / totalSeats) * 100;
    if (percentage > 50) return 'bg-green-500/20 border-green-500/30';
    if (percentage > 20) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero Header */}
      <div className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-purple-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-64 h-64 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-purple-600 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-500/20">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">Plan Your Visit</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Movie Schedule
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Find the perfect showtime for your movie experience
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Filters Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <Film className="w-6 h-6 text-purple-400" />
              <span>Filter Showtimes</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center space-x-2">
                  <Film className="w-4 h-4" />
                  <span>Select Movie</span>
                </label>
                <select
                  className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={selectedMovie}
                  onChange={(e) => setSelectedMovie(e.target.value)}
                >
                  <option value="">All Movies</option>
                  {movies.map(movie => (
                    <option key={movie.id} value={movie.id}>{movie.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Select Date</span>
                </label>
                <input
                  type="date"
                  className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Select Hall</span>
                </label>
                <select
                  className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={selectedHall}
                  onChange={(e) => setSelectedHall(e.target.value)}
                >
                  <option value="">All Halls</option>
                  <option value="Hall A">Hall A</option>
                  <option value="Hall B">Hall B</option>
                  <option value="Hall C">Hall C</option>
                  <option value="Hall D">Hall D</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing <span className="text-white font-bold">{showtimes.length}</span> {showtimes.length === 1 ? 'showtime' : 'showtimes'}
          </p>
        </div>

        {/* Showtimes Grid */}
        {showtimes.length > 0 ? (
          <div className="grid gap-4">
            {showtimes.map(st => (
              <div
                key={st.id}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:scale-[1.02] ${
                  st.isBestValue 
                    ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30 hover:border-yellow-500/50' 
                    : 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-white/10 hover:border-purple-500/50'
                }`}
              >
                {st.isBestValue && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1.5 rounded-full shadow-lg">
                      <TrendingUp className="w-4 h-4 text-white" />
                      <span className="text-white font-bold text-xs">Best Value</span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* Left: Movie Info */}
                    <div className="flex items-center space-x-4">
                      <img 
                        src={st.img} 
                        alt="" 
                        className="w-16 h-16 rounded-xl object-cover border-2 border-white/20"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {movies.find(m => m.id === st.movieId)?.title || 'Unknown Movie'}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <span className="font-semibold text-white">{st.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            <span>{st.hall}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center: Seats Info */}
                    <div className="flex items-center space-x-6">
                      <div className={`px-4 py-3 rounded-xl border ${getAvailabilityBg(st.availableSeats, st.totalSeats)}`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <Users className={`w-5 h-5 ${getAvailabilityColor(st.availableSeats, st.totalSeats)}`} />
                          <span className="text-sm text-gray-400">Available</span>
                        </div>
                        <div className={`text-2xl font-bold ${getAvailabilityColor(st.availableSeats, st.totalSeats)}`}>
                          {st.availableSeats}/{st.totalSeats}
                        </div>
                      </div>
                    </div>

                    {/* Right: Book Button */}
                    <Link
                      to={`/booking/${st.id}`}
                      className={`group/btn px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 ${
                        st.availableSeats === 0
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105'
                      }`}
                    >
                      <span>{st.availableSeats === 0 ? 'Sold Out' : 'Book Now'}</span>
                      {st.availableSeats > 0 && (
                        <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/10">
              <div className="w-20 h-20 mx-auto mb-4 bg-purple-600/20 rounded-full flex items-center justify-center">
                <Calendar className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No showtimes available</h3>
              <p className="text-gray-400 mb-6">Try selecting different filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;