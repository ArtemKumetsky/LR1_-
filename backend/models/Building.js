const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Building = sequelize.define('Building', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
}, { timestamps: false });

module.exports = Building;
