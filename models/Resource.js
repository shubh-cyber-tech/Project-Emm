const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    name: String,
    description: String,
    availableSlots: [String] // e.g. ["2024-06-01T10:00", "2024-06-01T11:00"]
});

module.exports = mongoose.model('Resource', resourceSchema); 