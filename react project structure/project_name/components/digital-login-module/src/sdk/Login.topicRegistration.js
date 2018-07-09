import SDK from 'digital-sdk';
import Actions from 'digital-login-module/src/sdk/Login.actions';
import mapStateToProps from 'digital-login-module/src/sdk/Login.stateMapping';
import SDKConfig from 'digital-login-module/src/sdk/Login.sdk.config';


export default function() {
    SDK.registerToHub({
        Actions,
        mapModelStateToProps: mapStateToProps,
        actionType: SDKConfig
    });
}
