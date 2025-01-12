const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myapp', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
