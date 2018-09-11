import SDK from 'digital-sdk';
import Actions from
'digital-bot-select-device-retail-module/src/sdk/BotSelectDevice.actions';
import mapStateToProps from
'digital-bot-select-device-retail-module/src/sdk/BotSelectDevice.stateMapping';
import SDKConfig from
'digital-bot-select-device-retail-module/src/sdk/BotSelectDevice.sdk.config';


export default function() {
    SDK.registerToHub({
        Actions,
        mapModelStateToProps: mapStateToProps,
        actionType: SDKConfig
    });
}
