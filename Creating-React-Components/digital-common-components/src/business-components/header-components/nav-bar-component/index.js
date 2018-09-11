import React, {Component} from 'react';
import MainMenuItemsComponent from '../main-menu-items-component';
import LogoComponent from '../logo-component';
import UserMenuComponent from '../user-menu-component';
import MiniCartComponent from '../mini-cart-component';
import SubscriptionListComponent from '../subscription-list-component';

class NavBarComponent extends Component {

    render () {
        if (!this.props.isAnonymous && this.props.selectedCustomer && this.props.selectedCustomer.subscriptions) {
            return (
                <nav className="navbar navbar-inverse navbar-fixed-top navbar-logo-xs">
                    <div className="container">
                        <LogoComponent
                            isAnonymous={this.props.isAnonymous}
                            selectedSubscriber={this.props.selectedSubscriber}
                            subscriptions={this.props.selectedCustomer.subscriptions}
                            activeMenuItem={this.props.activeMenuItem}
                            src={this.props.logo.src}
                            alt={this.props.logo.alt}
                            href={this.props.logo.href} />
                        <div id="navbar" className="collapse navbar-collapse hidden-xs">
                            <UserMenuComponent
                                userData={this.props.individual} />
                            <MiniCartComponent />
                            <SubscriptionListComponent
                                selectedSubscriber={this.props.selectedSubscriber}
                                subscriptions={this.props.selectedCustomer.subscriptions}
                                activeMenuItem={this.props.activeMenuItem} />
                            <MainMenuItemsComponent
                                isAnonymous={this.props.isAnonymous}
                                roles={this.props.selectedSubscriber.roles}
                                menuItems={this.props.menuItems}
                                activeMenuItem={this.props.activeMenuItem}
                                setActiveMenuItem={this.props.setActiveMenuItem}
                            />
                        </div>
                    </div>
                </nav>
            );
        }
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top navbar-logo-xs">
                <div className="container">
                    <LogoComponent
                        isAnonymous={this.props.isAnonymous}
                        src={this.props.logo.src}
                        alt={this.props.logo.alt}
                        href={this.props.logo.href} />
                    <div id="navbar" className="collapse navbar-collapse hidden-xs">
                        <UserMenuComponent />
                        <MiniCartComponent />
                        <MainMenuItemsComponent
                            isAnonymous={this.props.isAnonymous}
                            menuItems={this.props.menuItems}
                            activeMenuItem={this.props.activeMenuItem}
                            setActiveMenuItem={this.props.setActiveMenuItem} />
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBarComponent;
