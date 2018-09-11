import React, {Component} from 'react';
import SubscriptionListMobileViewComponent from '../subscription-list-mobile-view-component';

class LogoComponent extends Component {
    render() {
        let subscriptionList = null;
        if (!this.props.isAnonymous && this.props.subscriptions) {
            subscriptionList = (<SubscriptionListMobileViewComponent
                selectedSubscriber={this.props.selectedSubscriber}
                subscriptions={this.props.subscriptions}
                isAnonymous={this.props.isAnonymous}
            />);
        }
        return (
            <div className="navbar-header">
                <button
                    type="button"
                    className="navbar-toggle collapsed"
                    aria-expanded="false"
                    aria-controls="navbar"
                    id="menu-toggle">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
                <a className="navbar-brand" href={this.props.href}>
                    <img src={this.props.src} alt={this.props.alt} />
                </a>
                {subscriptionList}
            </div>
        );
    }
}

export default LogoComponent;
