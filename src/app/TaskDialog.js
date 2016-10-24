import React from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import Dropdown from 'react-toolbox/lib/dropdown'
import Input from 'react-toolbox/lib/input'


export default class TaskDialog extends React.Component {

	state = {
		dropDownValue: 'goToUrl',
		urlValue: ''
	}

	handleDropDownChange = (value) => {
		this.setState({dropDownValue: value})
	}

	handleUrlChange = (value) => {
		this.setState({urlValue: value})
	}

	handleSave = () => {
		let task = {
			action: this.state.dropDownValue,
			target: this.state.urlValue
		}
		this.props.onAdd(task)
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
				<p>placeholder for task editing form</p>
				<Dropdown
					auto
					source = {this.dropDownSource}
					value = {this.state.dropDownValue}
					onChange = {this.handleDropDownChange}
				/>
				{this.state.dropDownValue === 'goToUrl' &&
					<Input type='text' label='URL' value={this.state.urlValue}
						onChange={this.handleUrlChange} 
					/>
				}
			</Dialog>
		)
	}
}