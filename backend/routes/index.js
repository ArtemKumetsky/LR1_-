const express = require('express');
const buildingsRouter = require('./buildings');
const resourcesRouter = require('./resources');
const equipmentRouter = require('./equipment');
const consumptionRouter = require('./consumption');
const productionRouter = require('./production');

const router = express.Router();

router.use('/buildings', buildingsRouter);
router.use('/resources', resourcesRouter);
router.use('/equipment', equipmentRouter);
router.use('/consumption', consumptionRouter);
router.use('/production', productionRouter);

module.exports = router;
