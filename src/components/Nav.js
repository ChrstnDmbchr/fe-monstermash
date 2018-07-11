import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

class Nav extends Component {

  render() {
    return(
      <nav className="nav">
        <img className="nav-logo" src={require('../assets/logo.png')} alt="logo"/>
        <div className="nav-item">
          <Link className="button nav-button" to={'/gallery'}>Gallery</Link>
        </div>
        <div className="nav-close-logo-left nav-item">
          <Link className="button nav-button" to={'/monstermash/new'}>New Monster Mash!</Link>
        </div>
        <div className="nav-close-logo-right nav-item">
          <Link className="button nav-button" to={'/monstermash/continue'}>Continue Monster Mash!</Link>
        </div>
        <div className="nav-item">
          <Link className="button nav-button" to={'/logout'}>Logout</Link>
        </div>
      </nav>
    )
  };
};

export default Nav;
