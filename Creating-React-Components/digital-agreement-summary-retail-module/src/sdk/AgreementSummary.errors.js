import {MessageTypes, StatusCode} from 'digital-sdk/lib/const/messageTypes';
import messages from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.i18n';

export default {
    messages: [
        {
            key: {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                errorCode: 'CREDIT_CHECK_FAILED'
            },
            presetId: 'creditCheckFailed'
        },
        {
            key: {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                errorCode: 'MAX_AGR_SUB_EXCEEDED'
            },
            presetId: 'maxSubscriptionPerAgreement'
        },
        {
            key: {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                errorCode: 'MAX_BOT_SUB_EXCEEDED'
            },
            presetId: 'maxSubscriptionPerBot'
        }
    ],
    presets: {
        creditCheckFailed: {
            type: MessageTypes.ERROR,
            messageDetails: {
                messageCode: 'notFound',
                messageData: messages.creditCheckFailedErrorMessage
            },
            displayMessage: true,
            customMessage: true,
            dismissible: true,
            severity: 'app_level_error',
            location: 'top',
            inlineMessage: true,
            autoClear: true,
            actions: []
        },
        maxSubscriptionPerAgreement: {
            type: MessageTypes.ERROR,
            messageDetails: {
                messageCode: 'notFound',
                messageData: messages.maxSubscriptionPerAgreementErrorMessage
            },
            displayMessage: true,
            customMessage: true,
            dismissible: true,
            severity: 'app_level_error',
            location: 'top',
            inlineMessage: true,
            autoClear: true,
            actions: []
        },
        maxSubscriptionPerBot: {
            type: MessageTypes.ERROR,
            messageDetails: {
                messageCode: 'notFound',
                messageData: messages.maxSubscriptionPerBotErrorMessage
            },
            displayMessage: true,
            customMessage: true,
            dismissible: true,
            severity: 'app_level_error',
            location: 'top',
            inlineMessage: true,
            autoClear: true,
            actions: []
        }
    }
};
