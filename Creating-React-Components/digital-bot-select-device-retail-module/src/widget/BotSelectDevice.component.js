import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BotSelectDeviceMainView from 'digital-bot-select-device-retail-module/src/widget/templates/BotSelectDevice.mainView';
import BotSelectDeviceProps from 'digital-bot-select-device-retail-module/src/widget/BotSelectDevice.propsProvider';

class BotSelectDeviceComponent extends Component {
    static get contextTypes() {
        return {
            policy: PropTypes.func,
            permissions: PropTypes.object,
            config: PropTypes.object
        };
    }

    constructor(props) {
        super(props);
        this.propsProvider = new BotSelectDeviceProps(this.context);
    }

    render() {
        return <BotSelectDeviceMainView {...this.propsProvider.getComponentProps(this.props)} />;
    }
}

export default BotSelectDeviceComponent;

