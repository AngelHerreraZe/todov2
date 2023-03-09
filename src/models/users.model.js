const {DataTypes} = require('sequelize');
const db = require('../utils/database');

const Users = db.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},{
    timestamps: true,
    updatedAt: false
});

module.exports = Users;