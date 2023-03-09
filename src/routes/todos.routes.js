const {Router} = require("express");
const Todos = require("../models/todos.model");
const Categories = require("../models/categories.model");
const Users = require("../models/users.model");


const router = Router();

router.get("/api/v1/todos", async (req, res)=> {
    try {
        const results = await Todos.findAll({
            attributes: {exclude: []},
            include: [{
                model: Categories,
                attributes: ["id","name"],
            }, 
            {
                model: Users,
                attributes: ["id", "username"]
            }]  
        });
        res.json(results);
    } catch (error) {
        res.status(400).json(error)
    }
});


router.post('/api/v1/user/:userId/category/:categoryId/todos', async (req, res) => {
    try {
        const {userId, categoryId} = req.params;
        const {id, title, description, status} = req.body;
        const result = await Todos.create({
            id,
            title,
            description,
            status,
            idCategory: categoryId,
            createdBy: userId
        }   
        );
        res.json(result);
    } catch (error) {
        res.status(400).json(error)
    }
})

router.put('/api/v1/todos/:userId/todo/:todoId', async (req, res) => {
    const {userId, todoId} = req.params;
    const {status} = req.body;

    try {
        Todos.update({status},
            {where: {id: todoId, userId: userId}})
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;