import React from 'react'
import groupData from '../data'
import GroupTypes from '../GroupTypes'

class EditSessions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {data: groupData, class: GroupTypes[0], day:"Monday", time: "9.00", action: "Add"}
        this.handleChangeClass = this.handleChangeClass.bind(this)
        this.handleChangeDay = this.handleChangeDay.bind(this)
        this.handleChangeTime = this.handleChangeTime.bind(this)
        this.handleChangeAction = this.handleChangeAction.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        this.daysOfTheWeekObject = this.daysOfTheWeek.map((element, index) => ({key: element, value: index}) )

        this.sessionTimes = ["9.00", "9.45", "10.30", "11.15", "12.00", "12.45"]
        this.sessionTimesObject = this.sessionTimes.map((element, index) => ({key: element, value: index}))
        this.getCode = this.getCode.bind(this)
        this.getSessionCodeString = this.getSessionCodeString.bind(this)
        this.updateData = this.updateData.bind(this)
    }

    getCode(value, objectArray) {
        for (var i=0 ; i<objectArray.length ; i++) {
            if (objectArray[i].key === value) {
                return objectArray[i].value
            }
        } 
        return null
    }


    getSessionCodeString(time, day) {
        const dayCode = this.getCode(this.state.day, this.daysOfTheWeekObject)
        const timeCode = this.getCode(this.state.time, this.sessionTimesObject)
        var sessionCode = (timeCode + 1).toString() + (dayCode + 1).toString()
        return sessionCode
    }


    updateData(name, session, action) {
        switch (action) {
            case "Add":
                var exists = 0
                for (var i=0; i<this.state.data.length; i++) {
                    if (this.state.data[i].groupName == name && this.state.data[i].session == session) {
                        exists++    
                    }
                }
                if (exists===0) {
                    var dataTemp = this.state.data
                    const newObj = {session: parseInt(session), groupName: name}
                    dataTemp.push(newObj)
                }
                break

            case "Delete":
                exists = 0
                for (i=0; i<this.state.data.length; i++) {
                    console.log(this.state.data[i].groupName + " " + this.state.data[i].session)
                    if (this.state.data[i].groupName == name && this.state.data[i].session == session) {
                        dataTemp = this.state.data.splice(i, 1)
                        break
                    }
                }
                break

            default:
                break
        }
    }

    handleChangeClass(event) {
        this.setState({class: event.target.value})
       }

    handleChangeDay(event) {
        const { target: { name, value } } = event
        this.setState({ day: value })
        }

    handleChangeTime(event) {
        this.setState({time: event.target.value})
       }

    handleChangeAction(event) {
        this.setState({action: event.target.value})
       }

    handleSubmit(event) {
        const sessionCodeString = this.getSessionCodeString(this.state.time, this.state.day)
        this.updateData(this.state.class, sessionCodeString, this.state.action)
        event.preventDefault()
        this.props.parentCallback(this.state)
       }


    render() {
        const classOptions = GroupTypes.map((name, index) => 
            <option key={index} value={name}>{name}</option>)
        const days = this.daysOfTheWeek.map((day, index) =>
            <option key={index} value={day}>{day}</option>)
        const times = this.sessionTimes.map((time, index) =>
            <option key={index} value={time}>{time}</option>)
        const actions = ["Add", "Delete"].map((action, index) =>
            <option key={index} value={action}>{action}</option>)

        return(
            <div>
                <p>Edit Sessions</p>
                
                <form className="editform" onSubmit={this.handleSubmit}>
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
                    <br/>
                    <input type="submit" value="Apply" />
                </form>
            </div>
        )
    }
}
export default EditSessions
