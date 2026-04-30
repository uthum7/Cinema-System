// backend/src/controllers/bookingController.js
const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
    try {
        const {
            scheduleId,
            movieTitle,
            cinemaHall,
            datetime,
            seats,
            totalAmount
        } = req.body;

        const booking = await Booking.create({
            user: req.user.id,
            schedule: scheduleId,
            movieTitle,
            cinemaHall,
            datetime,
            seats,
            totalAmount
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('schedule');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user', 'name email').populate('schedule');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user', 'name email').populate('schedule');

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // Check ownership or admin status
        if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private/Admin
exports.updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
