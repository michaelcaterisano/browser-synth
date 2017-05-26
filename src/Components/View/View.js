import React, { Component } from 'react';
import Synth from '../Synth/Synth'
import './view.css'

class View extends Component {
    render() {
        return (
            <div className='balls'>
                <Synth />
            </div>
        )
    }
}

export default View;
