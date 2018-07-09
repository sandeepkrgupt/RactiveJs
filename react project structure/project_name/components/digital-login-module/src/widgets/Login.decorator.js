import SDK from 'digital-sdk';
import Actions from 'digital-login-module/src/sdk/Login.actions';
import defaultConfig from 'digital-login-module/src/widget/Login.config';

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
