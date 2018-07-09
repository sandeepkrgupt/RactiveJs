import React, {Component} from 'react';
import {bindAll} from 'lodash';
import {Utils} from 'digital-sdk';
import {Field, reduxForm} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import Messages from 'digital-login-module/src/widget/Login.i18n';
import Config from 'digital-login-module/src/widget/Login.config';
import DigitalComponents from 'digital-common-components';

const constraints = {
    user: {
        presence: {message: Messages.user.validation.required.defaultMessage}
    },
    password: {
        presence: {message: Messages.password.validation.required.defaultMessage}
    }
};
export class InnerComponent extends Component {

    submitLogin(values) {
        this.props.actions.doLogin(values.user, values.password);
    }

    render() {
        const {handleSubmit} = this.props;
        const {Button, InputBox} = DigitalComponents.DigitalControllerComponents;
        const userLabel = this.props.intl.formatMessage(Messages.user.label);
        const passwordLabel = this.props.intl.formatMessage(Messages.password.label);
        return (
            <div className="container">
                <h1><FormattedMessage {...Messages.pageTitle} /></h1>
                <form id="login-form" onSubmit={handleSubmit((values) => { this.submitLogin(values); })}>
                    <div className="content clearfix">
                        <div className="col-md-push-2 col-md-8">
                            <div className="row">
                                <div className="col-md-offset-0 col-md-8">
                                    <Field
                                        name="user"
                                        component={InputBox}
                                        props={{
                                            mandatory: Config.user.mandatory,
                                            label: userLabel,
                                            autoComplete: 'off',
                                            type: 'text',
                                            maxLength: Config.user.maxLength
                                        }}
                                        />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-offset-0 col-md-8">
                                    <Field
                                        name="password"
                                        component={InputBox}
                                        props={{
                                            mandatory: Config.password.mandatory,
                                            label: passwordLabel,
                                            autoComplete: 'off',
                                            type: 'password',
                                            maxLength: Config.password.maxLength
                                        }}
                                        />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="offset-2 col-md-8">
                                    <Button
                                        id="submitBtn"
                                        buttonLabel={Messages.submitBtn.defaultMessage}
                                        buttonType="submit"
                                        buttonClass="btn-primary pull-right"
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    validate: Utils.validate(constraints),
    form: 'login-form',
    initialValues: {
        user: 'Asmsa1',
        password: 'Asmsa1'
    }
})(InnerComponent);
