import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { inject, observer } from 'mobx-react';
import routes from './Router';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import AppBar from 'material-ui/AppBar';

const RouteWithSubRoutes = route => (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
);

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
       console.log(window.sessionStorage.getItem("currentUser"));
    }
  render() {
    return (
      <div className="App">
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </div>
    );
  }
}

export default inject(['routing'])(withRouter(observer(App)));
