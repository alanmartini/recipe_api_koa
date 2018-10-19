const { Env } = require('./../../config/');
const axios = require('axios');


/**
 * Middleware to check external API's status
 *
 * @return {onerror}
 */

const checkStatusMiddleware = async (ctx, next) => {
  /*
        Considerations:
            - this could've been done using koa-compose
            - the rules doens't require to inform which individual service is offline
     */
  try {
    if (!Env.GIPHY_KEY) ctx.throw(500, 'No Giphy key configured');

    const recipe = await axios.get(Env.RECIPE_API_URL);
    const giphy = await axios.get(Env.GIPHY_API_URL);

    if (recipe.status !== 200 || giphy.status !== 200) {
      ctx.throw(500, 'Wops, something bad happened, one of the services seems offline, please check again later');
    }
  } catch (error) {
    ctx.throw(500, error.message);
  }

  await next();
};

module.exports = checkStatusMiddleware;
