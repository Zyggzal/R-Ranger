const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('RangerDB','sa', '12345', {
    host: 'HOME-PC\\VALERASSQL',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
            trusted: true,
        }
    },
});

module.exports = sequelize;