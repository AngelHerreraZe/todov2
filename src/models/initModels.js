const Users = require('./users.model');
const Todos = require('./todos.model');
const Categories = require('./categories.model');

const initModels = () => {
    Categories.hasMany(Todos, {foreignKey: 'idCategory'});
    Todos.belongsTo(Categories, {foreignKey: 'idCategory'})

    Users.hasMany(Todos,{foreignKey: "createdBy"});
    Todos.belongsTo(Users, {foreignKey: "createdBy"});
}

module.exports = initModels;