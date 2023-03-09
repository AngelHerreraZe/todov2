const Users = require('./users.model');
const Todos = require('./todos.model');
const Categories = require('./categories.model');

const initModels = () => {
    Users.hasMany(Todos, {foreignKey: "id"});
    Todos.belongsTo(Users, {foreignKey: "id"});

    Todos.hasMany(Categories, {foreignKey: 'id'})
    Categories.belongsTo(Todos, {foreignKey: 'id'})
}

module.exports = initModels;