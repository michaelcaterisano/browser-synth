import React, { Component } from 'react';
import './Widget.css';

class Widget extends Component {
    render() {
        return (
            <div className="widget">
                <div className="red"></div>
                <div className="blue"></div>
                <div className="red"></div>
                <div className="blue"></div>
                <div className="red"></div>
                <div className="blue"></div>
                <div className="red"></div>
                <div className="blue"></div>
            </div>
        )
    }
}

export default Widget
