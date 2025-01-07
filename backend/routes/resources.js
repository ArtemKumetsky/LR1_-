const express = require('express');
const { Resource } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
    const resources = await Resource.findAll();
    res.json(resources);
});

router.post('/', async (req, res) => {
    const { name, unit} = req.body;
    const newResource = await Resource.create({ name, unit});
    res.json(newResource);
});

module.exports = router;
