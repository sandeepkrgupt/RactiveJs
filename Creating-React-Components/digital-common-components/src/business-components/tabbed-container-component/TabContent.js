import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TabContent extends Component {
    canRenderChildren() {
        return this.props.isVisible;
    }

    render() {
        const visible = this.props.isVisible ? 'visible' : '';

        return (
            <div className={`tab ${visible}`}>
                {this.props.isVisible && (
                    this.props.children
                )}
            </div>
        );
    }
}

TabContent.propTypes = {
    isVisible: PropTypes.bool.isRequired
};

export default TabContent;
