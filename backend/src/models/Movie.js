// backend/src/models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    posterImage: { type: String, required: true },
    bannerImage: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    genre: { type: [String], required: true },
    rating: { type: String, default: 'PG' },
    releaseDate: { type: Date, required: true },
    director: { type: String, required: true },
    cast: { type: [String], required: true },
    trailerUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ['Now Showing', 'Coming Soon', 'Ended'], default: 'Now Showing' }
}, { timestamps: true });

module.exports = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
