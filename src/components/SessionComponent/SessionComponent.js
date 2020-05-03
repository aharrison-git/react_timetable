import React from 'react'
import groupData from '../../static/data.js'

class SessionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.getGroupText = this.getGroupText.bind(this)
    this.getClassForGroupComponent = this.getClassForGroupComponent.bind(this)
    this.getClassString = this.getClassString.bind(this)   
    this.sessionsDisplayed = this.sessionsDisplayed.bind(this) 
  }

 
  render() {
    const classString = this.getClassString(this.props.sessionNumber)
    const groupText = this.getGroupText(this.props.sessionNumber)
    const divClass = "box session" + this.getTimeCode(this.props.sessionNumber) + " day" + this.getDayCode(this.props.sessionNumber)
    const numberList = []
    for (var i = 1; i <=classString.length; i++) {
        numberList.push(i)
    }
    
    const sessionsToDisplay = this.sessionsDisplayed(classString, numberList.length)
    const sessionResults = numberList.map((number) =>
      <li key={number} className={classString[number-1]} style={{height: `calc(100% / ${sessionsToDisplay})`}}>{groupText[number-1]}</li>
    )
    return(
      <div className={divClass}> 
          {sessionResults}
      </div>
    )
  }

  getTimeCode(sessionCode) {
    const sessionCodeString = sessionCode.toString()
    return sessionCodeString.charAt(0)
  }

  getDayCode(sessionCode) {
    const sessionCodeString = sessionCode.toString()
    return sessionCodeString.charAt(1)
  }

  sessionsDisplayed(cssClassArray, totalItems) {
    var itemsToDisplay = 0
    for (var i = 0; i < cssClassArray.length; i++) {
      if (!(cssClassArray[i].includes("hidden") ) ) {
        itemsToDisplay++
      }
    }
    return itemsToDisplay
  }

  getClassString(sessionNumber) {
    var groups = groupData.filter(group => group.session === sessionNumber)
    var classStringArray = []
    groups.forEach((group) => 
      classStringArray.push(this.getClassForGroupComponent(group.session, group.groupName))
    )
    return classStringArray
  }

  getGroupText(sessionNumber) {
      var filterResults = groupData.filter(group => group.session === sessionNumber)
      var textArray = []
      filterResults.forEach((group) =>
        textArray.push(group.groupName)
      )
      return textArray
  }

  getClassForGroupComponent(session, group) {
    let baseClass = ""
    var groupClass = ""
    var display = ""
    switch (group) {
      case "English":
        display = (this.props.filter.english) ? "" : " hidden"
        groupClass = baseClass + " english " + display
        break
      
      case "Maths":
        display = (this.props.filter.maths) ? "" : " hidden"
        groupClass = baseClass + " maths " + display
        break
      
      case "Physics":
        display = (this.props.filter.physics) ? "" : " hidden"
        groupClass = baseClass + " physics " + display
        break

        case "Chemistry":
        display = (this.props.filter.chemistry) ? "" : " hidden"
        groupClass = baseClass + " chemistry " + display
        break

        case "Music":
          display = (this.props.filter.music) ? "" : " hidden"
          groupClass = baseClass + " music " + display
          break

      default: 
        groupClass = baseClass + " ??"
        break
    }
    return groupClass
  }

}

  export default SessionComponent