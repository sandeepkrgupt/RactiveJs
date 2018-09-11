import {SUCCESS_SUFFIX, REQUEST_SUFFIX, FAILURE_SUFFIX} from 'digital-sdk/lib/actions/types/const';
import SDK from 'digital-sdk';

import ActionTypes from 'digital-bot-select-device-retail-module/src/sdk/BotSelectDevice.actionTypes';
import SDKConfig from 'digital-bot-select-device-retail-module/src/sdk/BotSelectDevice.sdk.config';

const initialState = {};

const reducer = (state = initialState, action) => {
    const {type, payload = {}} = action;
    let newState;
    switch (type) {
    case ActionTypes.SET_BOT_SELECT_DEVICE_NAME:
        newState = {
            ...state,
            name: payload.name
        };
        break;
    case ActionTypes.SET_BOT_SELECT_DEVICE_INPUT_PARAMETERS:
    case `${ActionTypes.GET_DEVICE_DETAILS}`:
    case `${ActionTypes.ADD_PLAN_DETAIL}`:
    case `${ActionTypes.UPDATE_BOT_SELECT_DEVICE_DATA}`:
    case `${ActionTypes.NAVIGATE_TO_CONFIGURE_BOT}`:
        newState = {
            ...state,
            ...payload
        };
        break;
    case `${ActionTypes.BACK_TO_SELECT_PLAN_SCREEN}`:
    case `${ActionTypes.ADD_DEVICE_DETAIL}`:
    case `${ActionTypes.NAVIGATE_TO_SELECT_DEVICE}`:
        newState = {
            ...state,
            ...payload,
            byodFlag: false
        };
        break;
    case `${ActionTypes.GET_DEVICE_DETAILS}${REQUEST_SUFFIX}`:
        newState = {
            ...state,
            ...payload,
            isLoading: true
        };
        break;
    case `${ActionTypes.GET_DEVICE_DETAILS}${SUCCESS_SUFFIX}`:
        newState = {
            ...state,
            ...payload,
            isSuccess: true,
            isLoading: false
        };
        break;
    case `${ActionTypes.GET_DEVICE_DETAILS}${FAILURE_SUFFIX}`:
        newState = {
            ...state,
            ...payload,
            isSuccess: false,
            isLoading: false
        };
        break;
    case ActionTypes.CLEAN_DATA:
        newState = {
            systemMessages: [],
            sharedMessages: [],
            viewDataParams: state.viewDataParams,
            privateMessages: []
        };
        break;
    case ActionTypes.CLEAN_ORDER_LEVEL:
        newState = {
            ...initialState,
            viewDataParams: state.viewDataParams
        };
        break;
    case ActionTypes.UPDATE_DEVICES_FILTER:
        newState = {
            ...state,
            filterOptions: payload.filterOptions
        };
        break;
    case ActionTypes.UPDATE_DEVICE_SEARCH:
        newState = {
            ...state,
            searchText: payload.searchText
        };
        break;
    case ActionTypes.SAVE_DEFAULT_FILTER:
        newState = {
            ...state,
            filterDefaultOptions: payload.filterDefaultOptions
        };
        break;
    case ActionTypes.GET_FILTER_CONFIGURATION:
        newState = {
            ...state,
            filterDefaultOptionsCount: payload.filterDefaultOptionsCount,
            showFilter: payload.showFilter
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
