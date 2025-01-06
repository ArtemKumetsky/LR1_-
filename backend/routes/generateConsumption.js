const express = require('express');
const { Consumption } = require('../models');
const router = express.Router();

router.put('/consumption/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { consumption } = req.body;

        // Оновлення запису
        const updatedConsumption = await Consumption.update(
            { consumption },
            { where: { id } }
        );

        if (updatedConsumption[0] === 0) {
            return res.status(404).json({ error: 'Запис не знайдено!' });
        }

        res.status(200).json({ message: 'Споживання оновлено успішно!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка при оновленні споживання' });
    }
});

module.exports = router;
