const express = require('express');
const { Equipment } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
    const equipment = await Equipment.findAll();
    res.json(equipment);
});

router.post('/', async (req, res) => {
    const { buildingId, name, type, description } = req.body;
    const newEquipment = await Equipment.create({ buildingId, name, type, description });
    res.json(newEquipment);
});

module.exports = router;
