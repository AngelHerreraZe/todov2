const {Router} = require("express");
const Users = require("../models/users.model");
const Todos = require("../models/todos.model");
const Categories = require("../models/categories.model");

const router = Router();

router.post("/api/v1/users", async (req, res) => {
    try {
        const newUser = req.body;
        const result = await Users.create(newUser);
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get("/api/v1/todos/user/:userId/todos", async (req, res) => {
    const {userId} = req.params;

    try {
        const result = await Todos.findAll({
            where: {createdBy: userId},
            include: [{
                model: Categories,
                attributes: ['name']
            }]
        })
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
});

router.get("/api/v1/users/", async (req, res) => {
    try {
        const result = await Users.findAll({
            attributes: {
                exclude: ["password", "id", "createdAt"]
            }
        }
        );
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router;