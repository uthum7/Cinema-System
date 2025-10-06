// frontend/src/pages/admin/MoviesManagementPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link if needed for detailed pages

// Dummy data for movies
const initialMovies = [
  { id: 1, title: 'Inception', genre: 'Sci-Fi, Thriller', releaseDate: '2010-07-16', duration: '148 min', poster: 'https://picsum.photos/seed/inception/100/150', isFeatured: true, status: 'Now Showing' },
  { id: 2, title: 'The Dark Knight', genre: 'Action, Crime, Drama', releaseDate: '2008-07-18', duration: '152 min', poster: 'https://picsum.photos/seed/darkknight/100/150', isFeatured: false, status: 'Now Showing' },
  { id: 3, title: 'Interstellar', genre: 'Adventure, Drama, Sci-Fi', releaseDate: '2014-11-07', duration: '169 min', poster: 'https://picsum.photos/seed/interstellar/100/150', isFeatured: true, status: 'Coming Soon' },
  { id: 4, title: 'Dune', genre: 'Action, Adventure, Drama', releaseDate: '2021-10-22', duration: '155 min', poster: 'https://picsum.photos/seed/dune/100/150', isFeatured: false, status: 'Now Showing' },
  { id: 5, title: 'Oppenheimer', genre: 'Biography, Drama, History', releaseDate: '2023-07-21', duration: '180 min', poster: 'https://picsum.photos/seed/oppenheimer/100/150', isFeatured: true, status: 'Now Showing' },
];

