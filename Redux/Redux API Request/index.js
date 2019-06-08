import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { combineReducers, createStore } from 'redux';
import {applyMiddleware, compose} from 'redux'; // for API request
import { Provider } from 'react-redux';
import productsReducer from './reducers/products-reducer';
import userReducer from './reducers/users-reducer';
import thunk from 'redux-thunk';

const allReducer = combineReducers({
    products: productsReducer,
    user: userReducer
});

const allStoreEnhancer = compose (
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(
    allReducer, 
    {
        products:[{name:'iphone X', price:1600000}],
        user:'Steve Jobs'
    },
    allStoreEnhancer
);

ReactDOM.render(<Provider store={store}><App aRandomProps="a random props" /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
