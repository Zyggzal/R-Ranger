const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('RangerDB','sa', '12345', {
    host: 'STOPER54',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
            trusted: true,
        }
    },
});

module.exports = sequelize;