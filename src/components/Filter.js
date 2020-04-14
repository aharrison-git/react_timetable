import React from 'react'

class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            all: false,
            none: true,
            samuraiWarriors: true,
            ninjaStars: true,
            juniorAdults: true,
        }
        this.handleButton = this.handleButton.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    
    handleCheckbox(event) {
        
        const target = event.target
        const name = target.name
        const value= target.checked
        console.log("checkbox name: " + [name] + ", value: " + value)
        this.setState({[name]: value})
        //this.props.parentCallback(this.state)
        //this.handleButton()
    }

    handleButton(event) {
        event.preventDefault()
        this.props.parentCallback(this.state)
        console.log("child:")
        console.log(this.state)
    }

    doNothing() {
        console.log("??")
    }

    handleChange(event) {
        this.setState({[event.target.name]:event.target.value})
    }

    render() {
        return (
        <div>
            <p>Filter</p>
            <div className="filter-checkbox">
                <form onSubmit={this.handleButton}>
                <input
                    type="checkbox"
                    name="samuraiWarriors"
                    checked={this.state.samuraiWarriors}
                    onChange={this.handleCheckbox}
                />
                <label>Samurai Warriors</label>
                <br/>

                <input
                    type="checkbox"
                    name="ninjaStars"
                    checked={this.state.ninjaStars}              
                    onChange={this.handleCheckbox}
                />
                <label>Ninja Stars</label>
                <br/>

                <input
                    type="checkbox"
                    name="juniorAdults"
                    checked={this.state.juniorAdults}              
                    onChange={this.handleCheckbox}
                />
                <label>Junior Adults</label>
                <br/>

                <button>Apply</button>
            </form>
            </div>
            
        </div>
        )
    }
}
//{onClick={this.handleCheckbox}
export default Filter
