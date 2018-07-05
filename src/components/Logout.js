import React, { Component } from 'react';
import '../styles/Logout.css';


class Logout extends Component {
  state = {
    token: localStorage.getItem('monstermash-id')
  }

  componentDidMount () {
    console.log('logout mounted')
    const { token } = this.state
    if (!token) {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div>
        Are you sure?
      </div>
    )
  }
}

export default Logout;
