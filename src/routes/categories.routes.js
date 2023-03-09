const {Router} = require("express");
const Categories = require("../models/categories.model");

const router = Router();

router.post("/api/v1/category", async (req, res) => {
    try {
        const newCategory = req.body;
        const result = await Categories.create(newCategory);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;