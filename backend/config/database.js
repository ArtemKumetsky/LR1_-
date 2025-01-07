const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lr1', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
