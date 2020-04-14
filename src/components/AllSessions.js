import React from 'react'
import SessionComponent from './SessionComponent'
import groupData from '../data'

function AllSessions(props) {
    const numberList = []
    for (var i = 1; i <= groupData.length; i++) {
        numberList.push(i)
    }
    const allSessionsList = numberList.map((number) => 
        <SessionComponent sessionNumber={number} filter={props.filter} />
    )
    return <React.Fragment>{allSessionsList}</React.Fragment> 
}

export default AllSessions