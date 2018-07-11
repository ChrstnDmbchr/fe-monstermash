import React, { Component } from 'react';
import '../styles/Gallery.css';

class Gallery extends Component {
  state = {
    token: localStorage.getItem('monstermash-id'),
  }

  componentDidMount () {
    const { token } = this.state
    if (!token) {
      return this.props.history.push('/login');
    };
  }
  
  render() {
    return (
      <div>Gallery</div>
    )
  };
};

export default Gallery;