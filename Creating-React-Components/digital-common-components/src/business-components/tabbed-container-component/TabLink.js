import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TabLink extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.handleSelect(this.props.to, this.props.namespace);

        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render() {
        const active = this.props.isActive ? 'active' : '';

        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
        return (
            <li className="nav-item">
                <a
                    onClick={this.handleClick}
                    className={`nav-link ${active}`}
                    id={`op${this.props.to}`}>
                    {this.props.children}
                </a>
            </li>
        );
    }
}

TabLink.propTypes = {
    /* eslint-disable react/forbid-prop-types */
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    handleSelect: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    namespace: PropTypes.string.isRequired
};

export default TabLink;