const MoviesManagementPage = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [showModal, setShowModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null); // For editing or adding

  // Handle Delete
  const handleDelete = (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(movie => movie.id !== movieId));
    }
  };

  // Handle Add/Edit Modal
  const handleAddEditMovie = (movie) => {
    setCurrentMovie(movie); // null for add, movie object for edit
    setShowModal(true);
  };

  const handleSaveMovie = (e) => {
    e.preventDefault();
    // Implement actual save logic here (API call to backend)
    const formData = new FormData(e.target);
    const updatedMovie = {
      id: currentMovie ? currentMovie.id : Date.now(), // Generate ID if adding
      title: formData.get('title'),
      genre: formData.get('genre'),
      releaseDate: formData.get('releaseDate'),
      duration: formData.get('duration'),
      poster: formData.get('poster') || (currentMovie ? currentMovie.poster : `https://picsum.photos/seed/${Date.now()}/100/150`), // Use existing or new dummy poster
      isFeatured: formData.get('isFeatured') === 'on',
      status: formData.get('status'),
    };

    if (currentMovie) {
      // Edit existing movie
      setMovies(movies.map(m => m.id === currentMovie.id ? updatedMovie : m));
    } else {
      // Add new movie
      setMovies([...movies, updatedMovie]);
    }
    setShowModal(false);
    setCurrentMovie(null);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold text-blue-400">Movies Management</h1>
        <button
          onClick={() => handleAddEditMovie(null)} // Pass null to indicate adding a new movie
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200"
        >
          Add New Movie
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="border-b-2 border-gray-700 bg-gray-700">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Poster</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Title</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Genre</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Release Date</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Featured</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie.id} className="hover:bg-gray-700 transition duration-200">
                <td className="px-5 py-4 whitespace-nowrap">
                  <img src={movie.poster} alt={movie.title} className="w-16 h-20 object-cover rounded-md"/>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">{movie.title}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{movie.genre}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{movie.releaseDate}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 font-semibold rounded-full 
                    ${movie.status === 'Now Showing' ? 'bg-green-100 text-green-700' :
                      movie.status === 'Coming Soon' ? 'bg-yellow-100 text-yellow-700' : ''
                    }`}
                  >
                    {movie.status}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  {movie.isFeatured ? (
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l.096.292a1.745 1.745 0 001.179 1.179l.292.096c.658.212 1.182.804 1.394 1.452l.17.344a1.744 1.744 0 001.475 1.195l.377.024a1.745 1.745 0 001.08-1.08l.024-.377c-.212-.658.301-1.308 0-1.902l-.377-.17a1.744 1.744 0 00-1.195-1.475l-.344-.171c-.658-.212-1.308-.301-1.902 0l-.292.096a1.745 1.745 0 00-1.179 1.179l-.096.292c-.3.921-1.603.921-1.902 0l-.096-.292a1.744 1.744 0 00-1.475-1.195l-.377-.024a1.745 1.745 0 00-1.08 1.08l-.024.377c.212.658-.301 1.308 0 1.902l.377.171a1.744 1.744 0 001.195 1.475l.344.171a1.745 1.745 0 00.997.835l.377.024a1.745 1.745 0 001.195-1.475l.024-.377c.212-.658-.301-1.308 0-1.902l-.377-.171a1.744 1.744 0 00-1.195-1.475l-.344-.171z"></path><path d="M12 15.75a3 3 0 110-6 3 3 0 010 6z"></path></svg>
                  ) : (
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l.096.292a1.745 1.745 0 001.179 1.179l.292.096c.658.212 1.182.804 1.394 1.452l.17.344a1.744 1.744 0 001.475 1.195l.377.024a1.745 1.745 0 001.08-1.08l.024-.377c-.212-.658.301-1.308 0-1.902l-.377-.17a1.744 1.744 0 00-1.195-1.475l-.344-.171c-.658-.212-1.308-.301-1.902 0l-.292.096a1.745 1.745 0 00-1.179 1.179l-.096.292c-.3.921-1.603.921-1.902 0l-.096-.292a1.744 1.744 0 00-1.475-1.195l-.377-.024a1.745 1.745 0 00-1.08 1.08l-.024.377c.212.658-.301 1.308 0 1.902l.377.171a1.744 1.744 0 001.195 1.475l.344.171a1.745 1.745 0 00.997.835l.377.024a1.745 1.745 0 001.195-1.475l.024-.377c.212-.658-.301-1.308 0-1.902l-.377-.171a1.744 1.744 0 00-1.195-1.475l-.344-.171z"></path><path d="M12 15.75a3 3 0 110-6 3 3 0 010 6z"></path></svg>
                  )}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm space-x-2">
                  <button
                    onClick={() => handleAddEditMovie(movie)}
                    className="text-blue-400 hover:text-blue-300 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Movie Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="relative w-full max-w-3xl bg-gray-800 rounded-lg shadow-xl p-8">
            <button
              onClick={() => { setShowModal(false); setCurrentMovie(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-6 text-blue-400">{currentMovie ? 'Edit Movie' : 'Add New Movie'}</h2>

            <form onSubmit={handleSaveMovie} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Poster Upload */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="poster">Poster Image</label>
                <input
                  type="file" // Ideally handle actual uploads or use URL input
                  id="poster"
                  name="poster"
                  accept="image/*"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600"
                />
                {currentMovie && currentMovie.poster && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">Current Poster:</p>
                    <img src={currentMovie.poster} alt="Current Poster" className="w-32 h-40 object-cover rounded-md"/>
                  </div>
                )}
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="title">Title</label>
                <input
                  type="text" id="title" name="title" defaultValue={currentMovie?.title}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="genre">Genre</label>
                <input
                  type="text" id="genre" name="genre" defaultValue={currentMovie?.genre}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="releaseDate">Release Date</label>
                <input
                  type="date" id="releaseDate" name="releaseDate" defaultValue={currentMovie?.releaseDate}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="duration">Duration</label>
                <input
                  type="text" id="duration" name="duration" defaultValue={currentMovie?.duration}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="status">Status</label>
                <select id="status" name="status" defaultValue={currentMovie?.status || 'Now Showing'}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white">
                  <option>Now Showing</option>
                  <option>Coming Soon</option>
                  <option>Past</option>
                </select>
              </div>
              <div className="md:col-span-2 flex items-center">
                <input
                  type="checkbox" id="isFeatured" name="isFeatured" defaultChecked={currentMovie?.isFeatured}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-700 rounded mr-3"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-gray-300">Mark as Featured</label>
              </div>

              <div className="md:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 mr-3"
                >
                  {currentMovie ? 'Update Movie' : 'Add Movie'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setCurrentMovie(null); }}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesManagementPage;