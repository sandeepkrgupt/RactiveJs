import SDK from 'digital-sdk';
import Actions from 'digital-agreement-summary-retail-module/src/sdk/AgreementSummary.actions';
import SDKConfig from '../sdk/AgreementSummary.sdk.config';

const {viewDataConnect} = SDK.DigitalConnect;
const {level, name} = SDKConfig;
const connect = viewDataConnect.connectWidget(level, name, Actions);

export {
    connect as default
};
