const {DataTypes} = require('sequelize');
const db = require('../utils/database');

const Categories = db.define("categories", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

module.exports = Categories;