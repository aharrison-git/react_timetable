import React from 'react'
import groupData from '../data'

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
    const divClass = "box session" + this.props.sessionNumber
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
      var groupText = textArray[0]
      console.log("text: " + groupText)
      return textArray
  }

  getClassForGroupComponent(session, group) {
    let baseClass = ""
    var groupClass = ""
    var display = ""
    console.log("group: " + group)
    switch (group) {
      case "Ninja Stars":
        display = (this.props.filter.ninjaStars) ? "" : " hidden"
        groupClass = baseClass + " ninjastars " + display
        console.log("case ninja stars")
        break
      
      case "Samurai Warriors":
        display = (this.props.filter.samuraiWarriors) ? "" : " hidden"
        groupClass = baseClass + " samuraiwarriors" + display
        console.log("case samurai warriors")
        break
      
      case "Junior Adults":
        display = (this.props.filter.juniorAdults) ? "" : " hidden"
        groupClass = baseClass + " junioradults" + display
        console.log("case junior adults")
        break

      default: 
        groupClass = baseClass + " ??"
        console.log("case default")
        break
    }
    console.log("full class: " + groupClass)
    return groupClass
  }

}

  export default SessionComponent