/* eslint-disable no-process-env */
const path = require('path');

/**
 * @see https://github.com/motdotla/dotenv#usage
 */
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env.test') });
} if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
}

/**
 * @class Env
 */
class Env {
  /**
     * Application context.
     *
     * @default 'development'
     * @return {String}
     */
  static get NODE_ENV() {
    return (process.env.NODE_ENV || 'development');
  }

  /**
     * Application port.
     *
     * @default 3000
     * @return {Number}
     */
  static get PORT() {
    return process.env.PORT ? Number(process.env.PORT) : 3000;
  }

  /**
     * Giphy access key.
     *
     * @return {String}
     */
  static get GIPHY_KEY() {
    return process.env.GIPHY_KEY;
  }

  /**
     * Giphy API URL.
     *
     * @default https://api.giphy.com/
     * @return {String}
     */
  static get GIPHY_API_URL() {
    return process.env.GIPHY_API_URL || 'https://api.giphy.com/';
  }

  /**
     * Giphy search endpoint.
     *
     * @default v1/gifs/search/
     * @return {String}
     */
  static get GIPHY_SEARCH_ENDPOINT() {
    return process.env.GIPHY_SEARCH_ENDPOINT || 'v1/gifs/search/';
  }

  /**
     * Recipe puppy API URL.
     *
     * @default http://recipepuppy.com/api/
     * @return {String}
     */
  static get RECIPE_API_URL() {
    return process.env.RECIPE_API_URL || 'http://recipepuppy.com/api/';
  }
}

module.exports = Env;
