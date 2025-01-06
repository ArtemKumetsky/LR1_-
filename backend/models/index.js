const sequelize = require('../config/database');
const Building = require('./Building');
const Equipment = require('./Equipment');
const Resource = require('./Resource');
const Consumption = require('./Consumption');
const Production = require('./Production');

// Associations
Building.hasMany(Equipment, { foreignKey: 'buildingId' });
Equipment.belongsTo(Building, { foreignKey: 'buildingId' });

Resource.hasMany(Consumption, { foreignKey: 'resourceId' });
Consumption.belongsTo(Resource, { foreignKey: 'resourceId' });

Building.hasMany(Consumption, { foreignKey: 'buildingId' });
Consumption.belongsTo(Building, { foreignKey: 'buildingId' });

Equipment.hasMany(Consumption, { foreignKey: 'equipmentId' });
Consumption.belongsTo(Equipment, { foreignKey: 'equipmentId' });

Building.hasMany(Production, { foreignKey: 'buildingId' });
Equipment.hasMany(Production, { foreignKey: 'equipmentId' });
Production.belongsTo(Building, { foreignKey: 'buildingId' });
Production.belongsTo(Equipment, { foreignKey: 'equipmentId' });

module.exports = { sequelize, Building, Equipment, Resource, Consumption, Production };
