import React, {Component} from 'react';
import MenuItem from '../../../controllers-components/header-components/menu-item-component';

class MainMenuItemsComponent extends Component {

    renderMenuItems() {
        return this.props.menuItems.map((item, index) => {
            let menuItem;
            let active = '';
            if (item.name === this.props.activeMenuItem) {
                active = 'active';
            }
            if (!item.roles || (item.roles.length > 0 &&
                !this.props.isAnonymous && item.roles.indexOf(this.props.roles[0] > -1))) {
                menuItem = (<MenuItem
                    key={index.toString()}
                    href={item.URL}
                    name={item.name}
                    active={active}
                    setActiveMenuItem={this.props.setActiveMenuItem} />);
            }
            return menuItem;
        });
    }

    render() {
        return (
            <ul className="nav navbar-nav navbar-right">
                {this.renderMenuItems()}
            </ul>
        );
    }
}

export default MainMenuItemsComponent;

