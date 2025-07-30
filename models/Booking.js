const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resource: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },
    slot: String,
    paid: { type: Boolean, default: false }
});

module.exports = mongoose.model('Booking', bookingSchema); 