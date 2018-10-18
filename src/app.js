const Koa = require('koa');
const helmet = require('koa-helmet');
const statusCheckMiddleware = require('./middleware/status');
const errorHandler = require('./middleware/errorHandler');


/**
 * Bootstraps Koa application.
 *
 * @return {Promise<Koa>}
 */
const bootstrap = async () => {
    const app =  new Koa();

    app.use(helmet());

    app.use(errorHandler);

    app.use(statusCheckMiddleware);

    const router = require('./router');

    app.use(router.routes(), router.allowedMethods());

    return app;
};

module.exports = bootstrap;