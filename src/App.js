import React, { Component } from 'react';
import Form from './Form.js';

import './App.css';

class App extends Component {
  render() {
    return (
        <div className="wrapper">
            <div className="form">
                <Form />
            </div>
        </div>
    )
  }
}

export default App;
