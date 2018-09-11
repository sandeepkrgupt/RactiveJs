/*
**
** Confirmation Message Box Component in React
** respective visual design @ components:
** succes message @ https://app.zeplin.io/project/57eb63cf5a848f293013df07/screen/5914413a1af242732918333e
** error message @ https://app.zeplin.io/project/57eb63cf5a848f293013df07/screen/590af38a77259fab660df70f
** @author AMANK
** date 12-May-2017
**
*/
import React, {Component} from 'react';


class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
    }
    handleCloseMessage(e) {
        e.preventDefault();
        this.setState({visible: false});
        this.props.handleCloseMessage(e);
    }
    render() {
        const props = this.props;
        if (props.messageType === 'success') {
            return (
                <div
                    className={'react-confirmation-message container'}
                    style={{display: (props.visible ? 'block' : 'none')}}>
                    <div className="success-message row message-box">
                        <div className="col-1">
                            <i className="material-icons right">done</i>
                        </div>
                        <div className="col-10">
                            {props.children}
                        </div>
                        <div className="col-1">
                            <a
                                role="link"
                                className="close-message"
                                tabIndex={-1}
                                onClick={this.handleCloseMessage}>
                                <i className="material-icons right">clear</i>
                            </a>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div
                className={'react-confirmation-message container'}
                style={{display: props.visible ? 'block' : 'none'}}>
                <div className="error-message row message-box">
                    <div className="col-2">
                        <i className="material-icons">block</i>
                    </div>
                    <div className="col-8">
                        {props.children}
                    </div>
                    <div className="col-2">
                        <a role="link" className="close-message" tabIndex={-1} onClick={this.handleCloseMessage}>
                            <i className="material-icons right">clear</i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageBox;
