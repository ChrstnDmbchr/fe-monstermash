import React, { Component } from 'react';
import '../styles/Login.css';


class Logout extends Component {
  state = {
    username: '',
    password: '',
    token: localStorage.getItem('monstermash-id'),
    userExists: false
  }

  changeUsername = e => {
    this.setState({ username: e.target.value })
  };

  changePassword = e => {
    this.setState({ password: e.target.value })
  };

  userSignUp = () => {
    if (!this.state.username.length || !this.state.password.length) return;

    fetch(`http://localhost:3000/api/user/signup`,{
      method: 'POST',
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
      headers: {"Content-type": "application/json"}
    })
    .then(res=> {
      if (res.status === 400) {
        return this.setState({ 
          username: '',
          password: '',
          userExists: true,
        });
      };

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

  goBack = () => {
    return this.props.history.goBack();
  };

  closeError = () => {
    this.setState({
      userExists: false
    });
  };

  componentDidMount () {
    if (this.state.token) {
      this.props.history.push('/');
    };
  };

  render() {
    const { username, password, userExists } = this.state
    return (
      <div className="container app-login">
        <h1 className="title">Sign up to Monster Mash!</h1>
        <div className="field">
          <label className="label">Please enter a username</label>
          <div className="control">
            <input onChange={this.changeUsername} className="input" type="text" placeholder="Text input" value={username}/>
          </div>
        </div>

        <div className="field">
          <label className="label">Please enter a password</label>
          <div className="control">
            <input onChange={this.changePassword} className="input" type="password" placeholder="Text input" value={password}/>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button onClick={this.userSignUp} className="button nav-button">Submit</button>
          </div>
          <div className="control">
            <button onClick={this.goBack} className="button is-text">Go Back</button>
          </div>
        </div>
        <br />

        {userExists ?         
          <div className="notification is-danger">
            <button onClick={this.closeError} className="delete"></button>
            <strong>Username already exists, please enter another</strong>
          </div> :
          <div />}

      </div>
    )
  };
};

export default Logout;



