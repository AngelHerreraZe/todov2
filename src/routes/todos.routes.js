const {Router} = require("express");
const Todos = require("../models/todos.model");
const Categories = require("../models/categories.model");


const router = Router();

router.get("/api/v1/todos", async (req, res)=> {
    try {
        const results = await Todos.findAll({
            attributes: {exclude: ['id', 'idCategory', 'createdAt']},
            include: {
                model: Categories,
                attributes: ["name"]
            }
        });
        res.json(results);
    } catch (error) {
        res.status(400).json(error)
    }
});


router.post('/api/v1/todos', async (req, res) => {
    try {
        const newTodo = req.body;
        const result = await Todos.create(newTodo);
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
        
    }
})

module.exports = router;