import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import getRoutes from '../shared/routes';
import ApiClient from './ApiClient';
import {Provider} from 'react-redux';
import createStore from '../shared/redux/create';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';

const client = new ApiClient();
const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('app');
const store = createStore(_browserHistory, client, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);

/* render (
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('app')
);*/
global.__CLIENT__ = true;
const component = (
    <Router render={(props) =>
        <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />
    } history={history}>
        {getRoutes(store)}
    </Router>
);

ReactDOM.render(
    <Provider store={store} key="provider">
        {component}
    </Provider>,
    dest
);

if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
        console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
    }
}