// backend/src/controllers/movieController.js
const Movie = require('../models/Movie');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get featured movies
// @route   GET /api/movies/featured
// @access  Public
exports.getFeaturedMovies = async (req, res) => {
    try {
        const movies = await Movie.find({ isFeatured: true });
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a movie
// @route   POST /api/movies
// @access  Private/Admin
exports.createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.status(200).json({ success: true, message: 'Movie removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
