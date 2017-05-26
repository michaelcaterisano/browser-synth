import React, { Component } from 'react';
import Synth from '../Synth/Synth'
import './view.css'

class View extends Component {
    render() {
        return (
            <div className='mysynth'>
                <Synth />
            </div>
        )
    }
}

export default View;
