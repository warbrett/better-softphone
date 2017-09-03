import React, { Component } from 'react';
import { FloatingActionButton, TextField } from 'material-ui';

import './App.css';

import { apiFetch } from '../lib/fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      numbers: [],
    }
  }
  componentDidMount() {
    apiFetch('/numbers')
    .then((numbers) => {
      this.setState({ numbers });
    })
    .catch(err => {
      console.log('fetch err', err);
    });
  }
  onDialNumber = (one, two, three) => {
    debugger;
  }
  handleEnterNumber = (evt) => {
    this.setState({
      number: evt.target.value,
    });
  }
  handleDial = () => {
    console.log('dialing', this.state.number);
  }
  render() {
    console.log(this.state.numbers);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Caller Demo</h2>
          <TextField
            value={this.state.number}
            onChange={this.handleEnterNumber}
          />
          <FloatingActionButton
            onClick={this.handleDial}
          />
        </div>
      </div>
    );
  }
}

export default App;
