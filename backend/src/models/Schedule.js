// backend/src/models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    movieTitle: { type: String, required: true }, // For redundancy
    cinemaHall: { type: String, required: true },
    date: { type: Date, required: true }, // Date only (YYYY-MM-DD)
    times: [{
        time: { type: String, required: true }, // e.g., "10:00 AM"
        status: { type: String, enum: ['Available', 'Almost Full', 'Sold Out'], default: 'Available' }
    }]
}, { timestamps: true });

module.exports = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);
