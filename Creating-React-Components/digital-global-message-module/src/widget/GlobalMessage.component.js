import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {GlobalMessageSubComponent} from 'digital-global-message-module/src/widget/templates/GlobalMessage.subcomponents';
import GlobalMessageProps from 'digital-global-message-module/src/widget/GlobalMessage.propsProvider';

class GlobalMessageComponent extends Component {
    static get contextTypes() {
        return {
            policy: PropTypes.func,
            permissions: PropTypes.object,
            config: PropTypes.object
        };
    }

    constructor(props) {
        super(props);
        this.propsProvider = new GlobalMessageProps(this.context);
    }

    render() {
        return <GlobalMessageSubComponent {...this.propsProvider.getComponentProps(this.props)} />;
    }
}

export default GlobalMessageComponent;
