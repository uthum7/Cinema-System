// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Import page components
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import SchedulePage from './pages/SchedulePage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import UserAccountPage from './pages/UserAccountPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Import admin page components
import AdminDashboardPage from './pages/admin/DashboardPage';
import MoviesManagementPage from './pages/admin/MoviesManagementPage';
import ScheduleManagementPage from './pages/admin/ScheduleManagementPage';
import BookingManagementPage from './pages/admin/BookingManagementPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import ReportsAnalyticsPage from './pages/admin/ReportsAnalyticsPage';

// Import layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Ensure Tailwind CSS is configured and imported in index.css

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/booking/:showtimeId" element={<BookingPage />} />

            {/* Authentication Routes */}
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboardPage />} /> {/* Main admin landing */}
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/movies" element={<MoviesManagementPage />} />
            <Route path="/admin/schedule" element={<ScheduleManagementPage />} />
            <Route path="/admin/bookings" element={<BookingManagementPage />} />
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/reports" element={<ReportsAnalyticsPage />} />

            {/* Protected Routes (Client Side) - would require auth check */}
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/account" element={<UserAccountPage />} />

            {/* Catch-all for 404 Not Found */}
            <Route path="*" element={
              <div className="container mx-auto text-center py-20">
                <h1 className="text-5xl font-extrabold text-blue-400 mb-6">404</h1>
                <p className="text-2xl text-gray-300 mb-8">Page Not Found</p>
                <Link to="/" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 text-lg">
                  Go to Home
                </Link>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;