import {defineMessages} from 'react-intl';

const idPrefix = 'globalMessage';

export default defineMessages({
    test: {
        id: 'test',
        defaultMessage: 'This is a test View for: {name}'
    },
    nameInputPlaceholder: {
        id: 'nameInputPlaceholder',
        defaultMessage: 'Enter your name here'
    },
    waiting: {
        id: 'waiting',
        defaultMessage: 'Request in Progress.'
    },
    internalServerError: {
        id: `${idPrefix}_internalServerError`,
        defaultMessage: ''
    },
    badRequest: {
        id: `${idPrefix}_badRequest`,
        defaultMessage: 'Existe un error en sistema, Por favor intente de nuevo.'
    },
    forbidden: {
        id: `${idPrefix}_forbidden`,
        defaultMessage: 'Existe un error en sistema, Por favor intente de nuevo.'
    },
    notFound: {
        id: `${idPrefix}_notFound`,
        defaultMessage: 'El recurso que intentas alcanzar, actualmente no está disponible. Por favor intenta más tarde.'
    },
    success: {
        id: `${idPrefix}_success`,
        defaultMessage: 'Operation was Successful.'
    },
    general: {
        id: `${idPrefix}_general`,
        defaultMessage: 'There is something wrong in the system, Please try again.'
    }
});
