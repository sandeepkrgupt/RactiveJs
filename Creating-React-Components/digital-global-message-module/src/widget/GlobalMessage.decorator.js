import SDK from 'digital-sdk';
import Actions from 'digital-global-message-module/src/sdk/GlobalMessage.actions';
import defaultConfig from 'digital-global-message-module/src/widget/GlobalMessage.config';
import {MessageTypes} from 'digital-sdk/lib/const/messageTypes';
import {Success, Loader, ErrorView, Info, Warning, Fatal, Redirect} from
  'digital-global-message-module/src/widget/templates/GlobalMessage.subcomponents';

const {ConnectedContainer} = SDK.DigitalComponents;
const ContainerDecorator = ConnectedContainer({
    propTypes: {},
    config: {
        // if set to: false, widget will not handle any message. Default: true
        handleMessages: true,
        // use to handle all message, applicable for a global messages widget
        handleAllMessages: true,
        autoClear: true,
        actionsClass: Actions,
        messageComponents: {
            [MessageTypes.SUCCESS]: Success,
            [MessageTypes.WAIT]: Loader,
            [MessageTypes.INFO]: Info,
            [MessageTypes.WARNING]: Warning,
            [MessageTypes.ERROR]: ErrorView,
            [MessageTypes.FATAL]: Fatal
        },
        ...defaultConfig
    }
});

export default ContainerDecorator;
