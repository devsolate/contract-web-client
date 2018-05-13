import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { inject, observer } from 'mobx-react';
import routes from './Router';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

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
        this.props.auth.init()
    }

    render() {
        return (
            <div className="App">
                {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
            </div>
        );
    }
}

export default inject(['auth'])(withRouter(observer(App)));
