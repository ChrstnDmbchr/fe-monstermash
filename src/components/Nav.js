import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

class Nav extends Component {

  render() {
    return(
      <nav className="nav">
        <img className="nav-logo" src={require('../assets/logo.png')} alt="logo"/>
        <div className="nav-item">
          <Link to={'/'}><a className="button nav-button">Gallery</a></Link>
        </div>
        <div className="nav-close-logo-left nav-item">
          <Link to={'/monstermash/new'}><a className="button nav-button">New Monster Mash!</a></Link>
        </div>
        <div className="nav-close-logo-right nav-item">
          <Link to={'/monstermash/contine'}><a className="button nav-button">Continue Monster Mash!</a></Link>
        </div>
        <div className="nav-item">
          <Link to={'/logout'}><a className="button nav-button">Logout</a></Link>
        </div>
      </nav>
    )
  }
}

export default Nav;
