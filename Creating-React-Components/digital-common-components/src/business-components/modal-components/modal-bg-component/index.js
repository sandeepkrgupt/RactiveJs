import React, {Component} from 'react';

class ModalBg extends Component {
    render () {
        return (
            <div>
                {this.props.isModalOpen ? <div className="modal-backdrop fade in modal-backdrop-msg" /> : null}
            </div>
        );
    }
}

export default ModalBg;
