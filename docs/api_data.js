define({ "api": [
  {
    "type": "get",
    "url": "/recipes/?i={ingredient1},{ingredient2},{ingredient3}",
    "title": "Search for recipes with Gifs",
    "name": "RecipesWithGifs",
    "group": "Recipes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "i",
            "description": "<p>Recipe ingredients.</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "keywords",
            "description": "<p>Ingredients used in the search.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "recipes",
            "description": "<p>Recipes response with gifs {title,ingredients,link,gif}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"keywords\":[\"garlic\",\"onions\"],\"recipes\":[{\"title\":\"Roasted Garlic Grilling Sauce\",\"ingredients\":[\"garlic\",\"hot sauce\",\"onions\"],\"link\":\"http://www.kraftfoods.com/kf/recipes/roasted-garlic-grilling-sauce-56344.aspx\",\"gif\":\"https://media2.giphy.com/media/Q4PcMC8apFXBm/giphy.gif\"}]},",
          "type": "json"
        }
      ]
    },
    "filename": "src/recipe/recipe.controller.js",
    "groupTitle": "Recipes"
  }
] });
