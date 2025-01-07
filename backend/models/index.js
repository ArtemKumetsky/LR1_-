const sequelize = require('../config/database');
const Building = require('./Building');
const Resource = require('./Resource');
const Consumption = require('./Consumption');
const Production = require('./Production');
const Products = require('./Products');


// Associations
Resource.hasMany(Consumption, { foreignKey: 'resourceId' });
Consumption.belongsTo(Resource, { foreignKey: 'resourceId' });

Building.hasMany(Consumption, { foreignKey: 'buildingId' });
Consumption.belongsTo(Building, { foreignKey: 'buildingId' });

Building.hasMany(Production, { foreignKey: 'buildingId' });
Production.belongsTo(Building, { foreignKey: 'buildingId' });

module.exports = { sequelize, Building, Resource, Consumption, Production, Products };
