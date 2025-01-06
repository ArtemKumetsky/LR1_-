const express = require('express');
const { Resource } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
    const resources = await Resource.findAll();
    res.json(resources);
});

router.post('/', async (req, res) => {
    const { name, unit, price } = req.body;
    const newResource = await Resource.create({ name, unit, price });
    res.json(newResource);
});

module.exports = router;
