import React from 'react';
import { List, ListSubHeader} from 'react-toolbox/lib/list';
import Task from './Task.js';

const TaskList = (props) => (
	<List selectable ripple>
		<ListSubHeader caption='Tasks' />
		{
			props.tasks.map((task, index) => (
				<Task {...props}
					key={index}
					caption={task.action +': '+task.target}
					index={index}
				/>
			))
		}
	</List>
);

export default TaskList;