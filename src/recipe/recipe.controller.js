const axios = require('axios');

const RecipeController = {
    async show(ctx) {
        ctx.status = 200;
        ctx.body = { msg : 'recipe' };
    },

    async getCompleteList(ctx) {},
    async getFormatedRecipes(ctx) {},
    async getRecipes(ctx) {},
};

module.exports = RecipeController;