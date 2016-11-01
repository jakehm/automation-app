import React from 'react';
import { List, ListSubHeader} from 'react-toolbox/lib/list';
import Task from './Task.js';

const TaskList = (props) => (
  <List selectable ripple>
    <ListSubHeader caption='Tasks' />
    {
      props.tasks.map((task, index) => { 
        let taskCaption = task.label+': '+task.target;
        if (task.action === 'doText')
          taskCaption += ': '+task.text

        return (
          <Task {...props}
            key={index}
            caption={taskCaption}
            index={index}
          />
        )
      })
    }
  </List>
)

export default TaskList;
