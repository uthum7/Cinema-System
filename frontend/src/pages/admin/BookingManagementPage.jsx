// frontend/src/pages/admin/BookingManagementPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Dummy data for bookings
const initialBookings = [
  { id: 'b1', userId: 'u101', movieId: 'm1', movieTitle: 'Inception', showtime: '2023-10-27 14:00', seats: 'A5, A6', total: 25.00, status: 'Confirmed', paymentStatus: 'Paid', bookingDate: '2023-10-26' },
  { id: 'b2', userId: 'u102', movieId: 'm2', movieTitle: 'The Dark Knight', showtime: '2023-10-27 15:00', seats: 'B2, B3', total: 25.00, status: 'Confirmed', paymentStatus: 'Paid', bookingDate: '2023-10-26' },
  { id: 'b3', userId: 'u103', movieId: 'm3', movieTitle: 'Interstellar', showtime: '2023-10-28 11:00', seats: 'C10, C11, C12', total: 37.50, status: 'Pending Refund', paymentStatus: 'Refunded', bookingDate: '2023-10-27' },
  { id: 'b4', userId: 'u101', movieId: 'm4', movieTitle: 'Dune', showtime: '2023-10-28 13:00', seats: 'D1, D2', total: 25.00, status: 'Completed', paymentStatus: 'Paid', bookingDate: '2023-10-27' },
  { id: 'b5', userId: 'u104', movieId: 'm5', movieTitle: 'Oppenheimer', showtime: '2023-10-28 20:00', seats: 'E3', total: 12.50, status: 'Confirmed', paymentStatus: 'Paid', bookingDate: '2023-10-28' },
];

const BookingManagementPage = () => {
  const [bookings, setBookings] = useState(initialBookings);

  const handleApproveRefund = (bookingId) => {
    if (window.confirm('Are you sure you want to process the refund for this booking?')) {
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'Refunded', paymentStatus: 'Refunded' } : booking
      ));
      alert('Refund processed successfully!');
    }
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'Cancelled', paymentStatus: 'Cancelled' } : booking
      ));
      alert('Booking cancelled!');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-blue-400">Bookings Management</h1>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="border-b-2 border-gray-700 bg-gray-700">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Booking ID</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">User ID</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Movie</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Showtime</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Seats</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Total</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Payment</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} className={`hover:bg-gray-700 transition duration-200 ${booking.status === 'Cancelled' ? 'bg-gray-800/50 text-gray-500' : ''}`}>
                <td className="px-5 py-4 whitespace-nowrap text-sm">{booking.id}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{booking.userId}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm flex items-center space-x-3">
                  <img src={booking.moviePoster || `https://picsum.photos/seed/${booking.movieTitle.toLowerCase()}/50/75`} alt={booking.movieTitle} className="w-12 h-16 object-cover rounded-md"/>
                  <span>{booking.movieTitle}</span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{booking.showtime}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">{booking.seats}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-green-400">${booking.total.toFixed(2)}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 font-semibold rounded-full 
                    ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                      booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      booking.status === 'Pending Refund' ? 'bg-yellow-100 text-yellow-700' : ''
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                   <span className={`px-2 py-1 font-semibold rounded-full 
                    ${booking.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                      booking.paymentStatus === 'Refunded' ? 'bg-blue-100 text-blue-700' :
                      booking.paymentStatus === 'Cancelled' ? 'bg-red-100 text-red-700' : ''
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm space-x-2">
                  {booking.status === 'Pending Refund' && (
                    <button
                      onClick={() => handleApproveRefund(booking.id)}
                      className="text-purple-400 hover:text-purple-300 mr-2"
                    >
                      Refund
                    </button>
                  )}
                  {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagementPage;