import React, {Component} from 'react';

class UserDetailsComponent extends Component {
    render() {
        return (
            <div>
                <span className="user-name">{this.props.userName}</span>
                <span className="user-status"><strong>{this.props.status}</strong>{this.props.dateString}</span>
            </div>
        );
    }
}

export default UserDetailsComponent;
