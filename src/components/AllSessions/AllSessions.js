import React from 'react'
import SessionComponent from '../SessionComponent/SessionComponent'
import groupData from '../../static/data.js'

function AllSessions(props) {
    const numberList = []
    for (var i = 0; i < groupData.length; i++) {
        numberList.push(groupData[i]["session"] )
    }
    const numberListSet = new Set(numberList) // convert to set to remove duplicates
    const numberListArray = Array.from(numberListSet) // convert back to array so I can use map method later

    const allSessionsList = numberListArray.map((number, index) => 
        <SessionComponent key={index} sessionNumber={number} filter={props.filter} />
    )
    return <React.Fragment>{allSessionsList}</React.Fragment> 
}

export default AllSessions