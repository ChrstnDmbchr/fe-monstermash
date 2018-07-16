import React, { Component } from 'react';
import '../styles/Homepage.css';

import api from "../lib/api";

class Homepage extends Component {
  state = {
    token: localStorage.getItem('monstermash-id'),
    user: {},
    loading: true,
  }

  componentDidMount () {
    const { token } = this.state
    if (!token) {
      return this.props.history.push('/login');
    };
    
    api.getUser(token)
    .then(user =>{
      this.setState({
        user,
        loading: false
      });
    })
    .catch(err => console.log(err))
  }

  render() {
    const { user, loading } = this.state
    return loading ? (
      <div>
        <h1>Loading...</h1>
      </div>
    ):(
      <div>
        <div>
          <h1 className="title">Hi {user.username}!</h1>
          <br />
          <h1 className="title">Welcome to</h1>
          <img className="title-logo" src={require('../assets/logo.png')} alt="logo" />
        </div>
        <p className="title-text subtitle">Monster Mash is a drawing game where people will mash their drawings together to create a brand new Monster!</p>
        <p className="title-text subtitle">Have a look below at the options you have!</p>
        <div className="title-new">
          <h1 className="title">New Monster Mash!</h1>
          <div className="title-new-grid">
            <p className="subtitle">Select this options to start a new Monster Mash! You will always be asked to draw the head of the monster as this is the start of a new chain!</p>
            <img className="title-new-grid-img" src={require('../assets/newmash.png')} alt="" />
          </div>
        </div>

        <div className="title-continue">
          <h1 className="title">Continue Monster Mash!</h1>
          <div className="title-continue-grid">
            <div>
              <img className="title-continue-grid-img" src={require('../assets/continuemash-body.png')} alt="" />
              <img className="title-continue-grid-img" src={require('../assets/continuemash-legs.png')} alt="" />
            </div>
            <p className="subtitle">Select this options to continue an existing Monster Mash! You will be given one that you have not yet contributed to and as a result this will either be the body or the legs of the monster so pay attention to what you have to draw!</p>
          </div>
        </div>

        <div className="title-gallery">
          <h1 className="title">Gallery!</h1>
          <div className="title-gallery-grid">
            <p className="subtitle">Here you can see all the completed Monster Mashes! There are two options here, you can look at your Monster Mashes, these are all the ones that you have contributed to or you can look at the Global Gallery which will show ALL the completed Monster Mashes!</p>
            <img className="title-gallery-grid-img" src={require('../assets/gallery.png')} alt="" />
          </div>
        </div>
      </div>
    )
  };
};

export default Homepage;