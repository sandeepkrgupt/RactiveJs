import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

import { combineReducers, createStore } from 'redux';

function productsReducer(state = [], action) {
    return state;
}

function userReducer(state = '', action) {
    switch(action.type) {
        case 'updateUser': 
            return action.payload;
    }
    return state;   
}

const allReducer = combineReducers({
    products: productsReducer,
    user: userReducer
})
const store = createStore(
    allReducer, 
    {
        products:[{name:'iphone X', price:1600000}],
        user:'Steve Jobs'
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const action = {
    type: 'ChangeState',
    payload: {
        newState: 'New State'
    }
};
const updateUserAction = {
    type: 'updateUser',
    payload: {
        user: 'Bill Gates'
    }
};
// console.log(store.getState());
store.dispatch(updateUserAction);
store.dispatch(action);





//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
