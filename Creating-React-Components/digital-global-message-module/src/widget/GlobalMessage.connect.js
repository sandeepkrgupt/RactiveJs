import SDK from 'digital-sdk';
import Actions from 'digital-global-message-module/src/sdk/GlobalMessage.actions';
import SDKConfig from '../sdk/GlobalMessage.sdk.config';

const {viewDataConnect} = SDK.DigitalConnect;
const {level, name} = SDKConfig;
const connect = viewDataConnect.connectWidget(level, name, Actions);

export {
    connect as default
};
