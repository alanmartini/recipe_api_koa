const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const axios = require('axios');

const app =  new Koa();
const router =  new KoaRouter();

const giphyKey = 'a0MJJtrmaTzPV2BxbArH1KlRvDm7Oj3Y';

// Json pretty return
app.use(json());

router
    .get('/recipes', async (ctx, next) => {
        let ingredientes = ctx.query.i;

        if(!ingredientes){
            ctx.throw(400, 'ingredients required');
        } else {
            let data = await getCompleteList(ingredientes);
            ctx.body = { keywords: ['onions','garlic'], recipes: data }
        }
    })
    .all('/', (ctx, next) => {
        ctx.body = 'Hello World API!';
    });

//Router middleware
app
    .use(router.routes())
    .use(router.allowedMethods());

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

const getGif = async (title) => {
    try {
        return await axios.get('https://api.giphy.com/v1/gifs/search?api_key=a0MJJtrmaTzPV2BxbArH1KlRvDm7Oj3Y&q=' + title + '&limit=1&offset=0&rating=G&lang=en');
    }catch (error) {
        console.error(error);
    }
};

const getRecipes = async () => {
    try {
        return await axios.get('http://recipepuppy.com/api/?i=onions,garlic');
    } catch (error) {
        console.error(error)
    }
};

const getFormatedRecipes = async () => {
    let listRecipes = await getRecipes();

    return await listRecipes.data.results.map((receita) => (
        {
            titulo: receita.title.trim(),
            ingredients: receita.ingredients,
            link: receita.href
        })
    );
};

const getCompleteList = async () => {
    let listRecipes = await getFormatedRecipes();
    return await getGifByRecipe(listRecipes);
};

const getGifByRecipe = async (listRecipes) => {
    return await Promise.all(listRecipes.map( async (receita) => {
        let data = await getGif(receita.titulo);
        receita.gif = data.data.data[0].images.original.url;
        return receita;
    }));
};


app.listen(3000, () => console.log('Server up on 3000'));
