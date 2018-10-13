const axios = require('axios');

const GiphyController = {
    async show(ctx) {
        ctx.status = 200;
        ctx.body = { msg : 'recipe' };
    },

    async getGifByRecipe(ctx) {},
    async getGif(ctx) {},

};

module.exports = GiphyController;