import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import Synth from '../Synth/Synth'
// import Poti from '../Poti/Poti'
import './triggers.css'

class Triggers extends Component {
    constructor() {
        super();
        this.state = {widgets: []}
    }
    add() {
        const widgets = this.state.widgets
        this.setState({
            widgets: widgets.concat(<Synth />)
        })
    }
    remove() {
        const widgets = this.state.widgets
        widgets.pop()
        this.setState({
            widgets: widgets
        })
    }
    componentWillMount() {
        console.log('will mount')
    }
    render() {
        return (
            <div>
                <div className="triggers-wrapper">
                    <div className="triggers-container">
                        <RaisedButton className='trigger' label="add" onClick={this.add.bind(this)}/>
                        <RaisedButton label="remove" onClick={this.remove.bind(this)} />
                    </div>
                </div>
                <div className="widgets-container">
                    {this.state.widgets.map(function(widget, index) {
                        return widget
                    })}
                </div>
            </div>
        )
    }
}

export default Triggers;
