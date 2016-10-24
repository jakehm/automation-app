import React from 'react';
import axios from 'axios';
//import 'react-toolbox/lib/commons.scss';           // Import common styles
import PurpleAppBar from './PurpleAppBar.js';      // AppBar with simple overrides
import TaskList from './TaskList.js'
import TaskDialog from './TaskDialog.js'

import { Button } from 'react-toolbox/lib/button'; // Bundled component import

export default class App extends React.Component {

  state = {
    tasks: [
      {action: 'goToUrl', target:'a'}, 
      {action: 'goToUrl', target:'b.com'}
    ],
    isDialogActive: false
  }

  handleAdd = (task) => {
    this.setState({
      tasks: [...this.state.tasks, task],
      isDialogActive: !this.state.isDialogActive
    })

  } 

  handleDelete = (i) => {
    this.setState({
      tasks: [
        ...this.state.tasks.slice(0, i),
        ...this.state.tasks.slice(i+1)
      ]
    })
  }

  handleToggle = () => {
    this.setState({isDialogActive: !this.state.isDialogActive});
  }

  handleSubmit = () => {
    axios.post('/tasks', {
      tasks: this.state.tasks
    })
    .then((response) => {
      this.setState({response: response})
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    const fabStyle = {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed'
    };
    return (
      <div>
        <PurpleAppBar />
        <section style={{ padding: 20 }}>
          <TaskList 
            tasks={this.state.tasks} 
            delete={this.handleDelete} />
          <Button label='go' primary raised
            onClick={this.handleSubmit}
          />
          <Button icon='add' style={fabStyle} floating accent 
            onClick={this.handleToggle}
          />
          {this.state.response &&
            <div>
              Instructions complete.
              Response = {response}
            </div>
          } 
        </section>
        <TaskDialog
          onAdd={this.handleAdd}
          onToggle={this.handleToggle}
          active={this.state.isDialogActive}
        />
      </div>
    )
  }

}
