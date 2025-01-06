const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipment = sequelize.define('Equipment', {
    name: { type: DataTypes.STRING, allowNull: false },
    buildingId: { type: DataTypes.INTEGER, allowNull: false },

}, {timestamps: false});

module.exports = Equipment;
