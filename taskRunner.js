const Horseman = require('node-horseman')
const horseman = new Horseman({ignoreSSLErrors: true})
const q = require('q')

const testData = [
  {action: 'goToUrl', target: 'http://www.bing.com'},
  {action: 'doText', target: '#sb_form_q',  textInput: 'hi'}
]
const processTask = task => {
	console.log("processing task: "+task)
	let horsemanAction;
	switch (task.action) {
    case 'goToUrl':
      horsemanAction = horseman.open(task.target)
    case 'doClick':
      horsemanAction = horseman.click(task.target)
    case 'doText':
      horsemanAction = horseman.type(task.target, task.textInput)
  }
  return horsemanAction.wait(5000).title().then((title) => {console.log(title)})
}

const chain = testData.reduce((previous, item) => {
	return previous.then((previousValue) =>{
		processTask(previousValue)
	})
}, q.resolve("start"))


// let taskIndex = 1;

// const doTasks = tasks => {
//   return new Promise((resolve, reject) => {
//   	readyActions[0].then( () => {
// 			if (taskIndex < tasks.length) {
// 	      let task = tasks[taskIndex]
// 	      taskIndex++
// 	      return task.then(doTasks(tasks))  
// 	  	}
// 	  }).then(resolve)
//   })
// }

const taskRunner = () => {
  horseman
    .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
    .then(chain.then((lastResult) => processTask(lastResult)))
    // .open('http://www.bing.com')
    // .type('#sb_form_q', 'hi')
    // .title().then((title)=> {console.log(title)})
    .finally(() => {
    	horseman.close()
    })
}

taskRunner()


