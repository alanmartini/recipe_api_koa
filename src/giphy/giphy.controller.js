const axios = require('axios');

const GiphyController = {
    async getGifByRecipe(listRecipes) {
        return await Promise.all(listRecipes.map( async (receita) => {
            let data = await GiphyController.getGif(receita.titulo);
            receita.gif = data.images.original.url;
            return receita;
        }));
    },
    async getGif(title) {
        try {
            return await axios.get('https://api.giphy.com/v1/gifs/search?api_key=a0MJJtrmaTzPV2BxbArH1KlRvDm7Oj3Y&q=' + title + '&limit=1&offset=0&rating=G&lang=en')
                .then(function (response) {
                    return response.data.data[0];
                });
        }catch (error) {
            console.error(error);
        }
    },

};

module.exports = GiphyController;