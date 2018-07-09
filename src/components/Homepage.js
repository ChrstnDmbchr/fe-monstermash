import React, { Component } from 'react';
import '../styles/Homepage.css';

class App extends Component {
  state = {
    token: localStorage.getItem('monstermash-id')
  }

  componentDidMount () {
    if (!this.state.token) {
      return this.props.history.push('/login');
    };
  }

  render() {
    return (
      <div>hi!</div>
    )
  };
};

export default App;