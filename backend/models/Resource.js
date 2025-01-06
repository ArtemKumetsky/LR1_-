const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resource = sequelize.define('Resource', {
    name: { type: DataTypes.STRING, allowNull: false },
    unit: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },

}, {timestamps: false});

module.exports = Resource;