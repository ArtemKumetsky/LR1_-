const express = require('express');
const { Building, Products, Production} = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const buildings = await Building.findAll();
        const products = await Products.findAll();

        // Межі для генерації обсягів споживання
        const MIN_CONSUMPTION = 0;
        const MAX_CONSUMPTION = 120;

        const production = [];

        // Генерація споживання для будівель
        for (const building of buildings) {
            for (const product of products) {
                const productsValue = Math.floor(Math.random() * (MAX_CONSUMPTION - MIN_CONSUMPTION + 1) + MIN_CONSUMPTION);
                production.push({
                    buildingId: building.id,
                    productName: product.name,
                    productionVolume: productsValue,
                });
            }
        }

        // Масове створення записів
        await Production.bulkCreate(production);

        res.status(200).json({ message: 'Споживання ресурсів згенеровано успішно!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка при генерації споживання ресурсів' });
    }
});

module.exports = router;
