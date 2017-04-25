import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Triggers from './Triggers'


class App extends Component {
    render () {
        return (
            <MuiThemeProvider>
                <Triggers />
            </MuiThemeProvider>
        )
    }
}

export default App;
