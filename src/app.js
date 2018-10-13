const Koa = require('koa');
const helmet = require('koa-helmet');

require('dotenv').config();

/**
 * Bootstraps Koa application.
 *
 * @return {Promise<Koa>}
 */
const bootstrap = async () => {
    const app =  new Koa();

    app.use(helmet());

    const router = require('./router');

    app.use(router.routes(), router.allowedMethods());

    return app;
};

module.exports = bootstrap;