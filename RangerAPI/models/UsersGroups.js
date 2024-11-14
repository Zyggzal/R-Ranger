const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const UsersGroups = sequelize.define('UsersGroups', 
{
    role: {
        type: DataTypes.STRING,
        defaultValue: "member"
    }
},
{
    tableName: 'users_groups'
});

module.exports = UsersGroups;