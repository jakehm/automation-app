const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const internalIp = require('internal-ip');
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const bodyParser = require('body-parser');
const Horseman = require('node-horseman')

const taskRunner = require('./taskRunner.js')

const app = express();
const compiler = webpack(config);

const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  silent: false,
  stats: { color: true }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
//new code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test.png', (req, res) => {
  res.sendFile(path.join(__dirname, './test.png'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './src/www/index.html'));
});

//added code to handle instructions post
app.post('/tasks', (req, res) => {
  let tasks = req.body.tasks
  let horseman = new Horseman({ignoreSSLErrors: true})
  taskRunner(tasks, horseman)
  .then(() => {
    console.log('tasks complete')
    res.send('task complete')
  })
}) 

const port = 8080;
const ip = internalIp.v4();

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(' --------------------------------------');
  console.log(`    Local: http://0.0.0.0:${port}`);
  console.log(` External: http://${ip}:${port}`);
  console.log(' --------------------------------------');
});
