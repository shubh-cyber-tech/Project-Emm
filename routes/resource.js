const express = require('express');
const router = express.Router();
const { getResources, addResource } = require('../controllers/resourceController');
const auth = require('../services/authMiddleware');

router.get('/', getResources);
router.post('/', auth, addResource);

module.exports = router; 