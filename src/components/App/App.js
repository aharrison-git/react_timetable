import React from 'react';
import './App.css';
import Filter from '../Filter/Filter'
import AllSessions from '../AllSessions/AllSessions'
import EditSession from '../EditSession/EditSessions'
import groupTypes from '../../static/GroupTypes'
import daysOpen from '../../static/days'
import sessionTimes from '../../static/sessionTimes'

class App extends React.Component {
  constructor() {
    super()
    const groups = groupTypes.map((group) => ({group: true}) )
    this.state = {filter: {
      maths: true,
      english: true,
      physics: true,
      chemistry: true,
      music: true
      }, 
      sessions: {},
      isLoggedIn: false,
      username: '',
      password: '',
      showLoginFailMessage: false,
    }
    this.callbackFunctionFilter = this.callbackFunctionFilter.bind(this)
    this.callbackFunctionSessions = this.callbackFunctionSessions.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleLoginInput = this.handleLoginInput.bind(this)
  }

  callbackFunctionFilter(filters) {
    this.setState({filter: filters})
  }

  callbackFunctionSessions(sessionData) {
    this.setState({sessions: sessionData})
  }

  handleLoginInput(event) {
    let name = event.target.name
    let value = event.target.value
    this.setState({[name]: value})
    }

  handleLoginSubmit(event) {
    if (!this.state.isLoggedIn) {
      if (this.state.username == 'admin' && this.state.password == 'password') {
        this.setState({isLoggedIn: true})
      }
      else {
        this.setState({isLoggedIn: false})
        this.setState({showLoginFailMessage: true})
      }
    }
    else {
      this.setState({isLoggedIn: false})
      this.setState({username: ''})
      this.setState({showLoginFailMessage: false})
    }
    this.setState({password: ''})
    event.preventDefault()
  }

  render() {
    let editDiv
    let welcomeMessage = ''
    let loginFailDiv
    if (this.state.isLoggedIn) {
      editDiv = <div className="box edit">
                  <EditSession parentCallback={this.callbackFunctionSessions}/>
                </div>
      welcomeMessage = 'Welcome, ' + this.state.username
    }
    else { 
      editDiv = <div></div>
      welcomeMessage = ''
    }
    
    if (this.state.showLoginFailMessage && !this.state.isLoggedIn) {
      loginFailDiv = <p className="errormessage">login failed!</p>
    }
    else {
      loginFailDiv = <div></div>
    }

    const dayElements = daysOpen.map((day, index) => 
      <div key={index} className="box daylabel">{day}</div>  
    )
    const sessionElements = sessionTimes.map((session, index) => <div key={index} className="box timelabel">{session.start} - {session.end}</div>)
    
    return (
      <div className="app">
        <div className="box header">Timetable</div>
        <div className="box daylabel">Session Times</div>  
        {dayElements}
        {sessionElements}      

        <AllSessions filter={this.state.filter} />
        
        <div className="box login">
          <p>Staff Login</p>
          <div>
            <form className="login-form" onSubmit={this.handleLoginSubmit}>
              <label className="login-row1 login-column1" for="username">Username</label>
              <label className="login-row2 login-column1" for="password">Password</label>
              <input className="login-row1 login-column2" type="text" value={this.state.username} name="username" onChange={this.handleLoginInput}></input>
              <input className="login-row2 login-column2" type="password" value={this.state.password} name="password" onChange={this.handleLoginInput}></input>
              <button className="btn login-row3 login-column2">{this.state.isLoggedIn? 'Logout' : 'Login'}</button>
            </form>
            {loginFailDiv}
            <div name="welcomeMessage">{welcomeMessage}</div> 
          </div>
        </div>

        <div className="box filter">
          <Filter parentCallback={this.callbackFunctionFilter}/>
          </div>
        
        {editDiv}

        <div className="box footer"></div>

      </div>
    )
  }
}
export default App;
