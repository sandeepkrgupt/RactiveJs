import React, {Component} from 'react';

class OverlayModal extends Component {
    constructor(props) {
        super(props);
        const {closeButton = true, closeLink = false, overlayActive = 'show'} = props;
        this.state = {
            closeButton,
            closeLink,
            overlayActive
        };
    }
    render() {
        const {props} = this;
        return (
            <div className={`${this.props.overlayActive} react-overlay-modal`}>
                <div className="modal-content">
                    {this.state.closeButton === true ? <span
                        role="link"
                        className="close glyphicon glyphicon-remove"
                        tabIndex="-1"
                        onClick={this.props.closeModal} /> : ''}

                    {props.children}

                    {this.state.closeLink === true ? <a
                        role="link"
                        onClick={this.props.closeModal}
                        tabIndex="-1"
                        className="close-link">
                        Close
                    </a> : ''}
                </div>
            </div>
        );
    }
}

export default OverlayModal;
