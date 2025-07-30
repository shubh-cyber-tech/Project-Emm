const express = require('express');
const router = express.Router();
const { createBooking, getBookings, deleteBooking } = require('../controllers/bookingController');
const auth = require('../services/authMiddleware');

router.post('/', auth, createBooking);
router.get('/', auth, getBookings);
router.delete('/:id', auth, deleteBooking);

module.exports = router; 