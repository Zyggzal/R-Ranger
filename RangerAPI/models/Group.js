const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Group = sequelize.define('Group', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    tableName: 'groups'
});

module.exports = Group;