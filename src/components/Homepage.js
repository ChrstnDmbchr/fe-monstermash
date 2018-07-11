import React, { Component } from 'react';
import '../styles/Homepage.css';

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

    fetch(`http://localhost:3000/api/user`, {
      headers: {"Authorisation": `Bearer ${token}`}
    })
    .then(res => {
      return res.json();
    })
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