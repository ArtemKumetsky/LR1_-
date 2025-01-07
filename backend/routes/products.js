const express = require('express');
const { Products } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        const products = await Products.create({
            name,
        });

        res.status(201).json({ message: 'Продукт додано успішно!', products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка при додаванні продукту' });
    }
});

module.exports = router;
