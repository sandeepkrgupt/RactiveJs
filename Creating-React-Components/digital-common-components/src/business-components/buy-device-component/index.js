import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BuyDeviceComponent extends Component {
    render() {
        return (
            <td className="td-equipo">
                <div className="product">
                    <i className="fa fa-check" />
                    <div className="loading-image" />
                    <img src={this.props.image} alt={this.props.name} className="img" />
                    <h2>{this.props.name}</h2>
                    <a onClick={this.props.onViewDetails} className="mas-info">{this.props.viewDetailsTitle}
                        <i className="fa fa-angle-right" />
                    </a>
                    <h3>{this.props.price}</h3>
                    {this.props.availability ? <div className="cucarda blue">
                        <span>{this.props.availability}</span></div> : null}
                    <h4>{this.props.priceSubTitle}</h4>
                </div>
                <a
                    onClick={this.props.onBuy}
                    className={`btn btn-success ${this.props.disabled ? 'disabled' : ''}`}>
                    <span>{this.props.buyTitle}</span>
                    <i
                        className="icon-tienda" />
                </a>
            </td>
        );
    }
}

BuyDeviceComponent.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    onBuy: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired,
    viewDetailsTitle: PropTypes.string.isRequired,
    buyTitle: PropTypes.string.isRequired,
    availability: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired
};

export default BuyDeviceComponent;
