const { Env } = require('./../../config/');
const axios = require('axios');

const GiphyController = {
  /**
   * Search for recipes gifs
   *
   * @param listRecipes {Object} schema JSON schema
   * @returns {Promise<*>}
   */
  async getGifByRecipe(listRecipes) {
    return Promise.all(listRecipes.map(async (receita) => {
      const data = await GiphyController.getGif(receita.title);
      receita.gif = data.images.original.url;
      return receita;
    }));
  },

  /**
   * Search for gifs using the recipe title
   *
   * @param title {string}
   * @returns {Promise<*>}
   */
  async getGif(title) {
    try {
      return await axios.get(Env.GIPHY_API_URL + Env.GIPHY_SEARCH_ENDPOINT, {
        params: {
          api_key: Env.GIPHY_KEY,
          q: title,
          limit: 1,
          offset: 0,
          rating: 'G',
          lang: 'en',
        },
      }).then((response) => {
        return response.data.data[0];
      });
    } catch (error) {
      return error;
    }
  },

};

module.exports = GiphyController;
