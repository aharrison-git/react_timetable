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
      sessions: {}
    }
    this.callbackFunctionFilter = this.callbackFunctionFilter.bind(this)
    this.callbackFunctionSessions = this.callbackFunctionSessions.bind(this)
  }

  callbackFunctionFilter(filters) {
    this.setState({filter: filters})
    }

  callbackFunctionSessions(sessionData) {
    this.setState({sessions: sessionData})
    }


render() {
    return (
      <div className="app">
        <div className="box header">Header</div>
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
        
        <div className="box footer">Footer</div>

        <div className="box filter">
          <Filter parentCallback={this.callbackFunctionFilter}/>
          </div>
        <div className="box edit">
            <EditSession parentCallback={this.callbackFunctionSessions}/>
          </div>
      </div>
    )
  }
}
export default App;
