import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import { MuiThemeProvider, createMuiTheme } from 'material-ui-next/styles';
import store from './stores'; 

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const stores = {
    routing: routingStore,
    ...store
};
const history = syncHistoryWithStore(browserHistory, routingStore);

const themeV1 = createMuiTheme({
    
});

ReactDOM.render(
    <Provider {...stores}>
      <Router history={history}>
        <MuiThemeProvider theme={themeV1}>
            <App />
        </MuiThemeProvider>
      </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
