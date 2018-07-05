import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../styles/App.css';

import Nav from "./Nav"
import Logout from "./Logout"
import Login from "./Login"
import Canvas from "./Canvas"

class App extends Component {
  state = {
    username: '',
    password: '',
    token: localStorage.getItem('monstermash-id'),
    user: {},
  }

  render() {
    
    return (
      <BrowserRouter>
        <div className="app">
          <Nav />
            <div className="app-content container">
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/monstermash/:stage" component={Canvas} />
              </Switch>
            </div>
        </div>
      </BrowserRouter>
      )
  }
}

export default App;
