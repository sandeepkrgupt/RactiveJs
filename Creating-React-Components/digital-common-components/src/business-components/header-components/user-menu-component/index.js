import React, {Component} from 'react';


class UserMenuComponent extends Component {

    render() {
        if (!this.props.userData) {
            return (
                <div className="dropdown navbar-right">
                    <button
                        id="nav-anis-xs"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        className="navbar-inverse">
                        <span className="bg-primary btn-success" href="">Sign In</span>
                    </button>
                </div>
            );
        }
        return (
            <div className="dropdown navbar-right">
                <button
                    id="nav-anis-xs"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    className="navbar-inverse">
                    <span className="bg-primary btn-success" href="">
                        Hi, {this.props.userData.firstName} {this.props.userData.lastName}
                        <i className="fa fa-caret-down" />
                    </span>
                </button>
                <div className="dropdown-menu" aria-labelledby="nav-user">
                    <a href="#logoff" className="btn">Cerrar sesión <i className="fa fa-power-off" /> </a>
                </div>
            </div>
        );
    }
}

export default UserMenuComponent;
