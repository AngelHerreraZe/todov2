const {DataTypes} = require('sequelize');
const db = require('../utils/database');

const Todos = db.define("todos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false 
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    idCategory: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_category"
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "created_by"
    }
},{
    timestamps: true,
    updatedAt: false
});

module.exports = Todos;