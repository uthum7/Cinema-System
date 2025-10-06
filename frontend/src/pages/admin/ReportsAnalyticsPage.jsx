// frontend/src/pages/admin/ReportsAnalyticsPage.jsx
import React from 'react';
// For charts, you might use libraries like Chart.js with react-chartjs-2
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend); // Register chart components

// Dummy data for reports
const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Monthly Sales',
      data: [1200, 1900, 3000, 2500, 3200, 4000],
      backgroundColor: 'rgba(79, 70, 229, 0.6)', // Indigo-500
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 1,
    },
  ],
};

const occupancyData = {
  labels: ['Hall A', 'Hall B', 'Hall C', 'Hall D'],
  datasets: [
    {
      label: 'Average Hall Occupancy',
      data: [78, 85, 65, 88],
      backgroundColor: [
        'rgba(56, 189, 248, 0.6)', // Blue-400
        'rgba(139, 92, 246, 0.6)', // Violet-500
        'rgba(236, 72, 153, 0.6)', // Pink-500
        'rgba(16, 185, 129, 0.6)', // Emerald-500
      ],
      borderColor: [
        'rgba(56, 189, 248, 1)',
        'rgba(139, 92, 246, 1)',
        'rgba(236, 72, 153, 1)',
        'rgba(16, 185, 129, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const ReportsAnalyticsPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-blue-400">Reports & Analytics</h1>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Sales Report */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-3xl font-bold text-teal-400 mb-6">Sales Overview</h3>
          <div className="h-64"> {/* Chart container height */}
            {/* Placeholder for Sales Chart */}
            {/* <Bar data={salesData} options={{ responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Monthly Sales Trend' } } }} /> */}
            <div className="flex items-center justify-center h-full text-gray-500">
              [Placeholder for Sales Bar Chart]
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-gray-300">
            <p className="text-lg font-semibold">Total Revenue: <span className="text-white">$15,450.75</span></p>
            <p className="text-lg">Total Bookings: <span className="text-white">350</span></p>
            <p className="text-lg">Average Ticket Price: <span className="text-white">$12.50</span></p>
          </div>
        </div>

        {/* Occupancy Report */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-3xl font-bold text-purple-400 mb-6">Hall Occupancy</h3>
          <div className="h-64"> {/* Chart container height */}
            {/* Placeholder for Occupancy Chart */}
            {/* <Bar data={occupancyData} options={{ responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Average Hall Occupancy' } } }} /> */}
             <div className="flex items-center justify-center h-full text-gray-500">
              [Placeholder for Occupancy Bar Chart]
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-gray-300">
            <p className="text-lg font-semibold">Overall Occupancy: <span className="text-white">72%</span></p>
            <p className="text-lg">Halls Analyzed: <span className="text-white">4</span></p>
          </div>
        </div>
      </section>

      {/* Demand Insights */}
      <section className="bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
        <h3 className="text-3xl font-bold text-indigo-400 mb-6">Demand Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-lg font-semibold text-blue-400">Peak Day</p>
            <p className="text-2xl font-bold text-white">Saturday</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-green-400">Most Popular Genre</p>
            <p className="text-2xl font-bold text-white">Sci-Fi</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-pink-400">AI Recommendation Hit Rate</p>
            <p className="text-2xl font-bold text-white">92%</p>
          </div>
        </div>
      </section>

      {/* Table of recent activity */}
      <section className="bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto">
        <h3 className="text-3xl font-bold text-blue-400 mb-6">Recent Activity Log</h3>
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="border-b-2 border-gray-700 bg-gray-700">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Timestamp</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Action</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="hover:bg-gray-700 transition duration-200">
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{`2023-10-${28 - i} 10:${0 + i} AM`}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-green-400">Movie Added</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">Added 'Oppenheimer' to system.</td>
              </tr>
            ))}
            {[...Array(3)].map((_, i) => (
              <tr key={5+i} className="hover:bg-gray-700 transition duration-200">
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{`2023-10-${25 - i} 02:${0 + i} PM`}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-blue-400">Booking Cancelled</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">Booking #b3 cancelled by user.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ReportsAnalyticsPage;