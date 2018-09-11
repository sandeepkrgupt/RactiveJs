import React, {Component} from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typed: ''
        };
    }

    onChange(event) {
        this.setState({
            typed: event.target.value
        });
    }

    render () {
        return (
            <div
                className="modal modal-msg modal-white fade"
                id={this.props.modalId ? this.props.modalId : null}
                tabIndex="-1"
                role="dialog"
                style={this.props.styleInlineModal}
                aria-labelledby="modalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            {this.props.modalHeader}
                        </div>
                        <div className="modal-body">
                            {this.props.modalBody}
                        </div>
                        {this.props.modalFooter ? <div className="modal-footer">
                            {this.props.modalFooter}
                        </div> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
