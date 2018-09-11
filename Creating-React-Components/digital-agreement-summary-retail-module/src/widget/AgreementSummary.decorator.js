import SDK from 'digital-sdk';
import Actions from 'digital-agreement-summary-retail-module/src/sdk/AgreementSummary.actions';
import defaultConfig from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.config';

const {ConnectedContainer} = SDK.DigitalComponents;
const ContainerDecorator = ConnectedContainer({
    config: {
        actionsClass: Actions,
        ...defaultConfig
    },
    propTypes: {
    }
});

export default ContainerDecorator;
