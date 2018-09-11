import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ErrorComponent extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-9">
                    <div className="big-message">
                        <h4><strong>¡Uy!</strong> {this.props.message}</h4>
                        <h5>
                            Llamá sin cargo al
                            <a href="tel:08002226116">0800 222 6116</a>
                            para continuar con tu compra.
                        </h5>
                    </div>
                </div>
            </div>
        );
    }
}

ErrorComponent.propTypes = {
    message: PropTypes.string.isRequired
};

export default ErrorComponent;
