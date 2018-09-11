import SDK from 'digital-sdk';

const {messages} = SDK.commonActionTypes;
const ActionTypes = {
    ...messages,
    SET_GLOBAL_MESSAGE_NAME: 'SET_GLOBAL_MESSAGE_NAME',
    SET_GLOBAL_MESSAGE_INPUT_PARAMETERS: 'SET_GLOBAL_MESSAGE_INPUT_PARAMETERS',
    REDIRECT_TO_CSP_LOGIN: 'REDIRECT_TO_CSP_LOGIN',
    CLEAN_APPLICATION_LEVEL: 'CLEAN_APPLICATION_LEVEL',
    STORE_ROUTE_PATH: 'STORE_ROUTE_PATH'
};

export default ActionTypes;
