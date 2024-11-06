const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Invite = sequelize.define('Invite', {
    isAccepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    tableName: 'invites'
});

module.exports = Invite;