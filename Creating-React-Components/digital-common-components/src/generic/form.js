import React, {Component} from 'react';

export const INITIALIZED = 'initialized';
export const SUBMITTED = 'submitted';

export default class DigitalForm extends Component {
    constructor() {
        super();

        this.state = {
            status: INITIALIZED
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            status: INITIALIZED
        });
    }

    getSubmitMarkup() {
        if (this.props.noHiddenSubmit) {
            return '';
        }
        const {submitCaption = 'Submit'} = this.props;
        return (
            <button type="submit" hidden="hidden">{submitCaption}</button>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const {handleSubmit} = this.props;

        this.setState({
            status: SUBMITTED
        }, () => handleSubmit(this.state));
    }

    render() {
        const {noFormTag, name, action, children} = this.props;
        if (noFormTag) {
            return (
                <div className="fix-flex">
                    {children}
                </div>
            );
        }
        return (
            <form
                className="st-form"
                name={name}
                onSubmit={this.handleSubmit}
                action={action || ''}>
                {children}
                {this.getSubmitMarkup()}
            </form>
        );
    }
}
