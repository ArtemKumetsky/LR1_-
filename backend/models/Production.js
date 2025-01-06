const { DataTypes } = require('sequelize');
const { Building, Equipment } = require('./index');
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
    equipmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Equipment,
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
});

module.exports = Production;