const express = require('express');
const { Building } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
    const buildings = await Building.findAll();
    res.json(buildings);
});

router.post('/', async (req, res) => {
    const { name, description } = req.body;
    const newBuilding = await Building.create({ name, description });
    res.json(newBuilding);
});

module.exports = router;
