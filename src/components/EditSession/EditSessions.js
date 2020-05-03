import React from 'react'
import './EditSessions.css'
import groupData from '../../static/data'
import groupTypes from '../../static/GroupTypes'
import sessionTimes from '../../static/sessionTimes'
import daysOpen from '../../static/days'

class EditSessions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {data: groupData, class: groupTypes[0], day:"Monday", time: "9.00", action: "Add"}
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.daysOfTheWeekObject = daysOpen.map((element, index) => ({key: element, value: index}) )
        this.sessionTimes = sessionTimes.map((session) => session.start + " - " + session.end)
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

    handleChangeSelect(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        const sessionCodeString = this.getSessionCodeString(this.state.time, this.state.day)
        this.updateData(this.state.class, sessionCodeString, this.state.action)
        event.preventDefault()
        this.props.parentCallback(this.state)
       }


    render() {
        const classOptions = groupTypes.map((name, index) => 
            <option key={index} value={name}>{name}</option>)
        const days = daysOpen.map((day, index) =>
            <option key={index} value={day}>{day}</option>)
        const times = this.sessionTimes.map((time, index) =>
            <option key={index} value={time}>{time}</option>)
        const actions = ["Add", "Delete"].map((action, index) =>
            <option key={index} value={action}>{action}</option>)

        return(
            <div>
                <p>Edit Sessions</p>
                
                <form className="editform" onSubmit={this.handleSubmit}>
                    <label className="cell row1 column1" for="class">Select Class</label>
                    <label className="cell row2 column1" for="day">Select Day</label>
                    <label className="cell row3 column1" for="class">Select Time</label>
                    <label className="cell row4 column1" for="class">Select Action</label>
                    <select className="cell row1 column2" value={this.state.class} name="class" onChange={this.handleChangeSelect}>{classOptions}</select>
                    <select className="cell row2 column2" value={this.state.day} name="day" onChange={this.handleChangeSelect}>{days}</select>
                    <select className="cell row3 column2" value={this.state.time} name="time" onChange={this.handleChangeSelect}>{times}</select>
                    <select className="cell row4 column2" value={this.state.action} name="action" onChange={this.handleChangeSelect}>{actions}</select>
                    <input className="cell column2 row5" type="submit" value="Apply" />
                </form>
            </div>
        )
    }
}
export default EditSessions
