const {Router} = require("express");
const Todos = require("../models/todos.model");
const Categories = require("../models/categories.model");
const Users = require("../models/users.model");


const router = Router();

router.get("/api/v1/todos", async (req, res)=> {
    try {
        const results = await Todos.findAll({
            attributes: {exclude: ["id", "idCategory", "createdBy", "createdAt"]},
            include: [{
                model: Categories,
                attributes: ["name"],
            }, 
            {
                model: Users,
                attributes: ["username"]
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
        const result = await Todos.update({status},
            {where: {id: todoId, createdBy: userId}})
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete("/api/v1/todos/:todoId", async (req, res) => {
    const {todoId} = req.params;

    try {
        const result = await Todos.destroy({
            where: {
                id: todoId
            }
        })
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;