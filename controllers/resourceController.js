const Resource = require('../models/Resource');

exports.getResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.addResource = async (req, res) => {
    try {
        const { name, description, availableSlots } = req.body;
        const resource = new Resource({ name, description, availableSlots });
        await resource.save();
        res.status(201).json(resource);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}; 