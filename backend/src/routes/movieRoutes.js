// backend/src/routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const {
    getMovies,
    getFeaturedMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movieController');
const { protect, admin } = require('../utils/authMiddleware');

router.get('/', getMovies);
router.get('/featured', getFeaturedMovies);
router.get('/:id', getMovieById);

// Admin routes
router.post('/', protect, admin, createMovie);
router.put('/:id', protect, admin, updateMovie);
router.delete('/:id', protect, admin, deleteMovie);

module.exports = router;
