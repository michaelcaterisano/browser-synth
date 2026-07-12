import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import View from './Components/View/View'

class App extends Component {
    render () {
        return (
            <MuiThemeProvider>
                <View />
            </MuiThemeProvider>
        )
    }
}

export default App;
