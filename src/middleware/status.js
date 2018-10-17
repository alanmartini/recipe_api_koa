const RecipeController = require('./../recipe/recipe.controller');
const GiphyController = require('./../giphy/giphy.controller');

/**
 * Middleware to check status
 *
 * @return {onerror}
 */
const StatusMiddleware = async () => {
    var recipes = await RecipeController.getRecipes();
    var gifs = await GiphyController.getGif();
    console.log('validate', recipes);
    console.log('validate2', gifs);
};

module.exports = StatusMiddleware;