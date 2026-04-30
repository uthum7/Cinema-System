// backend/src/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const {
    createBooking,
    getMyBookings,
    getBookings,
    getBookingById,
    updateBookingStatus
} = require('../controllers/bookingController');
const { protect, admin } = require('../utils/authMiddleware');

// User routes
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/:id', protect, getBookingById);

// Admin routes
router.get('/', protect, admin, getBookings);
router.put('/:id', protect, admin, updateBookingStatus);

module.exports = router;
