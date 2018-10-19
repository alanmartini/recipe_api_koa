const Router = require('koa-router');
const RecipeController = require('./recipe/recipe.controller');

const router = new Router();

router.get('/recipes', RecipeController.getCompleteList);

router.get('*', async (ctx) => {
  ctx.body = { msg: 'Hello World API' };
});

module.exports = router;
