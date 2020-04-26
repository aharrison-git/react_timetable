import React from 'react';
import './App.css';
import Filter from './components/Filter'
import AllSessions from './components/AllSessions'
import EditSession from './components/EditSessions'
import groupTypes from './GroupTypes'

class App extends React.Component {
  constructor() {
    super()
    const groups = groupTypes.map((group, index) => ({group: true}) )
    this.state = {filter: {
      samuraiWarriors: true,
      ninjaStars: true,
      juniorAdults: true
      }, 
      sessions: {},
      isLoggedIn: false,
      username: '',
      password: '',
      showLoginFailMessage: false
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
      this.setState({isLogged: false})
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
    let buttonText = ''
    let welcomeMessage = ''
    let loginFailDiv
    if (this.state.isLoggedIn) {
      editDiv = <div className="box edit">
                  <EditSession parentCallback={this.callbackFunctionSessions}/>
                </div>
      buttonText = 'Logout'
      welcomeMessage = 'Welcome, ' + this.state.username
    }
    else { 
      editDiv = <div></div>
      buttonText = 'Login'
      welcomeMessage = ''
    }
    
    if (this.state.showLoginFailMessage && !this.state.isLoggedIn) {
      loginFailDiv = <div><p className="errormessage">login failed!</p></div>
    }
    else {
      loginFailDiv = <div></div>
    }

    return (
      <div className="app">
        <div className="box header">Timetable</div>
        <div className="box daylabel item2"></div>
        <div className="box daylabel item3">Monday</div>
        <div className="box daylabel item4">Tuesday</div>
        <div className="box daylabel item5">Wednesday</div>
        <div className="box daylabel item6">Thursday</div>
        <div className="box daylabel item7">Friday</div>
        <div className="box daylabel item8">Saturday</div>
        <div className="box timelabel item9">9.00-9.45</div>
        <div className="box timelabel item10">9.45-10.30</div>
        <div className="box timelabel item11">10.30-11.15</div>
        <div className="box timelabel item12">11.15-12.00</div>        
        <div className="box timelabel item13">12.00-12.45</div>
        <div className="box timelabel item14">12.45-01.30</div>        
        <div className="box timelabel item15">01.30-02.15</div>
        <div className="box timelabel item16">03.30-04.15</div>        
        <div className="box timelabel item17">04.15-05.00</div>
        <div className="box timelabel item18">05.00-05.45</div>        
        <div className="box timelabel item19">05.45-06.30</div>
        <div className="box timelabel item20">06.30-07.15</div>        
        <div className="box timelabel item21">07.15-08.00</div>
        <div className="box timelabel item22">08.00-09.30</div>        

        <AllSessions filter={this.state.filter} />
        
        <div className="box login">
          <p>Staff Login</p>
          <form onSubmit={this.handleLoginSubmit}>
            <label>Username
              <input type="text" value={this.state.username} name="username" onChange={this.handleLoginInput}></input>
            </label>
            <br/>

            <label>Password
              <input type="password" value={this.state.password} name="password" onChange={this.handleLoginInput}></input>
            </label>
            <br/>
            <button>{buttonText}</button>

          </form>
          {loginFailDiv}
          {welcomeMessage}
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
