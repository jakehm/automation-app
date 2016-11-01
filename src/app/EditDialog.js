import React from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import Dropdown from 'react-toolbox/lib/dropdown'
import Input from 'react-toolbox/lib/input'


export default class EditDialog extends React.Component {

  state = {
    action: this.props.tasks[this.props.index].action,
    target: this.props.tasks[this.props.index].target,
    text: this.props.tasks[this.props.index].text
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      action: newProps.tasks[newProps.index].action,
      target: newProps.tasks[newProps.index].target,
      text: newProps.tasks[newProps.index].text
    })
  }

  handleDropDownChange = (value) => {
    this.setState({action: value})
  }

  handleTargetChange = (value) => {
    this.setState({target: value})
  }

  handleTextChange = (value) => {
    this.setState({text: value})
  }

  handleSave = () => {
    let task = {
      action: this.state.action,
      target: this.state.target
    }

    switch (this.state.action) {
      case 'goToUrl':
        task.label = 'Go to url'
        break
      case 'doClick':
        task.label = 'Click'
        break
      case 'doText':
        task.label = 'Enter text'
        break
    }

    if (this.state.action==='doText')
      task.text = this.state.text

    this.props.onSave(task, this.props.index)
  }

  actions = [
    { label: "Cancel", onClick: this.props.onToggle },
    { label: "Save", onClick: this.handleSave }
  ]

  dropDownSource = [
    {value: 'goToUrl', label: 'Go to url'},
    {value: 'doClick', label: 'Click something'},
    {value: 'doText', label: 'Enter text'}
  ]

  render() {
    return (
      <Dialog
        actions={this.actions}
        active={this.props.active}
        onEscKeyDown={this.props.onToggle}
        onOverlayClick={this.props.onToggle}
        title='Edit Task' 
        type='large'>
        <p>Edit an automation task.</p>
        <Dropdown
          auto
          source = {this.dropDownSource}
          value = {this.state.action}
          onChange = {this.handleDropDownChange}
        />
        {this.state.action === 'goToUrl' ? (
          <Input type='text' label='url' value={this.state.target}
            onChange={this.handleTargetChange} 
          />
        ) : (
          <Input type='text' label='selector' value={this.state.target}
            onChange={this.handleTargetChange} 
          />
        )}
        {this.state.action === 'doText' &&
          <Input type='text' label='text' value={this.state.text}
            onChange={this.handleTextChange}
          />
        }
      </Dialog>
    )
  }
}
