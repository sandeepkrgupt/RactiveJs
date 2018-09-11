import SDK from 'digital-sdk';
import Actions from 'digital-bot-select-device-retail-module/src/sdk/BotSelectDevice.actions';
import defaultConfig from 'digital-bot-select-device-retail-module/src/widget/BotSelectDevice.config';

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
