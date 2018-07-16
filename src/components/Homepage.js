import React, { Component } from 'react';
import '../styles/Homepage.css';

import api from "../lib/api";

class Homepage extends Component {
  state = {
    token: localStorage.getItem('monstermash-id'),
    user: {}
  }

  componentDidMount () {
    const { token } = this.state
    if (!token) {
      return this.props.history.push('/login');
    };

    if (token === undefined) {
      return this.props.history.push('/login');
    }

    api.getUser(token)
    .then(user =>{
      this.setState({
        user
      });
    })
    .catch(err => console.log(err))
  }

  render() {
    const { user } = this.state
    return (
      <div>
        <h1 className="title">Hi {user.username}!</h1>
      </div>
    )
  };
};

export default Homepage;