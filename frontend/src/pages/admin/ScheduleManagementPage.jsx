// frontend/src/pages/admin/ScheduleManagementPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Dummy data for movies and showtimes
const dummyMovies = [
  { id: 'm1', title: 'Inception', poster: 'https://picsum.photos/seed/inception/50/75' },
  { id: 'm2', title: 'The Dark Knight', poster: 'https://picsum.photos/seed/darkknight/50/75' },
  { id: 'm3', title: 'Interstellar', poster: 'https://picsum.photos/seed/interstellar/50/75' },
  { id: 'm4', title: 'Dune', poster: 'https://picsum.photos/seed/dune/50/75' },
  { id: 'm5', title: 'Oppenheimer', poster: 'https://picsum.photos/seed/oppenheimer/50/75' },
];

const initialShowtimes = [
  { id: 's1', movieId: 'm1', movieTitle: 'Inception', date: '2023-10-27', time: '14:00', hall: 'Hall A', moviePoster: dummyMovies.find(m => m.id === 'm1')?.poster },
  { id: 's2', movieId: 'm1', movieTitle: 'Inception', date: '2023-10-27', time: '18:00', hall: 'Hall B', moviePoster: dummyMovies.find(m => m.id === 'm1')?.poster },
  { id: 's3', movieId: 'm2', movieTitle: 'The Dark Knight', date: '2023-10-27', time: '15:00', hall: 'Hall C', moviePoster: dummyMovies.find(m => m.id === 'm2')?.poster },
  { id: 's4', movieId: 'm3', movieTitle: 'Interstellar', date: '2023-10-28', time: '11:00', hall: 'Hall A', moviePoster: dummyMovies.find(m => m.id === 'm3')?.poster },
  { id: 's5', movieId: 'm4', movieTitle: 'Dune', date: '2023-10-28', time: '13:00', hall: 'Hall A', moviePoster: dummyMovies.find(m => m.id === 'm4')?.poster },
  { id: 's6', movieId: 'm5', movieTitle: 'Oppenheimer', date: '2023-10-28', time: '20:00', hall: 'Hall D', moviePoster: dummyMovies.find(m => m.id === 'm5')?.poster },
];

const ScheduleManagementPage = () => {
  const [showtimes, setShowtimes] = useState(initialShowtimes);
  const [showModal, setShowModal] = useState(false);
  const [currentShowtime, setCurrentShowtime] = useState(null); // For editing or adding

  const handleDelete = (showtimeId) => {
    if (window.confirm('Are you sure you want to delete this showtime?')) {
      setShowtimes(showtimes.filter(st => st.id !== showtimeId));
    }
  };

  const handleAddEditShowtime = (showtime) => {
    setCurrentShowtime(showtime);
    setShowModal(true);
  };

  const handleSaveShowtime = (e) => {
    e.preventDefault();
    // Implement actual save logic here (API call to backend)
    const formData = new FormData(e.target);
    const selectedMovie = dummyMovies.find(m => m.id === formData.get('movieId'));

    const updatedShowtime = {
      id: currentShowtime ? currentShowtime.id : `s${Date.now()}`, // Generate ID if adding
      movieId: formData.get('movieId'),
      movieTitle: selectedMovie ? selectedMovie.title : 'Unknown Movie',
      moviePoster: selectedMovie ? selectedMovie.poster : 'https://picsum.photos/seed/unknown/50/75',
      date: formData.get('date'),
      time: formData.get('time'),
      hall: formData.get('hall'),
    };

    if (currentShowtime) {
      // Edit existing showtime
      setShowtimes(showtimes.map(st => st.id === currentShowtime.id ? updatedShowtime : st));
    } else {
      // Add new showtime
      setShowtimes([...showtimes, updatedShowtime]);
    }
    setShowModal(false);
    setCurrentMovie(null);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold text-blue-400">Schedule Management</h1>
        <button
          onClick={() => handleAddEditShowtime(null)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200"
        >
          Add New Showtime
        </button>
      </div>

      {/* Placeholder for AI Recommendation */}
      <section className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-indigo-400 mb-3">AI Schedule Recommendation</h3>
          <p className="text-gray-300">Optimize showtimes for maximum attendance and revenue.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200">
          Generate AI Schedule
        </button>
      </section>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="border-b-2 border-gray-700 bg-gray-700">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Movie</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Time</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Hall</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {showtimes.map(st => (
              <tr key={st.id} className="hover:bg-gray-700 transition duration-200">
                <td className="px-5 py-4 whitespace-nowrap text-sm flex items-center space-x-3">
                  <img src={st.moviePoster} alt={st.movieTitle} className="w-12 h-16 object-cover rounded-md"/>
                  <span>{st.movieTitle}</span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{st.date}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{st.time}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{st.hall}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm space-x-2">
                  <button
                    onClick={() => handleAddEditShowtime(st)}
                    className="text-blue-400 hover:text-blue-300 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(st.id)}
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

      {/* Add/Edit Showtime Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="relative w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl p-8">
            <button
              onClick={() => { setShowModal(false); setCurrentShowtime(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-6 text-blue-400">{currentShowtime ? 'Edit Showtime' : 'Add New Showtime'}</h2>

            <form onSubmit={handleSaveShowtime} className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="movieId">Movie</label>
                <select id="movieId" name="movieId" defaultValue={currentShowtime?.movieId}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" required>
                  <option value="">Select a Movie</option>
                  {dummyMovies.map(movie => (
                    <option key={movie.id} value={movie.id}>{movie.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="date">Date</label>
                <input
                  type="date" id="date" name="date" defaultValue={currentShowtime?.date}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="time">Time</label>
                <input
                  type="time" id="time" name="time" defaultValue={currentShowtime?.time}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="hall">Hall</label>
                <select id="hall" name="hall" defaultValue={currentShowtime?.hall}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white">
                  <option value="">Select a Hall</option>
                  <option>Hall A</option>
                  <option>Hall B</option>
                  <option>Hall C</option>
                  <option>Hall D</option>
                </select>
              </div>

              <div className="text-right col-span-1">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 mr-3"
                >
                  {currentShowtime ? 'Update Showtime' : 'Add Showtime'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setCurrentShowtime(null); }}
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

export default ScheduleManagementPage;