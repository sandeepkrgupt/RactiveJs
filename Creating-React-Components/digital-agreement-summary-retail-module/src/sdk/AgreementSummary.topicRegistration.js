import SDK from 'digital-sdk';
import Actions from
    'digital-agreement-summary-retail-module/src/sdk/AgreementSummary.actions';
import mapStateToProps from
    'digital-agreement-summary-retail-module/src/sdk/AgreementSummary.stateMapping';
import SDKConfig from
    'digital-agreement-summary-retail-module/src/sdk/AgreementSummary.sdk.config';


export default function() {
    SDK.registerToHub({
        Actions,
        mapModelStateToProps: mapStateToProps,
        actionType: SDKConfig
    });
}

