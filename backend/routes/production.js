const express = require('express');
const { Production } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { buildingId, productName, productionVolume, month } = req.body;

        const production = await Production.create({
            buildingId,
            productName,
            productionVolume,
            month
        });

        res.status(201).json({ message: 'Обсяг виробництва додано успішно!', production });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка при додаванні виробництва' });
    }
});

module.exports = router;
