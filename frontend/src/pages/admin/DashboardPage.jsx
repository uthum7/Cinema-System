// frontend/src/pages/admin/DashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Dummy data for KPIs
const dashboardData = {
  totalSales: '$15,450.75',
  seatOccupancy: '72%',
  aiScheduleEfficiency: '85%',
  totalBookings: 350,
  totalUsers: 1200,
};

// Dummy data for recent activity/charts
const recentMovies = [
  { id: 1, title: 'Inception', revenue: '$5,200', bookings: 85, occupancy: '80%' },
  { id: 2, title: 'Dune', revenue: '$4,500', bookings: 70, occupancy: '75%' },
  { id: 3, title: 'Oppenheimer', revenue: '$3,800', bookings: 60, occupancy: '70%' },
];

const DashboardPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-blue-400">Admin Dashboard</h1>

      {/* KPIs Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Total Sales */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105">
          <h3 className="text-2xl font-bold text-teal-400 mb-3">Total Sales</h3>
          <p className="text-4xl font-extrabold text-white">{dashboardData.totalSales}</p>
        </div>
        {/* Seat Occupancy */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105">
          <h3 className="text-2xl font-bold text-purple-400 mb-3">Seat Occupancy</h3>
          <p className="text-4xl font-extrabold text-white">{dashboardData.seatOccupancy}</p>
        </div>
        {/* AI Schedule Efficiency */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105">
          <h3 className="text-2xl font-bold text-indigo-400 mb-3">AI Schedule Efficiency</h3>
          <p className="text-4xl font-extrabold text-white">{dashboardData.aiScheduleEfficiency}</p>
        </div>
      </section>

      {/* Quick Stats and Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-1 bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-blue-400 mb-6">Recent Bookings</h3>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => ( // Dummy recent bookings
              <div key={i} className="flex items-center justify-between text-gray-300">
                <span>Booking #{1000 + i}</span>
                <span className="text-green-400 font-semibold">+$50.00</span>
              </div>
            ))}
          </div>
           <Link to="/admin/bookings" className="block w-full text-center mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
             View All Bookings
           </Link>
        </div>

        {/* Recent Movies (Simple List) */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-purple-400 mb-6">Top Performing Movies</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="border-b-2 border-gray-700 bg-gray-700">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Movie</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Revenue</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Bookings</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {recentMovies.map(movie => (
                  <tr key={movie.id} className="hover:bg-gray-700 transition duration-200">
                    <td className="px-5 py-4 whitespace-nowrap text-sm flex items-center space-x-3">
                      <img src={`https://picsum.photos/seed/${movie.title.toLowerCase()}/40/60`} alt="" className="w-10 h-12 rounded-md object-cover"/>
                      <span>{movie.title}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-green-400">{movie.revenue}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{movie.bookings}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{movie.occupancy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/admin/movies" className="block w-full text-center mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
             Manage Movies
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;