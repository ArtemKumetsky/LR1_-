const express = require('express');
const { Building, Resource, Consumption } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const buildings = await Building.findAll();
        const resources = await Resource.findAll();

        // Межі для генерації обсягів споживання
        const MIN_CONSUMPTION = 100;
        const MAX_CONSUMPTION = 12000;

        const consumptions = [];

        let month = 1
        // Генерація споживання для будівель

        while (month <= 12) {
            for (const building of buildings) {
                for (const resource of resources) {
                    const consumptionValue = Math.floor(Math.random() * (MAX_CONSUMPTION - MIN_CONSUMPTION + 1) + MIN_CONSUMPTION);
                    const tariff = Math.random() * 10
                    consumptions.push({
                        buildingId: building.id,
                        resourceId: resource.id,
                        amount: consumptionValue,
                        month: month,
                        tariff: tariff,
                        cost: tariff * consumptionValue,
                    });
                }
            }
            month += 1;
        }

        // Масове створення записів
        await Consumption.bulkCreate(consumptions);

        res.status(200).json({ message: 'Споживання ресурсів згенеровано успішно!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка при генерації споживання ресурсів' });
    }
});

module.exports = router;
