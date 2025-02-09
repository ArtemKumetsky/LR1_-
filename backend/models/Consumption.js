const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Consumption = sequelize.define('Consumption', {
    resourceId: { type: DataTypes.INTEGER, allowNull: false },
    buildingId: { type: DataTypes.INTEGER },
    month: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    tariff: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },

}, {timestamps: false});

module.exports = Consumption;