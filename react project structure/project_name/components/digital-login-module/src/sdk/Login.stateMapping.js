import SDK from 'digital-sdk';
import SDKConfig from './Login.sdk.config';

const {viewDataConnect} = SDK.DigitalConnect;
const {level, name} = SDKConfig;
const mapStateToProps = viewDataConnect.entityMapper(level, name).mapStateToProps;

export {
    mapStateToProps as default
};
