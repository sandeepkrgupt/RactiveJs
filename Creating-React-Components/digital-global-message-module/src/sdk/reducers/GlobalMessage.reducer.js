import SDK from 'digital-sdk';

import ActionTypes from 'digital-global-message-module/src/sdk/GlobalMessage.actionTypes';
import SDKConfig from 'digital-global-message-module/src/sdk/GlobalMessage.sdk.config';

const initialState = {};

const reducer = (state = initialState, action) => {
    const {type, payload = {}} = action;
    let newState;
    switch (type) {
    case ActionTypes.SET_GLOBAL_MESSAGE_NAME:
        newState = {
            ...state,
            name: payload.name
        };
        break;
    case ActionTypes.SET_GLOBAL_MESSAGE_INPUT_PARAMETERS:
    case ActionTypes.STORE_ROUTE_PATH:
        newState = {
            ...state,
            ...payload
        };
        break;
    case ActionTypes.CLEAN_APPLICATION_LEVEL:
        newState = {
            ...initialState,
            viewDataParams: state.viewDataParams
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
