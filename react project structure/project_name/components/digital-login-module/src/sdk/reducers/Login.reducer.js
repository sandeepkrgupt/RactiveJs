import SDK from 'digital-sdk';
import ActionTypes from 'digital-login-module/src/sdk/Login.actionTypes';
import SDKConfig from 'digital-login-module/src/sdk/Login.sdk.config';
import {REQUEST_SUFFIX} from 'digital-sdk/lib/actions/types/const';

const initialState = {};

const reducer = (state = initialState, action) => {
    const {type, payload = {}} = action;
    let newState;
    switch (type) {
    case ActionTypes.CLEAN_APPLICATION_LEVEL:
    case `${ActionTypes.FETCH_USER_INFO}${REQUEST_SUFFIX}`:
        newState = {
            ...initialState,
            viewDataParams: state.viewDataParams
        };
        break;
    case ActionTypes.SET_USER_INFO:
        newState = {
            ...state,
            ...payload
        };
        break;
    default:
        newState = state;
        break;
    }
    return newState;
};

const registrationFunc = () => {
    const {level, name} = SDKConfig;
    SDK.registerLevelReducer(level, name, reducer);
};

export {
    reducer as default,
    registrationFunc as registerReducer
};
