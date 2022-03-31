const express = require("express");

// recipeRoutes is an instance of the express router.
// We use it to define our routes.
const recipeRoutes = express.Router();
const {
    getRecipes, 
    createRecipe, 
    updateRecipe,
    deleteRecipe,
} = require("../controllers/recipeController");


recipeRoutes.route("/").get(getRecipes);

recipeRoutes.route("/").post(createRecipe);

recipeRoutes.route("/:id").put(updateRecipe);

recipeRoutes.route("/:id").delete(deleteRecipe);

module.exports = recipeRoutes;