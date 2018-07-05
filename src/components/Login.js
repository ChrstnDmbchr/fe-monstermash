import React, { Component } from 'react';
import '../styles/Login.css';


class Logout extends Component {
  state = {
    username: '',
    password: '',
    token: localStorage.getItem('monstermash-id'),
    user: {}
  }

  changeUsername = e => {
    this.setState({ username: e.target.value })
  };

  changePassword = e => {
    this.setState({ password: e.target.value })
  };

  userSignIn = () => {
    fetch(`http://localhost:3000/api/user/signin`,{
      method: 'POST',
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
      headers: {"Content-type": "application/json"}
    })
    .then(res=> {
      if (res.status === 401 || res.status === 404) {
        this.setState({ 
          username: '',
          password: ''
        });
        return console.log('auth failed');
      }
      return res.json();
    })
    .then(result => {
      this.setState({ 
        token: result.token,
        username: '',
        password: ''
      });
      localStorage.setItem('monstermash-id', result.token);
      return fetch(`http://localhost:3000/api/user`, {
        headers: {"Authorisation": `Bearer ${result.token}`}
      })
    })
    .then(res => {
      return res.json();
    })
    .then(user => {
      this.setState({ user });
    })
    .catch(err => console.log(err));
  };

  componentDidMount () {
    if (this.state.token) {
      this.props.history.push('/')
    }
  }

  render() {
    const { username, password } = this.state
    return (
      <div className="container app-login">
        <h1 className="title">Login to Monster Mash</h1>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input onChange={this.changeUsername} className="input" type="text" placeholder="Text input" value={username}/>
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input onChange={this.changePassword} className="input" type="password" placeholder="Text input" value={password}/>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button onClick={this.userSignIn} className="button nav-button">Submit</button>
          </div>
          <div className="control">
            <button className="button is-text">Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Logout;



