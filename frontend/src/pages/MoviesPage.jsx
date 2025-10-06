// frontend/src/pages/MoviesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Play, Calendar, Globe, X, TrendingUp } from 'lucide-react';

const MoviesPage = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ genre: '', year: '', language: '', sort: 'popularity' });
  const [showFilters, setShowFilters] = useState(false);

  const dummyMovies = [
    { id: 1, title: 'Inception', poster_path: 'https://picsum.photos/seed/inception/300/450', overview: 'A thief who steals corporate secrets through the use of dream-sharing technology...', genre: 'Sci-Fi', release_date: '2010-07-16', language: 'English', popularity: 8.9 },
    { id: 2, title: 'The Dark Knight', poster_path: 'https://picsum.photos/seed/darkknight/300/450', overview: 'When the menace known as the Joker wreaks havoc...', genre: 'Action', release_date: '2008-07-18', language: 'English', popularity: 9.2 },
    { id: 3, title: 'Parasite', poster_path: 'https://picsum.photos/seed/parasite/300/450', overview: 'A poor family schemes to become employed by a wealthy family...', genre: 'Drama', release_date: '2019-05-30', language: 'Korean', popularity: 8.7 },
    { id: 4, title: 'Dune', poster_path: 'https://picsum.photos/seed/dune/300/450', overview: 'Paul Atreides, a brilliant and gifted young man born into a great destiny...', genre: 'Sci-Fi', release_date: '2021-10-22', language: 'English', popularity: 8.5 },
    { id: 5, title: 'Spirited Away', poster_path: 'https://picsum.photos/seed/spiritedaway/300/450', overview: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits...', genre: 'Animation', release_date: '2001-07-20', language: 'Japanese', popularity: 8.6 },
    { id: 6, title: 'The Matrix', poster_path: 'https://picsum.photos/seed/matrix/300/450', overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', genre: 'Sci-Fi', release_date: '1999-03-31', language: 'English', popularity: 8.8 },
    { id: 7, title: 'Oppenheimer', poster_path: 'https://picsum.photos/seed/oppenheimer/300/450', overview: 'The development of the atomic bomb during World War II.', genre: 'Drama', release_date: '2023-07-21', language: 'English', popularity: 9.0 },
  ];

  const uniqueGenres = [...new Set(dummyMovies.map(movie => movie.genre))];
  const uniqueYears = [...new Set(dummyMovies.map(movie => new Date(movie.release_date).getFullYear()))].sort((a, b) => b - a);
  const uniqueLanguages = [...new Set(dummyMovies.map(movie => movie.language))];

  useEffect(() => {
    setAllMovies(dummyMovies);
    setFilteredMovies(dummyMovies);
  }, []);

  useEffect(() => {
    let results = allMovies;

    if (searchTerm) {
      results = results.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.overview.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.genre) {
      results = results.filter(movie => movie.genre === filters.genre);
    }

    if (filters.year) {
      results = results.filter(movie => new Date(movie.release_date).getFullYear() === parseInt(filters.year));
    }

    if (filters.language) {
      results = results.filter(movie => movie.language === filters.language);
    }

    if (filters.sort === 'popularity') {
      results.sort((a, b) => b.popularity - a.popularity);
    } else if (filters.sort === 'year') {
      results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (filters.sort === 'title') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredMovies(results);
  }, [searchTerm, filters, allMovies]);

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({ genre: '', year: '', language: '', sort: 'popularity' });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || filters.genre || filters.year || filters.language;

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero Header */}
      <div className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-64 h-64 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-600 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-purple-500/20">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">Now Playing</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              All Movies
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover your next favorite film from our collection
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Search and Filter Bar */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search movies by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-sm text-white rounded-2xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-400 font-semibold hover:bg-purple-600/30 transition-all mb-4"
            >
              <Filter className="w-4 h-4" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <select
                  className="p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={filters.genre}
                  onChange={(e) => handleFilterChange({ genre: e.target.value })}
                >
                  <option value="">All Genres</option>
                  {uniqueGenres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
                </select>

                <select
                  className="p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={filters.year}
                  onChange={(e) => handleFilterChange({ year: e.target.value })}
                >
                  <option value="">All Years</option>
                  {uniqueYears.map(year => <option key={year} value={year}>{year}</option>)}
                </select>

                <select
                  className="p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={filters.language}
                  onChange={(e) => handleFilterChange({ language: e.target.value })}
                >
                  <option value="">All Languages</option>
                  {uniqueLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>

                <select
                  className="p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange({ sort: e.target.value })}
                >
                  <option value="popularity">Sort by Popularity</option>
                  <option value="year">Sort by Year</option>
                  <option value="title">Sort by Title</option>
                </select>
              </div>
            )}

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <span className="text-gray-400 text-sm">Active filters:</span>
                {searchTerm && (
                  <span className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-400 flex items-center space-x-1">
                    <span>Search: {searchTerm}</span>
                    <button onClick={() => setSearchTerm('')} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.genre && (
                  <span className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-400 flex items-center space-x-1">
                    <span>{filters.genre}</span>
                    <button onClick={() => handleFilterChange({ genre: '' })} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.year && (
                  <span className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-400 flex items-center space-x-1">
                    <span>{filters.year}</span>
                    <button onClick={() => handleFilterChange({ year: '' })} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.language && (
                  <span className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-400 flex items-center space-x-1">
                    <span>{filters.language}</span>
                    <button onClick={() => handleFilterChange({ language: '' })} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-sm text-red-400 hover:bg-red-600/30 transition-all"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing <span className="text-white font-bold">{filteredMovies.length}</span> {filteredMovies.length === 1 ? 'movie' : 'movies'}
          </p>
        </div>

        {/* Movie Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map(movie => (
              <Link 
                to={`/booking/${movie.id}`} 
                key={movie.id} 
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
              >
                <div className="relative overflow-hidden aspect-[2/3]">
                  <img 
                    src={movie.poster_path} 
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-yellow-500/20">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold text-sm">{movie.popularity.toFixed(1)}</span>
                  </div>

                  {/* Language Badge */}
                  <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-500/20">
                    <Globe className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400 font-semibold text-xs">{movie.language}</span>
                  </div>

                  {/* Hover Button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{movie.title}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-purple-400 font-semibold">{movie.genre}</span>
                    <span className="text-gray-600">•</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <span className="text-sm text-gray-400">{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-2">{movie.overview}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/10">
              <div className="w-20 h-20 mx-auto mb-4 bg-purple-600/20 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No movies found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;