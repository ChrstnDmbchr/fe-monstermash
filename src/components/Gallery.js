import React, { Component } from 'react';
import '../styles/Gallery.css';

import api from "../lib/api"
import Mash from "./Mash";

class Gallery extends Component {
  state = {
    token: localStorage.getItem('monstermash-id'),
    user: {},
    mashes: [],
    galleryView: 'user',
    loading: true,
  }

  galleryAll = () => {
    this.setState({
      galleryView: 'all'
    });
  };

  galleryUser = () => {
    this.setState({
      galleryView: 'user'
    });
  };

  componentDidMount () {
    const { token } = this.state
    if (!token) {
      return this.props.history.push('/login');
    };

    api.getUser(token)
    .then(user =>{
      this.setState({
        user
      });
    })
    .catch(err => console.log(err));

    api.getAllMashes()
    .then(allMashes => {
      const { mashes } = allMashes
      this.setState({
        mashes,
        loading: false,
      })
    })
    .catch(err => console.log(err))
  };

  render() {
    const { user, mashes, galleryView, loading } = this.state;
    return loading ? (
      <div>
        <h1 className="animated infinite bounce">Loading...</h1>
      </div>
    ):(
      <div className="gallery">
        <h1 className="title">Gallery</h1>
        <h2 className="subtitle">{galleryView === 'user' ? `So ${user.username}, Let's see what you've helped to create!` : 'Monsters from around the globe!'}</h2>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button onClick={this.galleryUser} className="button nav-button">Your Monster Mashes!</button>
          </div>
          <div className="control">
            <button onClick={this.galleryAll} className="button nav-button">Global Gallery</button>
          </div>
        </div>
        <div className="gallery-area">
          {galleryView === 'user' ? 
            mashes.filter(mash => {
              return mash.users.indexOf(user.id) !== -1
            }).map(mash => {
              return <Mash key={mash._id} mash={mash} />
            })
          :
            mashes.map(mash => {
              return <Mash key={mash._id} mash={mash} />
            })}
        </div>
      </div>
    )
  };
};

export default Gallery;