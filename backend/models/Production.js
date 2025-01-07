const { DataTypes } = require('sequelize');
const { Building } = require('./index');
const sequelize = require('../config/database');

const Production = sequelize.define('Production', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    buildingId: {
        type: DataTypes.INTEGER,
        references: {
            model: Building,
            key: 'id',
        },
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productionVolume: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {timestamps: false});

module.exports = Production;