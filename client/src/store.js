//FLOW
//index.js -->App.js --> createStore --> Reducer --> return a state data to the store

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
//createStore([reducers],{initial values}, enhancers including middleware)
//'thunk' is a middleware.
//break down into several small thunking will improve performance when you write data into the store

//split thunk into smaller pieces in an array
const middleware = [thunk];
const store = createStore(
  rootReducer,
  {},
  compose(
    //thunking enhancement
    applyMiddleware(...middleware),
    //allows redux devtools extension
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
