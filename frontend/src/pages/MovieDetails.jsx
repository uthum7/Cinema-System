// frontend/src/pages/MovieDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Film, Star, Clock, Calendar, Play, Users, MapPin, ArrowLeft, ArrowRight, ChevronRight, Ticket } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  // Mock movie data - replace with API call
  const [movie, setMovie] = useState({
    id: 1,
    title: 'Inception',
    poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    genre: 'Sci-Fi, Thriller, Action',
    rating: 8.8,
    duration: '148 min',
    releaseDate: '2023-10-27',
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Tom Hardy', 'Ellen Page', 'Joseph Gordon-Levitt'],
    description: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb\'s rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved.',
    trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
    showtimes: [
      { id: 1, time: '10:00 AM', hall: 'Hall A - Premium', availableSeats: 45, price: 12.50 },
      { id: 2, time: '2:00 PM', hall: 'Hall A - Premium', availableSeats: 23, price: 12.50 },
      { id: 3, time: '5:00 PM', hall: 'Hall B - IMAX', availableSeats: 67, price: 15.00 },
      { id: 4, time: '8:30 PM', hall: 'Hall B - IMAX', availableSeats: 12, price: 15.00 },
      { id: 5, time: '11:00 PM', hall: 'Hall C - Standard', availableSeats: 89, price: 10.00 }
    ]
  });

  const handleBookNow = (showtimeId) => {
    navigate(`/booking/${movie.id}?showtime=${showtimeId}`);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-screen">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-end pb-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <Link
              to="/movies"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors font-semibold group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Movies</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Poster */}
              <div className="lg:col-span-1">
                <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl group">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setShowTrailer(true)}
                      className="opacity-0 group-hover:opacity-100 w-20 h-20 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 transition-all hover:scale-110 shadow-lg shadow-red-500/50"
                    >
                      <Play className="w-10 h-10 text-white fill-white ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Movie Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/30 flex items-center space-x-2">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <span className="text-xl font-bold text-amber-400">{movie.rating}</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      <span className="text-white font-semibold">{movie.genre}</span>
                    </div>
                  </div>

                  <h1 className="text-7xl font-black mb-4 leading-none bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent drop-shadow-2xl">
                    {movie.title}
                  </h1>

                  <div className="flex items-center space-x-6 text-gray-300 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">{movie.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">{new Date(movie.releaseDate).getFullYear()}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xl text-gray-300 leading-relaxed max-w-4xl">
                  {movie.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 mb-2 tracking-wider">DIRECTOR</h3>
                    <p className="text-lg font-semibold text-white">{movie.director}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 mb-2 tracking-wider">STARRING</h3>
                    <p className="text-lg font-semibold text-white">{movie.cast.join(', ')}</p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-6">
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="group px-8 py-5 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-3"
                  >
                    <Play className="w-6 h-6 fill-white" />
                    <span>Watch Trailer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes Section */}
      <div className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-amber-500/20">
              <Ticket className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-black tracking-wider text-amber-400">AVAILABLE SHOWTIMES</span>
            </div>
            <h2 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-amber-300 via-white to-amber-300 bg-clip-text text-transparent">
                Book Your Seats
              </span>
            </h2>
            <p className="text-xl text-gray-400">Choose your preferred showtime</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movie.showtimes.map((showtime, index) => (
              <div
                key={showtime.id}
                className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-1">{showtime.time}</h3>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{showtime.hall}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-amber-400">${showtime.price}</p>
                    <p className="text-xs text-gray-500">per ticket</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-6 text-sm">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span className={`font-semibold ${showtime.availableSeats < 20 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {showtime.availableSeats} seats available
                  </span>
                </div>

                <button
                  onClick={() => handleBookNow(showtime.id)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-rose-600 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 group-hover:from-amber-500 group-hover:to-rose-500"
                >
                  <span>Select Seats</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-full max-w-6xl aspect-video">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors text-lg font-bold"
            >
              Close ✕
            </button>
            <iframe
              src={`${movie.trailer}?autoplay=1`}
              className="w-full h-full rounded-2xl shadow-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

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

export default MovieDetails;