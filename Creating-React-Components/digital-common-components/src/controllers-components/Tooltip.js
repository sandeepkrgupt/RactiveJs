import React, {Component} from 'react';

class Tooltip extends Component {
    render() {
        const {icon} = this.props;
        return (
            <span className="tooltip-wrap">
                {icon}
                <div className="tooltip fade bottom in">
                    <div className="tooltip-inner">
                        {this.props.children}
                    </div>
                </div>
            </span>
        );
    }

}

export default Tooltip;
