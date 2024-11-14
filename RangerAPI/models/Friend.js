const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Friend = sequelize.define('Friend', {
    status: {
        type: DataTypes.STRING,
        defaultValue: "invited"
    }
},
{
    tableName: 'friends'
});

module.exports = Friend;