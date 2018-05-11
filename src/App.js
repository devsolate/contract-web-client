import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { inject, observer } from 'mobx-react';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const routes = [
    {
      path: "/register",
      component: Register
    },
    {
      path: "/login",
      component: Login
    }
];

const RouteWithSubRoutes = route => (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </div>
    );
  }
}

export default inject(['routing'])(observer(App));
