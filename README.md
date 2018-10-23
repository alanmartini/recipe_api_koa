
### Setup
```bash
$ npm install
```

### Develop
```bash
$ npm start
```

### Test + Eslint
```bash
$ npm test
```

### Run
```bash
$ ./bin/www
```

### Environment
**When `NODE_ENV` environment variable is not set to `production`, the application automatically tries to load the environment config from a `.env` file located in the project root folder.**

### .Env
Copy and rename `.env.sample` to `.env` and add your [Giphy API](https://developers.giphy.com/docs/) key. 

### Docker
```bash
$ docker-compose up 
```

### apiDoc
If you make changes to the documentation, you must run this command to update the docs.
```bash
$ npm run docs
```