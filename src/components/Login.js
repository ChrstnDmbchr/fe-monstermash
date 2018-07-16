import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/Login.css';

import api from "../lib/api";

class Logout extends Component {
  state = {
    username: '',
    password: '',
    token: localStorage.getItem('monstermash-id'),
    user: {},
    authFailed: false,
  }

  changeUsername = e => {
    this.setState({ username: e.target.value })
  };

  changePassword = e => {
    this.setState({ password: e.target.value })
  };

  userSignIn = () => {
    api.userSignIn(this.state.username, this.state.password)
    .then(res=> {
      if (res.status === 401 || res.status === 404) {
        return this.setState({ 
          username: '',
          password: '',
          authFailed: true,
        });
      }
      return res.json();
    })
    .then(result => {
      if (!result) return;

      this.setState({ 
        token: result.token,
        username: '',
        password: ''
      });
      localStorage.setItem('monstermash-id', result.token);
      this.props.history.push('/')
    })
    .catch(err => console.log(err));
  };

  closeError = () => {
    return this.setState({
      authFailed: false
    });
  };

  componentDidMount () {
    if (this.state.token) {
      this.props.history.push('/')
    }
  }

  render() {
    const { username, password, authFailed } = this.state
    return (
      <div className="container app-login">
        <h1 className="title">Login to Monster Mash!</h1>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input onChange={this.changeUsername} className="input" type="text" value={username}/>
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input onChange={this.changePassword} className="input" type="password" value={password}/>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button onClick={this.userSignIn} className="button nav-button">Submit</button>
          </div>
        </div>

        <h2>Don't have an account? Sign Up <Link to="/signup">Here!</Link></h2>
        <br />

        {authFailed ?         
          <div className="notification is-danger">
            <button onClick={this.closeError} className="delete"></button>
            <strong>Authentication failed, please try again.</strong>
          </div> :
          <div />}
      </div>
    )
  };
};

export default Logout;



