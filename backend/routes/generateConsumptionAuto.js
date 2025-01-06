const express = require('express');
const { Equipment, Building, Resource, Consumption } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const buildings = await Building.findAll();
        const equipment = await Equipment.findAll();
        const resources = await Resource.findAll();

        // Межі для генерації обсягів споживання
        const MIN_CONSUMPTION = 10;
        const MAX_CONSUMPTION = 100;

        const consumptions = [];

        // Генерація споживання для будівель
        for (const building of buildings) {
            for (const resource of resources) {
                const consumptionValue = Math.floor(Math.random() * (MAX_CONSUMPTION - MIN_CONSUMPTION + 1) + MIN_CONSUMPTION);
                consumptions.push({
                    buildingId: building.id,
                    resourceId: resource.id,
                    consumption: consumptionValue,
                });
            }
        }

        // Генерація споживання для обладнання
        for (const equip of equipment) {
            for (const resource of resources) {
                const consumptionValue = Math.floor(Math.random() * (MAX_CONSUMPTION - MIN_CONSUMPTION + 1) + MIN_CONSUMPTION);
                consumptions.push({
                    equipmentId: equip.id,
                    resourceId: resource.id,
                    consumption: consumptionValue,
                });
            }
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
