const sequelize = require('../config/database')

const UsersGroups = sequelize.define('UsersGroups', { },
{
    tableName: 'users_groups'
});

module.exports = UsersGroups;