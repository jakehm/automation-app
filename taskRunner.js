const taskRunner = (tasks, id, horseman) => {

  const taskFactory = (task) => {
    let horsemanAction;
    switch (task.action) {
      case 'goToUrl':
      horsemanAction = () =>  horseman.open(task.target)
      break;
      case 'doClick':
      horsemanAction = () => horseman.click(task.target).waitForNextPage()
      break;
      case 'doText':
      horsemanAction = () => horseman.type(task.target, task.text)
      break;
    }
    return horsemanAction
  }

  const executeTasks = tasks => {
    let result = Promise.resolve()
    tasks.forEach(task => {
      result = result.then( taskFactory(task) )
    })
    return result
  } 
  
  return (
  horseman
    .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
    .then(() => executeTasks(tasks))
    .screenshot('/home/jake/automation-app/screenshots/tasks' + id + '.png')
    .close()
    .catch(console.log.bind(console))
  )
}

module.exports = taskRunner

//used when run from the command line with a cronjob
const argv = require('yargs').argv
if (argv.taskId) {
  const fs = require('fs'),
    Horseman = require('node-horseman'),
    taskId = argv.taskId

  fs.readFile('/home/jake/automation-app/taskData/task'+taskId+'.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const taskListObj = JSON.parse(data)
      const tasks = taskListObj.taskList
      const horseman = new Horseman({
        ignoreSSLErrors: true
      })
      console.log(taskListObj)
      taskRunner(tasks, taskId, horseman)
    }
  })
}
