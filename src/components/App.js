import React, { Component } from 'react';
import '../styles/App.css';

class App extends Component {
  state = {
    username: '',
    password: '',
    user: localStorage.getItem('monstermash-id'),
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
      return res.json()
    })
    .then(result => {
      this.setState({ user: result.id })
      localStorage.setItem('monstermash-id', result.id)
    })
    .catch(err => console.log(err))
  };

  componentDidMount () {
    const { localUser } = this.state;
    if (localUser) {
      fetch(`http://localhost:3000/api/user/${localUser}`)
      .then(res => {
        return res.json();
      })
      .then(user => {
        this.setState({ user })
      })
      .catch(err => console.log(err))
    };
  };

  render() {
    const { user } = this.state
    return !user ? (
      <div className="App">
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input onChange={this.changeUsername} className="input" type="text" placeholder="Text input"/>
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input onChange={this.changePassword} className="input" type="password" placeholder="Text input"/>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button onClick={this.userSignIn} className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button is-text">Cancel</button>
          </div>
        </div>
      </div>
    ) : (
      <div>{user}</div>
    )
  }
}

export default App;
