import SDK from 'digital-sdk';

import Widget from 'digital-global-message-module/src/widget/GlobalMessage';
import connect from 'digital-global-message-module/src/widget/GlobalMessage.connect';
import registerTopic from 'digital-global-message-module/src/sdk/GlobalMessage.topicRegistration';
import descriptor from '../digital-global-message-module.descriptor.json';

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
