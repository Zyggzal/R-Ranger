const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Invite = sequelize.define('Invite', {
    status: {
        type: DataTypes.STRING,
        defaultValue: false
    },
},
{
    tableName: 'invites'
});

module.exports = Invite;