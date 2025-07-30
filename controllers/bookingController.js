const Booking = require('../models/Booking');
const Resource = require('../models/Resource');
const sendEmail = require('../services/emailService');

exports.createBooking = async (req, res) => {
    try {
        const { resourceId, slot } = req.body;
        const booking = new Booking({ user: req.user.id, resource: resourceId, slot, paid: true });
        await booking.save();
        await sendEmail(req.user.email, 'Booking Confirmed', `Your booking for slot ${slot} is confirmed.`);
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('resource');
        res.json(bookings);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking cancelled' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}; 