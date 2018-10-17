const Router = require('koa-router');
const RecipeController = require('./recipe/recipe.controller');

const router =  new Router();

router.get('/', async (ctx, next) => {
    ctx.body = { msg : 'Hello World API' };
});

router.get('/recipes', RecipeController.getCompleteList);

module.exports = router;