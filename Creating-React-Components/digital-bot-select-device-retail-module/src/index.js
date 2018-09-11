import SDK from 'digital-sdk';

import Widget from 'digital-bot-select-device-retail-module/src/widget/BotSelectDevice';
import connect from 'digital-bot-select-device-retail-module/src/widget/BotSelectDevice.connect';
import registerTopic from 'digital-bot-select-device-retail-module/src/sdk/BotSelectDevice.topicRegistration';
import descriptor from '../digital-bot-select-device-retail-module.descriptor.json';

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
