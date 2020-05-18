import React from 'react'
import App from '../App'
import { create } from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import EditSessions from '../../EditSession/EditSessions'




describe("Snapshot testing for App component", () => {
    test("snapshot test for App component", () => {
        let tree = create(<App />)
        expect(tree.toJSON()).toMatchSnapshot()
    })
})

describe("Test Login renders", () => {
    const wrapper = shallow(<App />)

    test("login form renders", () => {
        //const wrapper = shallow(<App />)
        expect(wrapper.find('form.login-form').exists()).toBe(true)
    })
    test("username field renders", () => {
        expect(wrapper.find('input[name="username"]').exists()).toBe(true)
    })
    test("password field renders", () => {
        expect(wrapper.find('input[name="password"]').exists()).toBe(true)
    })
})

describe("Test Login functionality", () => {

    test("username text updates state", () => {
        const wrapper = shallow(<App />)
        const username = 'admin'
        wrapper.find('input[name="username"]').simulate('change', {target: {name: 'username', value: username}})
        expect(wrapper.state('username')).toEqual(username)
    })
    test("password text updates state", () => {
        const wrapper = shallow(<App />)
        const password = 'password'
        wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: password}})
        expect(wrapper.state('password')).toEqual(password)
    })
    test("button text is 'Login' when component first renders", () => {
        const wrapper = shallow(<App />)
        const button = wrapper.find('button')
        expect(button.text()).toEqual('Login');
    })

    test("state reflects user is not logged in when component first renders", () => {
        const wrapper = shallow(<App />)
        expect(wrapper.state('isLoggedIn')).toEqual(false)
        expect(wrapper.state('username')).toEqual('')
        expect(wrapper.state('showLoginFailMessage')).toBe(false)
    })
    
    test("state changes when user is logged", () => {
        const user = 'admin'
        const pwd = 'password'
        const wrapper = shallow(<App />)
        login(user, pwd, wrapper)
        expect(wrapper.state('isLoggedIn')).toEqual(true)
        expect(wrapper.state('password')).toEqual('')
    })

    test("welcome message displayed when user is logged in", () => {
        const user = 'admin'
        const pwd = 'password'
        const wrapper = shallow(<App />)
        login(user, pwd, wrapper)
        const message = wrapper.find('div[name="welcomeMessage"]')
        expect(message.text()).toEqual("Welcome, " + user)
    })

    test("user is not logged in when credentails are incorrect", () => {
        const user = 'admin'
        const pwd = 'badpassword'
        const wrapper = shallow(<App />)
        login(user, pwd, wrapper)
        expect(wrapper.state('isLoggedIn')).toBe(false)
    })

    test("error message is displayed when credentials are incorrect", () => {
        const user = 'admin'
        const pwd = 'badpassword'
        const wrapper = shallow(<App />)
        login(user, pwd, wrapper)
        const errorMessage = wrapper.find('.errormessage').text()
        expect(wrapper.state('showLoginFailMessage')).toBe(true)
        expect(errorMessage).toEqual('login failed!')
    })
})

describe("Logout functionality", () => {
    beforeEach(() => {
        const user = 'admin'
        const pwd = 'password'
        const wrapper = shallow(<App />)
        login(user, pwd, wrapper)
    })

    test("logged in user can logout successfully", () => { 
        const wrapper = shallow(<App />)
        const form = wrapper.find('.login-form')
        form.simulate('submit', {preventDefault: () => {} })
        expect(wrapper.state('isLoggedIn')).toBe(false)
    })

    test("state changes when user logs out", () => { 
        const wrapper = shallow(<App />)
        const form = wrapper.find('.login-form')
        form.simulate('submit', {preventDefault: () => {} })
        expect(wrapper.state('username')).toBe('')
    })

    test("button text changes to 'login' when user logs out", () => { 
        const wrapper = shallow(<App />)
        const form = wrapper.find('.login-form')
        form.simulate('submit', {preventDefault: () => {} })
        const button = wrapper.find('button')
        expect(button.text()).toBe('Login')
    })

    test("username field clears when user logs out", () => { 
        const wrapper = shallow(<App />)
        const form = wrapper.find('.login-form')
        form.simulate('submit', {preventDefault: () => {} })
        const username = wrapper.find('input[name="username"]')
        expect(username.text()).toEqual('')
    })
})


describe("Edit Session component", () => {
    test("Edit Session component is not displayed App component renders for first time", () => {
        const user = 'admin'
        const pwd = 'password'
        const wrapper = shallow(<App />)
        const component = wrapper.find('.edit')
        expect(wrapper.find(EditSessions)).toHaveLength(0)
    })

    test("Edit Session component is displayed when user is logged in", () => {
        const user = 'admin'
        const pwd = 'password'
        const wrapper = shallow(<App />)
        login(user, pwd, wrapper)
        const component = wrapper.find('.edit')
        expect(wrapper.state('isLoggedIn')).toBe(true)
        expect(wrapper.find(EditSessions)).toHaveLength(1)
    })

    test("Edit Session component is not displayed after user logs out", () => {
        const user = 'admin'
        const pwd = 'password'
        const wrapper = shallow(<App />)
        login(user, pwd, wrapper)
        
        // logout
        const form = wrapper.find('.login-form')
        form.simulate('submit', {preventDefault: () => {} })
        
        const component = wrapper.find('.edit')
        expect(wrapper.find(EditSessions)).toHaveLength(0)
    })
})

function login(username, password, wrapper) {
    const fakeEvent = { preventDefault: () => {} }
    wrapper.find('input[name="username"]').simulate('change', {target: {name: 'username', value: username}})
    wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: password}})
    const form = wrapper.find('.login-form')
    form.simulate('submit', fakeEvent)
}







// * App.test.js * original
// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
