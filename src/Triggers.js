import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Widget from './Widget'

class Triggers extends Component {
    constructor() {
        super();
        this.state = {widgets: []}
    }
    add() {
        const widgets = this.state.widgets
        this.setState({
            widgets: widgets.concat(<Widget />)
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
                <button onClick={this.add.bind(this)}>add</button>
                <button onClick={this.remove.bind(this)}>remove</button>
                {this.state.widgets.map(function(widget, index) {
                    return widget
                })}
            </div>
        )
    }
}

export default Triggers;
