import SDK from 'digital-sdk';

import Widget from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary';
import connect from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.connect';
import registerTopic from 'digital-agreement-summary-retail-module/src/sdk/AgreementSummary.topicRegistration';
import descriptor from '../digital-agreement-summary-retail-module.descriptor.json';

registerTopic();

const ConnectedWidget = connect(Widget);

const widgetObj = {
    Widget,
    ConnectedWidget,
    descriptor,
    id: descriptor.widgetId
};


export {
    widgetObj as default
};

SDK.exportGlobal(`amdocs.widgets.${widgetObj.id}`, widgetObj);
