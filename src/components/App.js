import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../styles/App.css';

import Nav from "./Nav";
import Logout from "./Logout";
import Login from "./Login";
import Canvas from "./Canvas";
import SignUp from "./SignUp";
import Homepage from "./Homepage";
import Gallery from "./Gallery";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Nav />
          <div className="app-content container">
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/signup" component={SignUp} />
              <Route path="/monstermash/:stage" component={Canvas} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  };
};

export default App;
