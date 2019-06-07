import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { combineReducers, createStore } from 'redux';

function productsReducer(state = [], action) {
    return state;
}

function userReducer(state = '', action) {
    return state;
}

const allReducer = combineReducers({
    products: productsReducer,
    users: userReducer
})
const store = createStore(allReducer, {
    products:[{name:'iphone', price:100000}],
    users:'Apple'
});

const action = {
    type: 'ChangeState',
    payload: {
        newState: 'New State'
    }
};
store.dispatch(action);
console.log(store.getState());




ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
