import SDK from 'digital-sdk';
import Actions from 'digital-bot-select-device-retail-module/src/sdk/BotSelectDevice.actions';
import SDKConfig from '../sdk/BotSelectDevice.sdk.config';

const {viewDataConnect} = SDK.DigitalConnect;
const {level, name} = SDKConfig;
const connect = viewDataConnect.connectWidget(level, name, Actions);

export {
    connect as default
};
