import React, {Component} from 'react';

import TabbedContainer from './TabbedContainer';

class TabbedContainerWrapper extends Component {
    render() {
        const {tabsClassname = ''} = this.props;

        const tabs = [
            {
                id: 'overview',
                title: 'Overview',
                tabLinkClassname: 'overview-class-link',
                tabContentClassname: 'overview-class-content',
                getBodyTemplate: () => {
                    return 'Overview body';
                }
            },
            {
                id: 'specifications',
                title: 'Specifications',
                tabLinkClassname: 'specifications-class-link',
                tabContentClassname: 'specifications-class-content',
                getBodyTemplate: () => {
                    return 'Specifications body';
                }
            },
            {
                id: 'reviews',
                title: 'Reviews',
                tabLinkClassname: 'reviews-class-link',
                tabContentClassname: 'reviews-class-content',
                getBodyTemplate: () => {
                    return 'Reviews body';
                }
            }
        ];

        return (
            <TabbedContainer tabs={tabs} tabsClassname={tabsClassname} />
        );
    }
}

export default TabbedContainerWrapper;
