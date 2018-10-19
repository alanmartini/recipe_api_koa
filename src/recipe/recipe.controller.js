const axios = require('axios');
const GiphyController = require('../giphy/giphy.controller');

const RecipeController = {
  async getCompleteList(ctx) {
    const ingredients = ctx.query.i;

    if (!ingredients) {
      ctx.throw(400, 'Ingredients required with GET /recipes/i?ingredient1,ingredient2');
    } else {
      const arrIngredients = RecipeController.prepareIngredients(ingredients);

      if (arrIngredients.length > 3) ctx.throw(500, 'The maximum number of ingredients is 3');

      const listRecipes = await RecipeController.getFormattedRecipes(ingredients);
      const data = await GiphyController.getGifByRecipe(listRecipes);
      ctx.body = { keywords: arrIngredients, recipes: data };
    }
  },
  async getFormattedRecipes(ingredients) {
    const listRecipes = await RecipeController.getRecipes(ingredients);

    if (!listRecipes.data) return [];

    return listRecipes.data.results.map(receita => (
      {
        titulo: receita.title.trim(),
        ingredients: RecipeController.prepareIngredients(receita.ingredients),
        link: receita.href,
      }));
  },
  async getRecipes(ingredients) {
    try {
      return await axios.get(`http://recipepuppy.com/api/?i=${ingredients}`);
    } catch (error) {
      return error;
    }
  },
  prepareIngredients(ingredients) {
    return ingredients.split(',').map(item => item.trim()).sort();
  },
};

module.exports = RecipeController;
