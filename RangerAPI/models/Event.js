const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Event = sequelize.define('Event', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicDescription: {
        type: DataTypes.TEXT,
    },
    privateDescription: {
        type: DataTypes.TEXT,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    signUpEndDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    eventType: {
        type: DataTypes.STRING,
        defaultValue: 'public'    
    }
},
{
    tableName: 'events'
});

module.exports = Event;