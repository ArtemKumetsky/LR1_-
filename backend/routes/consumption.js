const express = require('express');
const { Consumption, Resource, Building } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
    const consumption = await Consumption.findAll({
        include: [Resource, Building],
    });
    res.json(consumption);
});

router.post('/', async (req, res) => {
    const { resourceId, buildingId, equipmentId, month, year, amount } = req.body;

    // Розрахунок вартості
    const resource = await Resource.findByPk(resourceId);
    if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
    }
    const cost = resource.price * amount;

    const newConsumption = await Consumption.create({
        resourceId,
        buildingId,
        equipmentId,
        month,
        year,
        amount,
        cost,
    });
    res.json(newConsumption);
});

module.exports = router;
