const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Invite = sequelize.define('Invite', {
    status: {
        type: DataTypes.STRING,
        defaultValue: "sent"
    }
},
{
    tableName: 'invites'
});

module.exports = Invite;