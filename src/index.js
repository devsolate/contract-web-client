import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './stores'; 

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const stores = {
    routing: routingStore,
    ...store
};
const history = syncHistoryWithStore(browserHistory, routingStore);


ReactDOM.render(
    <Provider {...stores}>
      <Router history={history}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
      </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
