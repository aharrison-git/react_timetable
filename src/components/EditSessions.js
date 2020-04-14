import React from 'react'
import groupData from '../data'
import GroupTypes from '../GroupTypes'

class EditSessions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {class: GroupTypes[0], day:"Monday", time: "9.00", action: "Add"}
        this.handleChangeClass = this.handleChangeClass.bind(this)
        this.handleChangeDay = this.handleChangeDay.bind(this)
        this.handleChangeTime = this.handleChangeTime.bind(this)
        this.handleChangeAction = this.handleChangeAction.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeClass(event) {
        this.setState({class: event.target.value})
        console.log("target: " + event.target.value)
    }

    handleChangeDay(event) {
        this.setState({day: event.target.value})
        console.log("target: " + event.target.value)
    }

    handleChangeTime(event) {
        this.setState({time: event.target.value})
        console.log("target: " + event.target.value)
    }

    handleChangeAction(event) {
        this.setState({action: event.target.value})
        console.log("target: " + event.target.value)
    }

    handleSubmit(event) {
        alert("class: " + this.state.class + ", day: " + this.state.day + ", time: " + this.state.time + ", action: " + this.state.action)
        event.preventDefault()
        this.props.parentCallback(this.state)
    }

    render() {
        const classOptions = GroupTypes.map((name) => 
            <option value={name}>{name}</option>)
        const days = ["Monday", "Tuesday", "Wednesday"].map((day) =>
            <option value={day}>{day}</option>)
        const times = ["9.00", "9.45", "10.30", "11.15"].map((time) =>
            <option value={time}>{time}</option>)
        const actions = ["Add", "Delete"].map((action) =>
            <option value={action}>{action}</option>)

        return(
            <div>
                <p>Edit Sessions</p>
                
                <form class="editform" onSubmit={this.handleSubmit}>
                    <label>
                        Select Class:
                        <select value={this.state.class} onChange={this.handleChangeClass}>            
                            {classOptions}
                        </select>
                    </label>
                    <br/>
                    <label>
                        Select Day:
                        <select value={this.state.day} onChange={this.handleChangeDay}>            
                            {days}
                        </select>
                    </label>
                    <br/>
                    <label>
                        Select Time:
                        <select value={this.state.time} onChange={this.handleChangeTime}>            
                            {times}
                        </select>
                    </label>
                    <br/>
                    <label>
                        Select Action:
                        <select value={this.state.action} onChange={this.handleChangeAction}>            
                            {actions}
                        </select>
                    </label>
                    <br/>
                    
                    <input type="submit" value="Apply" />
                </form>
            </div>
        )
    }
}
//<option value="grapefruit">Grapefruit</option>
//<option value="lime">Lime</option>
//<option value="coconut">Coconut</option>
//<option value="mango">Mango</option>
export default EditSessions
