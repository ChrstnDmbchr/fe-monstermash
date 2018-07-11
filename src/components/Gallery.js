import React, { Component } from 'react';
import '../styles/Gallery.css';

class Gallery extends Component {
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
    .catch(err => console.log(err));
  };

  render() {
    const { user } = this.state;
    return (
      <div className="gallery">
        <h1 className="title">Gallery</h1>
        <h2 className="subtitle">So {user.username}, Let's see what you've made!</h2>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button onClick={this.userSignUp} className="button nav-button">Your Monster Mashes!</button>
          </div>
          <div className="control">
            <button onClick={this.goBack} className="button nav-button">Global Gallery</button>
          </div>
        </div>
        <div className="gallery-area">
          <h1>h1</h1>
          <h1>h1</h1>
          <h1>h1</h1>
          <h1>h1</h1>
          <h1>h1</h1>
          <h1>h1</h1>
          <h1>h1</h1>
          <h1>h1</h1>
          <h1>h1</h1>
        </div>
      </div>
    )
  };
};

export default Gallery;