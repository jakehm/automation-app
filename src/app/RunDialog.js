import React from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import ProgressBar from 'react-toolbox/lib/progress_bar';


const RunDialog = (props) => (
	<Dialog
		actions={[{ label: "Close", onClick: props.onToggle }]}
		active={props.active}
		title="Run Tasks"
		type="large">

		{props.isRunning ? (
			<div>
				<p style={{margin: '5px auto'}}>Tasks running...</p>
    		<ProgressBar type="circular" mode="indeterminate" />
  		</div>
  	) : (
  		<div>
  			<p style={{margin: '5px auto'}}>Screenshot from completed tasks</p>
  			<img src="/test.png" />
  		</div>
  	)}

	</Dialog>
)

export default RunDialog