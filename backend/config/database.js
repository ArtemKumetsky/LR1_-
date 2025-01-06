const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lr1', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
