import React, {Component} from 'react';
import PropTypes from 'prop-types';

import LoginMainView from 'digital-login-module/src/widget/templates/Login.mainView';
import LoginProps from 'digital-login-module/src/widget/Login.propsProvider';

class LoginComponent extends Component {
    static get contextTypes() {
        return {
            policy: PropTypes.func,
            permissions: PropTypes.object,
            config: PropTypes.object
        };
    }

    constructor(props) {
        super(props);
        this.propsProvider = new LoginProps(this.context);
    }

    render() {
        return <LoginMainView {...this.propsProvider.getComponentProps(this.props)} />;
    }
}

export default LoginComponent;

