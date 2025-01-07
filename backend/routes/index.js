const express = require('express');
const buildingsRouter = require('./buildings');
const resourcesRouter = require('./resources');
const consumptionRouter = require('./consumption');
const productionRouter = require('./production');
const generateConsumptionRouter = require('./generateConsumptionAuto');
const generateProductionRouter = require('./generateProductionAuto');

const router = express.Router();

router.use('/buildings', buildingsRouter);
router.use('/resources', resourcesRouter);
router.use('/consumption', consumptionRouter);
router.use('/production', productionRouter);
router.use('/generateCons', generateConsumptionRouter);
router.use('/generateProd', generateProductionRouter);

module.exports = router;
