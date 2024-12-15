const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Invite = sequelize.define('Invite', {
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    // type: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // role: {
    //     type: DataTypes.STRING,
    //     defaultValue: "member"
    // }
},
{
    tableName: 'invites'
});

module.exports = Invite;