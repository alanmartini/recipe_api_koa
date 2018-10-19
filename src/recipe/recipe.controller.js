const axios = require('axios');
const GiphyController = require('../giphy/giphy.controller');

const RecipeController = {
    async getCompleteList(ctx) {
        let ingredients = ctx.query.i;

        if(!ingredients){
            ctx.throw(400, 'Ingredients required with GET /recipes/i?ingredient1,ingredient2');
        } else {
            let arrIngredients = RecipeController.prepareIngredients(ingredients);

            if(arrIngredients.length > 3) ctx.throw(500, 'The maximum number of ingredients is 3');

            let listRecipes = await RecipeController.getFormattedRecipes(ingredients);
            let data = await GiphyController.getGifByRecipe(listRecipes);
            ctx.body = { keywords: arrIngredients, recipes: data }
        }
    },
    async getFormattedRecipes(ingredients) {
        let listRecipes = await RecipeController.getRecipes(ingredients);

        if(!listRecipes.data) return [];

        return await listRecipes.data.results.map((receita) => (
            {
                titulo: receita.title.trim(),
                ingredients: RecipeController.prepareIngredients(receita.ingredients),
                link: receita.href
            })
        );
    },
    async getRecipes(ingredients) {
        try {

            return await axios.get('http://recipepuppy.com/api/?i='+ingredients);
        } catch (error) {
            return error;
        }
    },
    prepareIngredients(ingredients) {
        return ingredients.split(',').map(item => item.trim()).sort();
    }
};

module.exports = RecipeController;