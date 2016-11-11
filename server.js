const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const internalIp = require('internal-ip');
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const bodyParser = require('body-parser');
const Horseman = require('node-horseman')
const fs = require('fs')
const spawn = require('child_process').spawn

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

app.use(express.static(__dirname + '/screenshots'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './src/www/index.html'));
});

//added code to handle instructions post
app.post('/tasks', (req, res) => {
  const tasks = req.body.tasks
  const photoId = req.body.photoId
  const horseman = new Horseman({
    ignoreSSLErrors: true
  })
  taskRunner(tasks, photoId, horseman)
  .then(() => {
    console.log('tasks complete')
    res.send('task complete')
  }) 
}) 

//right now no repeat is actually a yearly repeat
// also repeatNumber (every other week, etc) doesn't do anything
app.post('/scheduleTask', (req,res) => {
  const tasks = { taskList: req.body.tasks }
  const taskId = req.body.photoId
  const date = new Date(req.body.date)
  const repeatValue = req.body.repeatValue
  const repeatNumber = req.body.repeatNumber  

  let minutes = date.getMinutes()
  let hours = date.getHours()
  let day = date.getDate()
  let month =  date.getMonth() + 1
  let dayOfTheWeek = '*'

  switch (repeatValue) {
    case 'day':
      month = '*'
      day = '*'
      break
    case 'week':
      day = '*'
      month = '*'
      dayOfTheWeek = '0'
      break
    case 'month':
      month = '*'
      break
  }
  
  if (repeatValue === 'week') {
    day = '*'
    if (repeatNumber > 1)
      day += '/' + repeatNumber
  }
  const croncmd = '"node /home/jake/automation-app/taskRunner.js'
    + ' --taskId=' + taskId + '"';
  
  const cronjob = [minutes, hours, day, month, dayOfTheWeek, croncmd].join(' ')
  
  const command = '( crontab -l | grep -v -F '+croncmd+'; echo "'+cronjob+'" ) | crontab -'

  const taskString = JSON.stringify(tasks)
  fs.writeFile('/home/jake/automation-app/taskData/task'+taskId+'.json', taskString, 'utf8', () => { 
    spawn('sh', ['-c', command], {stdio: 'inherit'})
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
