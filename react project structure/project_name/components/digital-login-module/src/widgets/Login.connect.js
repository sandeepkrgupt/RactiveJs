import SDK from 'digital-sdk';
import Actions from 'digital-login-module/src/sdk/Login.actions';
import SDKConfig from '../sdk/Login.sdk.config';

const {viewDataConnect} = SDK.DigitalConnect;
const {level, name} = SDKConfig;
const connect = viewDataConnect.connectWidget(level, name, Actions);

export {
    connect as default
};
