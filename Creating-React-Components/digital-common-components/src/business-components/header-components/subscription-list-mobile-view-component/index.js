import React, {Component} from 'react';


class SubscriptionListMobileViewComponent extends Component {

    renderMenuItems() {
        return this.props.subscriptions.map((subscription, index) => {
            let activeAttribute = null;
            if (this.props.selectedSubscriber.subscriberId === subscription.subscriberId && index === 0) {
                activeAttribute = 'active';
            }
            const menuItem = (<li
                className={activeAttribute}
                key={subscription.subscriberId}>
                <a href="">{subscription.subscriberId}</a></li>);
            return (
                menuItem
            );
        });
    }

    render() {
        if (this.props.activeMenuItem) {
            return (
                <div />
            );
        }
        let selectedSubscriber = this.props.selectedSubscriber.subscriberId;
        if (!selectedSubscriber) {
            selectedSubscriber = this.props.subscriptions[0].subscriberId;
        }
        return (
            <div className="dropdown visible-xs">
                <button
                    id="nav-anis-xs"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    className="btn">
                    {selectedSubscriber}
                    <i className="fa fa-angle-down" />
                </button>
                <div className="dropdown-menu" aria-labelledby="nav-anis-xs">
                    <i className="fa fa-caret-up" />
                    <ul>
                        {this.renderMenuItems()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default SubscriptionListMobileViewComponent;
