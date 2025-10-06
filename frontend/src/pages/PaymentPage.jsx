// frontend/src/pages/PaymentPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, CheckCircle, Film, Calendar, Clock, MapPin, Ticket, ArrowLeft, Loader } from 'lucide-react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingDetails] = useState({
    movie: 'Inception',
    showtime: '2023-10-27 14:00',
    hall: 'Hall A',
    seats: ['A5', 'A6'],
    total: 25.00,
    bookingId: 'MOCK12345XYZ',
  });

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const renderCreditCardForm = () => (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
        <input 
          type="text" 
          className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500" 
          placeholder="1234 5678 9012 3456" 
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
          <input 
            type="text" 
            className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500" 
            placeholder="MM/YY" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
          <input 
            type="text" 
            className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500" 
            placeholder="123" 
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Card Holder Name</label>
        <input 
          type="text" 
          className="w-full p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500" 
          placeholder="Your Name" 
        />
      </div>
    </>
  );

  const renderPayHereForm = () => (
    <div className="text-center py-10">
      <div className="w-20 h-20 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center">
        <CreditCard className="w-10 h-10 text-blue-400" />
      </div>
      <p className="text-gray-300 mb-6">You will be redirected to PayHere to complete your payment securely.</p>
      <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
        Go to PayHere
      </button>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero Header */}
      <div className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-emerald-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-64 h-64 bg-green-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-emerald-600 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <Link to="/booking" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Booking</span>
          </Link>
          <h1 className="text-5xl md:text-6xl font-black">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Payment & Confirmation
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {!paymentSuccess ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold mb-6 flex items-center space-x-2">
                <CreditCard className="w-8 h-8 text-purple-400" />
                <span>Payment Details</span>
              </h2>

              {/* Payment Method Selection */}
              <div className="flex space-x-4 mb-8">
                <button
                  className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    paymentMethod === 'creditCard'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setPaymentMethod('creditCard')}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-2" />
                  Credit/Debit Card
                </button>
                <button
                  className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    paymentMethod === 'payhere'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/50'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setPaymentMethod('payhere')}
                >
                  PayHere
                </button>
              </div>

              {/* Payment Forms */}
              <form onSubmit={handlePaymentSubmit}>
                {paymentMethod === 'creditCard' && renderCreditCardForm()}
                {paymentMethod === 'payhere' && renderPayHereForm()}

                {paymentMethod !== 'payhere' && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-lg shadow-lg shadow-green-500/50 hover:shadow-green-500/80 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Confirm & Pay</span>
                      </>
                    )}
                  </button>
                )}
              </form>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center space-x-2 text-gray-400 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
                <span>Secure payment powered by industry-standard encryption</span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 h-fit sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Film className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-sm">Movie</p>
                    <p className="text-white font-semibold">{bookingDetails.movie}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-sm">Date & Time</p>
                    <p className="text-white font-semibold">{bookingDetails.showtime}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-sm">Hall</p>
                    <p className="text-white font-semibold">{bookingDetails.hall}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Ticket className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-sm">Seats</p>
                    <p className="text-white font-semibold">{bookingDetails.seats.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    ${bookingDetails.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Payment Success Screen
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-white/10 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mb-6 shadow-2xl shadow-green-500/50">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Payment Successful!
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Your tickets have been booked successfully
              </p>

              {/* QR Code */}
              <div className="inline-block bg-white p-6 rounded-2xl mb-8">
                <img 
                  src={`https://picsum.photos/seed/qr${bookingDetails.bookingId}/200/200`} 
                  alt="QR Code" 
                  className="rounded-xl"
                />
                <p className="mt-3 text-sm text-gray-600 font-semibold">Scan at cinema entrance</p>
              </div>

              {/* Booking Details */}
              <div className="bg-black/40 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
                <p className="flex justify-between text-gray-400 mb-2">
                  <span>Booking ID:</span>
                  <span className="text-white font-bold">{bookingDetails.bookingId}</span>
                </p>
                <p className="flex justify-between text-gray-400 mb-2">
                  <span>Movie:</span>
                  <span className="text-white font-semibold">{bookingDetails.movie}</span>
                </p>
                <p className="flex justify-between text-gray-400 mb-2">
                  <span>Showtime:</span>
                  <span className="text-white font-semibold">{bookingDetails.showtime}</span>
                </p>
                <p className="flex justify-between text-gray-400 mb-2">
                  <span>Seats:</span>
                  <span className="text-white font-semibold">{bookingDetails.seats.join(', ')}</span>
                </p>
                <div className="border-t border-white/10 mt-4 pt-4">
                  <p className="flex justify-between text-lg font-bold">
                    <span>Total Paid:</span>
                    <span className="text-green-400">${bookingDetails.total.toFixed(2)}</span>
                  </p>
                </div>
              </div>

              <Link 
                to="/" 
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 hover:scale-105"
              >
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;