const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Products = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
}, {timestamps: false});

module.exports = Products;