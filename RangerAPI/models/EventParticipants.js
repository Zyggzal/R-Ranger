const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const EventParticipants = sequelize.define('EventParticipants', {
    role: {
        type: DataTypes.STRING,
        defaultValue: "participant"
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "invited"
    }
},
{
    tableName: 'event_participants'
});

module.exports = EventParticipants;