
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';

const RouteWithSubRoutes = route => (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
  
class Main extends Component {
    
    constructor(props) {
        super(props);

        this.state = {}
        this.store = props.auth;
    }

    render() {
        const { routes } = this.props
        if(this.store.isRequireLogin) {
            return <Redirect to='/login'/>;
        }

        if(this.store.isAuthorized) {
            return (
                <div>
                    <AppBar
                        title="Contract"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                    {
                        routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
                    }
                </div>
            )
        } else {
            return <div></div>
        }
    }
};

export default inject(['auth'])(observer(Main));;