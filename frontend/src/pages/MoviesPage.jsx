// frontend/src/pages/MoviesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Star, Clock, Calendar, Search, Filter, Play, ChevronRight, Sparkles } from 'lucide-react';

const MoviesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Inception',
      poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
      genre: 'Sci-Fi',
      rating: 8.8,
      duration: '148 min',
      releaseDate: '2023-10-27',
      description: 'A thief who steals corporate secrets through dream-sharing technology.',
      trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0'
    },
    {
      id: 2,
      title: 'The Dark Knight',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      genre: 'Action',
      rating: 9.0,
      duration: '152 min',
      releaseDate: '2023-10-28',
      description: 'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.',
      trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY'
    },
    {
      id: 3,
      title: 'Interstellar',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      genre: 'Sci-Fi',
      rating: 8.6,
      duration: '169 min',
      releaseDate: '2023-10-29',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E'
    },
    {
      id: 4,
      title: 'Pulp Fiction',
      poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      genre: 'Crime',
      rating: 8.9,
      duration: '154 min',
      releaseDate: '2023-10-30',
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence.',
      trailer: 'https://www.youtube.com/watch?v=s7EdQ4FqbhY'
    },
    {
      id: 5,
      title: 'The Shawshank Redemption',
      poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      genre: 'Drama',
      rating: 9.3,
      duration: '142 min',
      releaseDate: '2023-11-01',
      description: 'Two imprisoned men bond over years, finding solace and eventual redemption.',
      trailer: 'https://www.youtube.com/watch?v=6hB3S9bIaco'
    },
    {
      id: 6,
      title: 'The Godfather',
      poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      genre: 'Crime',
      rating: 9.2,
      duration: '175 min',
      releaseDate: '2023-11-02',
      description: 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.',
      trailer: 'https://www.youtube.com/watch?v=sY1S34973zA'
    }
  ]);

  const genres = ['all', 'Action', 'Sci-Fi', 'Drama', 'Crime', 'Horror', 'Comedy', 'Romance'];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleBookNow = (movieId) => {
    navigate(`/booking/${movieId}`);
  };

  const handleViewDetails = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/40 via-black to-rose-950/40"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-600 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-rose-600 rounded-full blur-[128px] animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-amber-500/20">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-black tracking-wider text-amber-400">NOW SHOWING</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-amber-300 bg-clip-text text-transparent drop-shadow-2xl">
                Latest Movies
              </span>
            </h1>
            <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
              Discover the hottest films and book your tickets instantly
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-black/40 text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-500"
                  />
                </div>

                {/* Genre Filter */}
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-black/40 text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre} className="bg-gray-900">
                        {genre === 'all' ? 'All Genres' : genre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="group relative bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Movie Poster */}
              <div className="relative h-96 overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-full border border-amber-500/30 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-amber-400">{movie.rating}</span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleViewDetails(movie.id)}
                    className="w-16 h-16 bg-amber-500/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-400 transition-all hover:scale-110 shadow-lg shadow-amber-500/50"
                  >
                    <Play className="w-8 h-8 text-black fill-black ml-1" />
                  </button>
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-6">
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {movie.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {movie.description}
                </p>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Film className="w-4 h-4" />
                    <span>{movie.genre}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{movie.duration}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-6 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleViewDetails(movie.id)}
                    className="flex-1 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleBookNow(movie.id)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-600 to-rose-600 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <Film className="w-20 h-20 text-gray-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No movies found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
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

export default MoviesPage;