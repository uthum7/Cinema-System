// frontend/src/pages/HomePage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Star, Play, ArrowRight, Sparkles, Ticket, Clock, TrendingUp, Calendar } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const featuredMovies = [
    {
      id: 1,
      title: 'Inception',
      poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
      backdrop: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
      genre: 'Sci-Fi, Thriller',
      rating: 8.8,
      duration: '148 min',
      description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.'
    },
    {
      id: 2,
      title: 'The Dark Knight',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      backdrop: 'https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg',
      genre: 'Action, Crime',
      rating: 9.0,
      duration: '152 min',
      description: 'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy.'
    },
    {
      id: 3,
      title: 'Interstellar',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      backdrop: 'https://image.tmdb.org/t/p/original/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg',
      genre: 'Sci-Fi, Drama',
      rating: 8.6,
      duration: '169 min',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const upcomingMovies = [
    {
      id: 4,
      title: 'Pulp Fiction',
      poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      genre: 'Crime',
      rating: 8.9
    },
    {
      id: 5,
      title: 'The Shawshank Redemption',
      poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      genre: 'Drama',
      rating: 9.3
    },
    {
      id: 6,
      title: 'The Godfather',
      poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      genre: 'Crime',
      rating: 9.2
    },
    {
      id: 7,
      title: 'Forrest Gump',
      poster: 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
      genre: 'Drama',
      rating: 8.8
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Slider */}
      <div className="relative h-screen">
        {featuredMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-end pb-24">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center space-x-2 bg-amber-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-amber-500/30">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-black tracking-wider text-amber-400">FEATURED</span>
                  </div>

                  <h1 className="text-7xl md:text-8xl font-black mb-6 leading-none">
                    <span className="bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent drop-shadow-2xl">
                      {movie.title}
                    </span>
                  </h1>

                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2 bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/30">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <span className="text-xl font-bold text-amber-400">{movie.rating}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">{movie.duration}</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-white font-semibold">{movie.genre}</span>
                    </div>
                  </div>

                  <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                    {movie.description}
                  </p>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => navigate(`/booking/${movie.id}`)}
                      className="group px-8 py-4 bg-gradient-to-r from-amber-600 to-rose-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                    >
                      <Ticket className="w-6 h-6" />
                      <span>Book Now</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => navigate(`/movie/${movie.id}`)}
                      className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                    >
                      <Play className="w-6 h-6" />
                      <span>Watch Trailer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-24 right-6 z-30 flex items-center space-x-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ArrowRight className="w-6 h-6 rotate-180" />
          </button>
          <div className="flex space-x-2">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-8 bg-amber-500' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              ></button>
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Now Showing Section */}
      <div className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-4 border border-amber-500/20">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-black tracking-wider text-amber-400">TRENDING NOW</span>
              </div>
              <h2 className="text-5xl font-black">
                <span className="bg-gradient-to-r from-amber-300 via-white to-amber-300 bg-clip-text text-transparent">
                  Popular Movies
                </span>
              </h2>
            </div>
            <Link
              to="/movies"
              className="group px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {upcomingMovies.map((movie, index) => (
              <div
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="group relative bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>

                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-full border border-amber-500/30 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-amber-400">{movie.rating}</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-amber-500/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-400 transition-all hover:scale-110 shadow-lg shadow-amber-500/50">
                      <Play className="w-8 h-8 text-black fill-black ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-semibold">{movie.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/40 via-black to-rose-950/40"></div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-600 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-rose-600 rounded-full blur-[128px] animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-amber-500/20">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-black tracking-wider text-amber-400">READY TO WATCH?</span>
          </div>

          <h2 className="text-6xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-amber-300 via-white to-amber-300 bg-clip-text text-transparent">
              Book Your Tickets Today
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Experience the magic of cinema with premium seats, stunning visuals, and unforgettable moments.
          </p>

          <Link
            to="/movies"
            className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-amber-600 to-rose-600 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
          >
            <Film className="w-6 h-6" />
            <span>Browse Movies</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
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

export default HomePage;