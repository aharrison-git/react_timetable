import React from 'react'
import { create } from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import EditSessions from '../EditSessions'
//import App from '../../App'

describe("Snapshot for EditSessions component", () => {
    test("snapshot test for EditSessions component", () => {
        let tree = create(<EditSessions />)
        expect(tree.toJSON()).toMatchSnapshot()
    })
})

describe("Form renders", () => {
    test("Class select", () => {
        const wrapper = shallow(<EditSessions />)
        const classSelect = wrapper.find('[name="class"]')
        expect(classSelect).toHaveLength(1)
    })

    test("Day select", () => {
        const wrapper = shallow(<EditSessions />)
        const classSelect = wrapper.find('[name="day"]')
        expect(classSelect).toHaveLength(1)
    })

    test("Time select", () => {
        const wrapper = shallow(<EditSessions />)
        const classSelect = wrapper.find('[name="time"]')
        expect(classSelect).toHaveLength(1)
    })

    test("Action select", () => {
        const wrapper = shallow(<EditSessions />)
        const classSelect = wrapper.find('[name="action"]')
        expect(classSelect).toHaveLength(1)
    })
})

describe("Select box changes state", () => {
    test("Class select changes state", () => {
        const wrapper = shallow(<EditSessions />)
        const classSelect = wrapper.find('[name="class"]')
        classSelect.simulate('change', {target: {name: "class", value: 'Chemistry'}})
        expect(wrapper.state('class')).toEqual('Chemistry')
    })

    test("Day select changes state", () => {
        const wrapper = shallow(<EditSessions />)
        const daySelect = wrapper.find('[name="day"]')
        daySelect.simulate('change', {target: {name: "day", value: 'Tuesday'}})
        expect(wrapper.state('day')).toEqual('Tuesday')
    })

    test("Time select changes state", () => {
        const wrapper = shallow(<EditSessions />)
        const timeSelect = wrapper.find('[name="time"]')
        timeSelect.simulate('change', {target: {name: "time", value: '12.00 - 12.45'}})
        expect(wrapper.state('time')).toEqual('12.00 - 12.45')
    })

    test("Action select changes state", () => {
        const wrapper = shallow(<EditSessions />)
        const actionSelect = wrapper.find('[name="class"]')
        actionSelect.simulate('change', {target: {name: "action", value: 'Add'}})
        expect(wrapper.state('action')).toEqual('Add')
    })
})


describe("Add session", () => {
    const parentCallback = jest.fn()
    test("add new session", () => {
        const wrapper = mount(<EditSessions parentCallback={parentCallback}/>)
        
        // verify that session does not exist - session 52 = session 5, day 2
        const sessions = wrapper.state('data')
        var sessionExists = false
        sessions.forEach((session) => {
            if (session["session"] == 52) {
                sessionExists = true
            }
        })
        expect(sessionExists).toBe(false)

        // add new session
        submit_form(wrapper, 'Physics', 'Tuesday', '12.00 - 12.45', 'Add')
        console.log(wrapper.state('data'))
        const data = wrapper.state('data')
        var newSession = ''
        data.forEach((element) => {
            if (element["session"] == 52) {
                newSession = element["groupName"]
            }
        });
        expect(wrapper.state('actionSuccess')).toBe(true)
        expect(newSession).toEqual('Physics')
    })

    test("Error message when trying to add session that already exists", () => {
        const wrapper = mount(<EditSessions parentCallback={parentCallback}/>)
        
        // verify that session already exists- session 61 = session 6, day 1
        const sessions = wrapper.state('data')
        var sessionExists = false
        sessions.forEach((session) => {
            if (session["session"] == 61 && session["groupName"] == 'Chemistry') {
                sessionExists = true
            }
        })
        expect(sessionExists).toBe(true)
        
        const data_before = wrapper.state('data')

        // try to add new session
        submit_form(wrapper, 'Chemistry', 'Monday', '1.30 - 2.15', 'Add')
        const data_after = wrapper.state('data')
        expect(wrapper.state('actionSuccess')).toBe(false)
        expect(data_before).toEqual(data_after)
        expect(wrapper.find('p.error')).toHaveLength(1)
        
    })
})

describe("Delete session", () => {
    const parentCallback = jest.fn()
    test("delete existing session", () => {
        const wrapper = mount(<EditSessions parentCallback={parentCallback}/>)
        
        // verify that session exists - session 14 = session 1, day 4
        const sessions = wrapper.state('data')
        var sessionsFound = 0
        sessions.forEach((session) => {
            if (session["session"] == 14 && session["groupName"] == "English") {
                sessionsFound++
            }
        })
        expect(sessionsFound).toBe(1)

        // delete existing session
        submit_form(wrapper, 'English', 'Thursday', '9.00 - 9.45', 'Delete')
        const data = wrapper.state('data')
        sessionsFound = 0
        data.forEach((element) => {
            if (element["session"] == 14 && element["groupName"] == "English") {
                sessionsFound++
            }
        });
        expect(wrapper.state('actionSuccess')).toBe(true)
        expect(sessionsFound).toEqual(0)
    })

    test("Error message when trying to delete session that doesn't exist", () => {
        const wrapper = mount(<EditSessions parentCallback={parentCallback}/>)
        
        // verify that session doesn't exist- session 25 = session 2, day 5
        const sessions = wrapper.state('data')
        var sessionsFound = 0
        sessions.forEach((session) => {
            if (session["session"] == 25 && session["groupName"] == 'Maths') {
                sessionsFound++
            }
        })
        expect(sessionsFound).toEqual(0)
        
        const data_before = wrapper.state('data')

        // try to delete session
        submit_form(wrapper, 'Chemistry', 'Friday', '9.45 - 10.30', 'Delete')
        const data_after = wrapper.state('data')
        expect(wrapper.state('actionSuccess')).toBe(false)
        expect(data_before).toEqual(data_after)
        expect(wrapper.find('p.error')).toHaveLength(1)
        
    })
})

function submit_form(wrapper, subject, day, time, action) {
    const classSelect = wrapper.find('[name="class"]')
    const daySelect = wrapper.find('[name="day"]')
    const timeSelect = wrapper.find('[name="time"]')
    const actionSelect = wrapper.find('[name="action"]')
    const form = wrapper.find('.editform')

    classSelect.simulate('change', {target: {name: 'class', value: subject}} )
    daySelect.simulate('change', {target: {name: 'day', value: day}})
    timeSelect.simulate('change', {target: {name: 'time', value: time}})
    actionSelect.simulate('change', {target: {name: 'action', value: action}})
    form.simulate('submit', {preventDefault: () => {} })
        
}
