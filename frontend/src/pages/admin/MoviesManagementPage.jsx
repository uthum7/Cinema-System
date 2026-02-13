// frontend/src/pages/admin/MoviesManagementPage.jsx
import React, { useState } from 'react';
import { Film, Plus, Edit, Trash2, Star, Calendar, Clock, Eye } from 'lucide-react';

// Enhanced dummy data with real movie posters
const initialMovies = [
  { id: 1, title: 'Inception', genre: 'Sci-Fi, Thriller', releaseDate: '2010-07-16', duration: '148 min', poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg', isFeatured: true, status: 'Now Showing' },
  { id: 2, title: 'The Dark Knight', genre: 'Action, Crime, Drama', releaseDate: '2008-07-18', duration: '152 min', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', isFeatured: false, status: 'Now Showing' },
  { id: 3, title: 'Interstellar', genre: 'Adventure, Drama, Sci-Fi', releaseDate: '2014-11-07', duration: '169 min', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', isFeatured: true, status: 'Coming Soon' },
  { id: 4, title: 'Dune', genre: 'Action, Adventure, Drama', releaseDate: '2021-10-22', duration: '155 min', poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg', isFeatured: false, status: 'Now Showing' },
  { id: 5, title: 'Oppenheimer', genre: 'Biography, Drama, History', releaseDate: '2023-07-21', duration: '180 min', poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', isFeatured: true, status: 'Now Showing' },
  { id: 6, title: 'Avatar: The Way of Water', genre: 'Sci-Fi, Adventure', releaseDate: '2022-12-16', duration: '192 min', poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', isFeatured: false, status: 'Now Showing' },
];

const MoviesManagementPage = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [showModal, setShowModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  const handleDelete = (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(movie => movie.id !== movieId));
    }
  };

  const handleAddEditMovie = (movie) => {
    setCurrentMovie(movie);
    setShowModal(true);
  };

  const handleSaveMovie = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedMovie = {
      id: currentMovie ? currentMovie.id : Date.now(),
      title: formData.get('title'),
      genre: formData.get('genre'),
      releaseDate: formData.get('releaseDate'),
      duration: formData.get('duration'),
      poster: formData.get('poster') || (currentMovie ? currentMovie.poster : `https://image.tmdb.org/t/p/w500/placeholder.jpg`),
      isFeatured: formData.get('isFeatured') === 'on',
      status: formData.get('status'),
    };

    if (currentMovie) {
      setMovies(movies.map(m => m.id === currentMovie.id ? updatedMovie : m));
    } else {
      setMovies([...movies, updatedMovie]);
    }
    setShowModal(false);
    setCurrentMovie(null);
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white min-h-screen p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex justify-between items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/30">
              <Film className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-blue-400">CONTENT MANAGEMENT</span>
            </div>
            <h1 className="text-6xl font-black mb-3">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Movies Management
              </span>
            </h1>
            <p className="text-slate-400 text-lg">Manage your cinema's movie collection</p>
          </div>
          <button
            onClick={() => handleAddEditMovie(null)}
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-black text-lg shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-6 h-6" />
            <span>Add Movie</span>
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map(movie => (
          <div 
            key={movie.id} 
            className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl overflow-hidden border-2 border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] shadow-xl"
          >
            {/* Movie Poster */}
            <div className="relative h-96 overflow-hidden">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 rounded-full font-bold text-xs backdrop-blur-md border ${
                  movie.status === 'Now Showing' 
                    ? 'bg-emerald-600/90 border-emerald-400/30 text-white' 
                    : 'bg-amber-600/90 border-amber-400/30 text-white'
                }`}>
                  {movie.status}
                </span>
              </div>

              {/* Featured Star */}
              {movie.isFeatured && (
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-amber-500/90 backdrop-blur-md rounded-full flex items-center justify-center border border-amber-400/30">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Movie Info */}
            <div className="p-6">
              <h3 className="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">
                {movie.title}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <Film className="w-4 h-4 text-blue-400" />
                  <span>{movie.genre}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleAddEditMovie(movie)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600/20 border border-blue-500/30 rounded-xl font-bold text-blue-400 hover:bg-blue-600/30 hover:border-blue-500/50 transition-all duration-300"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-600/20 border border-red-500/30 rounded-xl font-bold text-red-400 hover:bg-red-600/30 hover:border-red-500/50 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Movie Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl border-2 border-white/10">
            <div className="p-8">
              <button
                onClick={() => { setShowModal(false); setCurrentMovie(null); }}
                className="absolute top-6 right-6 text-slate-400 hover:text-white text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
              >
                ×
              </button>
              
              <h2 className="text-4xl font-black mb-8">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {currentMovie ? 'Edit Movie' : 'Add New Movie'}
                </span>
              </h2>

              <form onSubmit={handleSaveMovie} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Poster Preview/Upload */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-bold text-slate-300 mb-3">Poster Image URL</label>
                  <input
                    type="text"
                    name="poster"
                    defaultValue={currentMovie?.poster}
                    placeholder="https://image.tmdb.org/t/p/w500/..."
                    className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-500"
                  />
                  {currentMovie && currentMovie.poster && (
                    <div className="mt-4">
                      <p className="text-sm text-slate-400 mb-2 font-semibold">Current Poster:</p>
                      <img src={currentMovie.poster} alt="Poster" className="w-full h-64 object-cover rounded-xl border-2 border-white/10"/>
                    </div>
                  )}
                </div>

                <div className="md:col-span-1 space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3">Title</label>
                    <input
                      type="text" name="title" defaultValue={currentMovie?.title}
                      className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3">Genre</label>
                    <input
                      type="text" name="genre" defaultValue={currentMovie?.genre}
                      placeholder="Action, Sci-Fi, Drama"
                      className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all" 
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-3">Release Date</label>
                  <input
                    type="date" name="releaseDate" defaultValue={currentMovie?.releaseDate}
                    className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-3">Duration</label>
                  <input
                    type="text" name="duration" defaultValue={currentMovie?.duration}
                    placeholder="148 min"
                    className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-3">Status</label>
                  <select name="status" defaultValue={currentMovie?.status || 'Now Showing'}
                    className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer">
                    <option>Now Showing</option>
                    <option>Coming Soon</option>
                    <option>Past</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox" name="isFeatured" defaultChecked={currentMovie?.isFeatured}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-700 rounded mr-3 cursor-pointer"
                  />
                  <label className="text-sm font-bold text-slate-300 flex items-center space-x-2">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span>Mark as Featured</span>
                  </label>
                </div>

                <div className="md:col-span-2 flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-black text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                  >
                    {currentMovie ? 'Update Movie' : 'Add Movie'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setCurrentMovie(null); }}
                    className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-black text-lg transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesManagementPage;