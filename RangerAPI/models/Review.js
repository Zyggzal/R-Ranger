const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Review = sequelize.define('Review', {
    rating: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
    }
},
{
    tableName: 'reviews'
});

module.exports = Review;