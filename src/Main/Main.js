
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import AppBar from 'material-ui-next/AppBar';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import Drawer from 'material-ui-next/Drawer';
import { MenuItem, MenuList } from 'material-ui-next/Menu';
import { withStyles } from 'material-ui-next/styles';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import Button from 'material-ui-next/Button';
import IconButton from 'material-ui-next/IconButton';

const RouteWithSubRoutes = route => (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
);


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: '250px',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
});
class Main extends Component {
    
    constructor(props) {
        super(props);

        this.state = {}
        this.store = props.auth;
    }

    render() {
        const { routes, classes } = this.props
        if(this.store.isRequireLogin) {
            return <Redirect to='/login'/>;
        }

        if(this.store.isAuthorized) {
            return (
                <div>
                    <AppBar position="static">
                        <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Contract
                        </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer open={true}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}>
                        <MenuItem>List</MenuItem>
                        <MenuItem>Create</MenuItem>
                    </Drawer>
                    <div>
                    {
                        routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
                    }
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
};

export default withStyles(styles)(inject(['auth'])(observer(Main)));