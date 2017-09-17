import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
// import reducer from './modules/reducer';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  console.log('creating store');
  const middleware = [createMiddleware(client), reduxRouterMiddleware];

  let finalCreateStore;
  finalCreateStore = applyMiddleware(...middleware)(_createStore);
  const reducer = require('./modules/reducer');
  const store = finalCreateStore(reducer, data);


  if (false && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
