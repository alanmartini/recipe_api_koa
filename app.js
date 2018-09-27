const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');


const app =  new Koa();
const router =  new KoaRouter();

// Json pretty return
app.use(json());


//Router middleware
app.use(router.routes()).use(router.allowedMethods());

router.get('/', ctx => (ctx.body = { msg: 'Hello World'} ));

router.get('/test', ctx => (ctx.body = { msg: 'Hello World Test'} ));

app.listen(3000, () => console.log('Server up on 3000'));
