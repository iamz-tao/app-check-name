import {createStore, applyMiddleware} from 'react-redux/node_modules/redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default () => {
  const store = createStore(reducer, applyMiddleware(thunk));
  return store;
};
