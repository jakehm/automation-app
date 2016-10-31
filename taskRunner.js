const taskRunner = (tasks, horseman) => {

  const testData = [
    {action: 'goToUrl', target: 'http://www.bing.com'},
    {action: 'doText', target: '#sb_form_q',  text: 'hi'}
  ]

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
    .screenshot('test.png')
    .close()
    .catch(console.log.bind(console))
  )
}

module.exports = taskRunner
