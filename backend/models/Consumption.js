const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Consumption = sequelize.define('Consumption', {
    resourceId: { type: DataTypes.INTEGER, allowNull: false },
    buildingId: { type: DataTypes.INTEGER },
    equipmentId: { type: DataTypes.INTEGER },
    month: { type: DataTypes.INTEGER, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },

}, {timestamps: false});

module.exports = Consumption;