import React from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import Dropdown from 'react-toolbox/lib/dropdown';
import TimePicker from 'react-toolbox/lib/time_picker';
import DatePicker from 'react-toolbox/lib/date_picker';
import Input from 'react-toolbox/lib/input';

import inputTheme from './Input.scss';

const ScheduleDialog = (props) => {

  const actions = [
    { label: "Cancel", onClick: props.onToggle },
    { label: "Submit", onClick: props.onSubmit }
  ]

  const repeat = [
    {value: 'none', label: 'None'},
    {value: 'day', label: 'Daily'},
    {value: 'week', label: 'Weekly'},
    {value: 'month', label: 'Monthly'},
    {value: 'year', label: 'Yearly'},
  ]

  const handleFocus = (e) => {
    e.target.select()
  }

  return (
    <Dialog
      actions={actions}
      active={props.active}
      title="Schedule Task"
      type="large">
       
      <TimePicker
        label='Time'
        onChange={props.onDateChange}
        value={props.date}
      />

      <DatePicker
        label='Date'
        autoOk
        onChange={props.onDateChange}
        value={props.date}
      />
      
      <Dropdown
        auto
        label='Repeat'
        onChange={props.onRepeatChange}
        source={repeat}
        value={props.repeatValue}
      />

    {
      props.repeatValue !== 'none' &&
      <div>
        <span>Every &nbsp; &nbsp; &nbsp;</span>
        <span style={{display: 'inline-block'}}>
          <Input
            theme={inputTheme}
            type='number'
            value={props.repeatNumber}
            onChange={props.onRepeatNumberChange}
            min='1'
            onFocus={handleFocus}
          />
        </span>
        <span> {props.repeatValue}</span>
        { 
          props.repeatNumber > 1 &&
          <span>s</span>
        }
      </div>
    }
    </Dialog>
  ) 
}

export default ScheduleDialog
