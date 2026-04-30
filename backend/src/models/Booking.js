// backend/src/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true },
    movieTitle: { type: String, required: true },
    cinemaHall: { type: String, required: true },
    datetime: { type: Date, required: true },
    seats: { type: [String], required: true }, // e.g., ["A1", "A2"]
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    bookingStatus: { type: String, enum: ['Confirmed', 'Cancelled', 'Attended'], default: 'Confirmed' }
}, { timestamps: true });

module.exports = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
