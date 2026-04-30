// backend/src/controllers/scheduleController.js
const Schedule = require('../models/Schedule');

// @desc    Get all schedules
// @route   GET /api/schedules
// @access  Public
exports.getSchedules = async (req, res) => {
    try {
        const { movieId, date } = req.query;
        let query = {};
        if (movieId) query.movieId = movieId;
        if (date) query.date = new Date(date);

        const schedules = await Schedule.find(query).populate('movieId', 'title posterImage');
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get schedule by ID
// @route   GET /api/schedules/:id
// @access  Public
exports.getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id).populate('movieId', 'title posterImage');
        if (!schedule) {
            return res.status(404).json({ success: false, message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a schedule
// @route   POST /api/schedules
// @access  Private/Admin
exports.createSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.create(req.body);
        res.status(201).json(schedule);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update a schedule
// @route   PUT /api/schedules/:id
// @access  Private/Admin
exports.updateSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!schedule) {
            return res.status(404).json({ success: false, message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a schedule
// @route   DELETE /api/schedules/:id
// @access  Private/Admin
exports.deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!schedule) {
            return res.status(404).json({ success: false, message: 'Schedule not found' });
        }
        res.status(200).json({ success: true, message: 'Schedule removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
