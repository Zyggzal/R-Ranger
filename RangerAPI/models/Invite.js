const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Invite = sequelize.define('Invite', {
    isAccepted: {
        type: DataTypes.BOOLEAN,
    }
},
{
    tableName: 'invites'
});

module.exports = Invite;