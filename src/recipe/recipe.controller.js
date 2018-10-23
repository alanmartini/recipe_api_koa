const { Env } = require('./../../config/');
const axios = require('axios');
const GiphyController = require('../giphy/giphy.controller');

const RecipeController = {
  /**
    * @api {get} /recipes/?i={ingredient1},{ingredient2},{ingredient3} Search for recipes with Gifs
    * @apiName RecipesWithGifs
    * @apiGroup Recipes
    *
    * @apiParam {string} i Recipe ingredients, separated with comma.
    *
    * @apiVersion 1.0.0
    *
    * @apiSuccess {array} keywords Ingredients used in the search.
    * @apiSuccess {array} recipes Recipes response with gifs {title,ingredients,link,gif}
    *
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {"keywords":["garlic","onions"],"recipes":[{"title":"Roasted Garlic Grilling Sauce","ingredients":["garlic","hot sauce","onions"],"link":"http://www.kraftfoods.com/kf/recipes/roasted-garlic-grilling-sauce-56344.aspx","gif":"https://media2.giphy.com/media/Q4PcMC8apFXBm/giphy.gif"}]}
    */
  async getCompleteList(ctx) {
    const ingredients = ctx.query.i;

    if (!ingredients) {
      ctx.throw(500, 'Ingredients required with GET /recipes/i?ingredient1,ingredient2');
    } else {
      const arrIngredients = RecipeController.prepareIngredients(ingredients);

      if (arrIngredients.length > 3) ctx.throw(500, 'The maximum number of ingredients is 3');

      const listRecipes = await RecipeController.getFormattedRecipes(ingredients);
      const data = await GiphyController.getGifByRecipe(listRecipes);
      ctx.body = { keywords: arrIngredients, recipes: data };
    }
  },
  /**
    * Search for recipes and format it's return
    *
    * @param ingredients {Object} schema JSON schema
    * @returns {Promise<*>}
    */
  async getFormattedRecipes(ingredients) {
    const listRecipes = await RecipeController.getRecipes(ingredients);

    if (!listRecipes.data) return [];

    return listRecipes.data.results.map(receita => (
      {
        title: receita.title.trim(),
        ingredients: RecipeController.prepareIngredients(receita.ingredients),
        link: receita.href,
      }));
  },

  /**
    * Search for recipes
    *
    * @param ingredients {Object} schema JSON schema
    * @returns {Promise<*>}
    */
  async getRecipes(ingredients) {
    try {
      return await axios.get(Env.RECIPE_API_URL, {
        params: {
          i: ingredients,
        },
      });
    } catch (error) {
      return error;
    }
  },

  /**
    * Split, order and trim a string
    *
    * @param ingredients {string}
    * @returns {object}
    */
  prepareIngredients(ingredients) {
    return ingredients.split(',').map(item => item.trim()).sort();
  },
};

module.exports = RecipeController;
