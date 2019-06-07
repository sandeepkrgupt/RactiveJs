import {UPDATE_USER} from '../actions/users-action';

export default function userReducer(state = '', {type, payload}) { // es6 destructuring feature
    switch(type) {
        case UPDATE_USER: 
            return payload.user;
        default :
            return state;
    }
}

/* Above and below are same in meaning
export default function userReducer(state = '', action) { // es6 destructuring feature
    switch(action.type) {
        case UPDATE_USER: 
            return action.payload.user;
        default :
            return state;
    }
}
*/