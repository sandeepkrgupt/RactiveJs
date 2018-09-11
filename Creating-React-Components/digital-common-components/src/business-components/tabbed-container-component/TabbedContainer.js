import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Tabs from './Tabs';
import TabLink from './TabLink';
import TabContent from './TabContent';


class TabbedContainer extends Component {
    render() {
        const {tabs = [], tabsClassname = '', handleSelect} = this.props;

        return (
            <Tabs className={tabsClassname} handleSelect={handleSelect}>
                <ul className="nav nav-tabs">
                    {tabs.map((tab) => {
                        return (
                            <TabLink key={tab.id} default={tab.default} to={tab.id} className={tab.tabLinkClassname}>
                                {tab.title}
                            </TabLink>
                        );
                    })}
                </ul>
                <div className="tabs-content">
                    {tabs.map((tab) => {
                        return (
                            <TabContent key={tab.id} for={tab.id} className={tab.tabContentClassname}>
                                {tab.getBodyTemplate()}
                            </TabContent>
                        );
                    })}
                </div>
            </Tabs>
        );
    }
}

TabbedContainer.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
    tabsClassname: PropTypes.string.isRequired
};

export default TabbedContainer;
