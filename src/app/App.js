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
      {label: 'Go to url', action: 'goToUrl', target: 'https://www.bing.com/'},
      {label: 'Enter text', action: 'doText', target: '#sb_form_q', text: 'test search'},
      {label: 'Click', action: 'doClick', target: '#sb_form_go'}      
    ],
    activeIndex: 0,
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

  handleEdit = (i) => {
    this.setState({
      isEditDialogActive: !this.state.isEditDialogActive,
      activeIndex: i
    })
  }

  handleSaveEdit = (newTask, i) => {
    const tasks = this.state.tasks
    tasks[i] = newTask
    this.setState({
      isEditDialogActive: !this.state.isEditDialogActive,
      tasks: tasks
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
    let photoId = Math.floor(Math.random() * 1000)
    this.setState({
      isRunning: true,
      isRunDialogActive:true,
      photoId: photoId 
    })
    axios.post('/tasks', {
      tasks: this.state.tasks,
      photoId: photoId
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
        />
        <RunDialog
          onToggle={this.handleRunToggle}
          active={this.state.isRunDialogActive}
          isRunning={this.state.isRunning}
          id={this.state.photoId}
        />
        <EditDialog
          active={this.state.isEditDialogActive}
          tasks={this.state.tasks}
          index={this.state.activeIndex}
          onToggle={this.handleEditToggle}
          onSave={this.handleSaveEdit}
        />


      </div>
    )
  }

}
