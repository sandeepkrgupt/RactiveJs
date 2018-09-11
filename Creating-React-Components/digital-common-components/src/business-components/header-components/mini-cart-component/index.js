import React, {Component} from 'react';


class MiniCartComponent extends Component {

    render() {
        return (
            <div className="dropdown navbar-right">
                <button
                    id="nav-user"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    className="btn-user">
                    <i className="fa fa-shopping-cart" />
                </button>
            </div>
        );
    }
}

export default MiniCartComponent;
