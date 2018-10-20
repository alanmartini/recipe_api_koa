const App = require('../src');
const chai = require('chai');
const supertest = require('supertest');
const RecipeController = require('../src/recipe/recipe.controller');
const GiphyController = require('../src/giphy/giphy.controller');

let app;
let server;

before(async () => {
  app = await App();
  server = app.listen();
});

afterEach(() => {
  server.close();
});

/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
const expect = chai.expect;

describe('Test the application functions and endpoints', () => {
  describe('Test getGif()', () => {
    it('Should return one gif based on the title of the recipe', async () => {
      const gifs = await GiphyController.getGif('Creamy Scrambled Eggs');
      expect(gifs.images.original.url).to.be.a('string').to.include('gif');
    });
  });

  describe('Test getRecipe()', () => {
    it('Should return a list of recipe\'s based on the parameters', async () => {
      const recipes = await RecipeController.getRecipes('tomatos,onions');
      expect(recipes.data).to.be.a('object');
      expect(recipes.data.results[0].title).to.be.a('string');
    });
  });

  describe('Test getCompleteList() | No ingredients', () => {
    it('Should return the error message to inform NO ingredients', async () => {
      await supertest(server)
        .get('/recipes/?i')
        .expect('Content-Type', /json/)
        .expect(500)
        .then((res) => {
          expect(res.text.message, 'Ingredients required with GET /recipes/i?ingredient1,ingredient2');
        });
    });
  });

  describe('Test getCompleteList() | Excess of ingredients', () => {
    it('Should return the error message to inform excess of informed ingredients', async () => {
      await supertest(server)
        .get('/recipes/?i=tomatos,onions,bacon,sauce')
        .expect('Content-Type', /json/)
        .expect(500)
        .then((res) => {
          expect(res.text.message, 'Ingredients required with GET /recipes/i?ingredient1,ingredient2');
        });
    });
  });

  describe('Test getCompleteList() | Final list of recipes and gifs', () => {
    it('Should return the list os recipes with gifs', async () => {
      await supertest(server)
        .get('/recipes/?i=tomatos,onions,bacon')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.keywords).to.be.a('array');
          expect(res.body.recipes).to.be.a('array');
        });
    });
  });
});
