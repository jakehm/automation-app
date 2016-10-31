import React from 'react';
import axios from 'axios';
//import 'react-toolbox/lib/commons.scss';           // Import common styles
import PurpleAppBar from './PurpleAppBar.js';      // AppBar with simple overrides
import TaskList from './TaskList.js'
import TaskDialog from './TaskDialog.js'
import RunDialog from './RunDialog.js'
import EditDialog from './EditDialog.js'


import { Button } from 'react-toolbox/lib/button'; // Bundled component import

export default class App extends React.Component {

  state = {
    tasks: [
      {action: 'goToUrl', target: 'https://www.bing.com/'},
      {action: 'doText', target: '#sb_form_q', text: 'test search'},
      {action: 'doClick', target: '#sb_form_go'}      
    ],
    isDialogActive: false,
    isRunDialogActive: false,
    isEditDialogActive: false,
    isRunning: false
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

  handleEdit = (i) => {
    this.setState({
      isEditDialogActive: !this.state.isEditDialogActive

    })
  }

  handleRunToggle = () => {
    this.setState({isRunDialogActive: !this.state.isRunDialogActive})
  }

  handleToggle = () => {
    this.setState({
      isDialogActive: !this.state.isDialogActive
    });
  }

  handleEditToggle = () => {
    this.setState({
      isEditDialogActive: !this.state.isEditDialogActive
    });
  }


  handleSubmit = () => {
    this.setState({
      isRunning: true,
      isRunDialogActive:true
    })
    axios.post('/tasks', {
      tasks: this.state.tasks
    })
    .then((response) => {
      this.setState({
        isRunning: false
      })
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
            edit={this.handleEdit}
            delete={this.handleDelete} />
          <Button label='go' primary raised
            onClick={this.handleSubmit}
          />
          <Button icon='add' style={fabStyle} floating accent 
            onClick={this.handleToggle}
          />
        </section>
        <TaskDialog
          onAdd={this.handleAdd}
          onToggle={this.handleToggle}
          active={this.state.isDialogActive}
          index={this.state.activeIndex}
          tasks={this.state.tasks}
        />
        <RunDialog
          onToggle={this.handleRunToggle}
          active={this.state.isRunDialogActive}
          isRunning={this.state.isRunning}
        />
        <EditDialog
          active={this.state.isEditDialogActive}
          tasks={this.state.tasks}
          index={this.state.activeIndex}
          onToggle={this.handleEditToggle}
          onSave{this.handleSaveEdit}
        />


      </div>
    )
  }

}
