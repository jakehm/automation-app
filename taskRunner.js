const Horseman = require('node-horseman')
const horseman = new Horseman()

const testData = [
  {action: 'goToUrl', target: 'http://www.bing.com'},
  {action: 'doText', target: '#sb_form_q',  textInput: 'hi'}
]

const doTasks = tasks => {
  let taskIndex = 0;
  const next = () => {
    if (taskIndex < tasks.length) {
      let task = tasks[taskIndex]
      taskIndex++
      let horsemanAction
      switch (task.action) {
        case 'goToUrl':
          horsemanAction = horseman.open(task.target)
        case 'doClick':
          horsemanAction = horseman.click(task.target)
        case 'doText':
          horsemanAction = horseman.type(task.target, task.textInput)
      }
      return horsemanAction.wait(5000).then(next)  
    } else {
      return horseman
    }
  } 
  return next()
}


const taskRunner = tasks => {
  horseman
    .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
    .then(doTasks(tasks))
    .finally(() => {
      horseman.close()
    })
}

taskRunner(testData)
