const Recipe = require('../models/recipeModel')

const getRecipes = async (req, res) => {
    const recipes = await Recipe.find();

    res.json(recipes);
};

const createRecipe = async (req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field') // TODO: setup seperate error handler?
    }

    const recipe = await Recipe.create({
        text: req.body.text // TODO: change to accept recipe json instead of just text
    });

    res.json(recipe);
};

const updateRecipe = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if(!recipe) {
        res.status(400);
        throw new Error('Recipe not found'); // TODO: prevent crashing when id doesn't exist
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if(!recipe) {
        res.status(400);
        throw new Error('Recipe not found'); // TODO: prevent crashing when id doesn't exist
    }

    await recipe.remove();

    res.json({
        id: req.params.id
    });
};

module.exports = {
    getRecipes, 
    createRecipe, 
    updateRecipe,
    deleteRecipe,
};