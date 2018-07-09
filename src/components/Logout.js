import React, { Component } from 'react';
import '../styles/Logout.css';


class Logout extends Component {
  state = {
    token: localStorage.getItem('monstermash-id')
  };

  logout = () => {
    localStorage.removeItem('monstermash-id');
    return this.props.history.push('/login');
  };

  goBack = () => {
    return this.props.history.goBack();
  };

  componentDidMount () {
    const { token } = this.state
    if (!token) {
      return this.props.history.push('/login');
    };
  };

  render() {
    return (
      <div>
        <h1 className="title">Logout from Monster Mash?</h1>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button onClick={this.logout} className="button nav-button">Logout</button>
          </div>
          <div className="control">
            <button onClick={this.goBack} className="button is-text">Go Back</button>
          </div>
        </div>
      </div>
    )
  };
};

export default Logout;
