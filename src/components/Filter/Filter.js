import React from 'react'
import './Filter.css'

class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            all: false,
            none: true,
            maths: true,
            english: true,
            physics: true,
            chemistry: true,
            music: true
        }
        this.handleButton = this.handleButton.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    
    handleCheckbox(event) {
        const target = event.target
        const name = target.name
        const value= target.checked
        this.setState({[name]: value})
       }

    handleButton(event) {
        event.preventDefault()
        this.props.parentCallback(this.state)
        }


    handleChange(event) {
        this.setState({[event.target.name]:event.target.value})
    }

    render() {
        return (
        <div className="filter box">
            <p>Filter</p>
            <div>
                <form className="filter-checkbox" onSubmit={this.handleButton}>
                    <div className="checkbox1">
                        <input 
                            type="checkbox"
                            name="maths"
                            checked={this.state.maths}
                            onChange={this.handleCheckbox}
                        />
                        <label>Maths</label>
                    </div>
                    <div className="checkbox2">
                        <input
                            type="checkbox"
                            name="english"
                            checked={this.state.english}              
                            onChange={this.handleCheckbox}
                        />
                        <label>English</label>
                    </div>
                    <div className="checkbox3">
                        <input
                            type="checkbox"
                            name="physics"
                            checked={this.state.physics}     
                            onChange={this.handleCheckbox}
                        />
                        <label>Physics</label>
                    </div>

                    <div className="checkbox4">
                        <input
                            type="checkbox"
                            name="chemistry"
                            checked={this.state.chemistry}     
                            onChange={this.handleCheckbox}
                        />
                        <label>Chemistry</label>
                    </div>
                    
                    <div className="checkbox5">
                        <input
                            type="checkbox"
                            name="music"
                            checked={this.state.music}     
                            onChange={this.handleCheckbox}
                        />
                        <label>Music</label>
                    </div>

                <button className="button">Apply</button>
            </form>
            </div>
            
        </div>
        )
    }
}
export default Filter
