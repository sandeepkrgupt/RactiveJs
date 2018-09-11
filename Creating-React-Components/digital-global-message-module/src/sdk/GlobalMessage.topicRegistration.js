import SDK from 'digital-sdk';
import Actions from
'digital-global-message-module/src/sdk/GlobalMessage.actions';
import mapStateToProps from
'digital-global-message-module/src/sdk/GlobalMessage.stateMapping';
import SDKConfig from
'digital-global-message-module/src/sdk/GlobalMessage.sdk.config';


export default function() {
    SDK.registerToHub({
        Actions,
        mapModelStateToProps: mapStateToProps,
        actionType: SDKConfig
    });
}
