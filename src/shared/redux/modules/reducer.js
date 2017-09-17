import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import counter from './counter';
import posts from './posts';


import {reducer as form} from 'redux-form';

const appReducer = combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    form,
    multireducer: multireducer({
        counter1: counter,
        counter2: counter,
        counter3: counter
    }),
    posts
});
const rootReducer = (state, action) => {
    if (action.type === 'redux-example/auth/LOGOUT_SUCCESS') {
        state = undefined; // eslint-disable-line no-param-reassign
    }
    return appReducer(state, action);
};
export default rootReducer;