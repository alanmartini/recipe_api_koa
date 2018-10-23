const Router = require('koa-router');
const RecipeController = require('./recipe/recipe.controller');

const router = new Router();

router.get('/recipes', RecipeController.getCompleteList);

router.all('*', async (ctx) => {
  ctx.redirect('/docs/');
  ctx.status = 301;
});

module.exports = router;
