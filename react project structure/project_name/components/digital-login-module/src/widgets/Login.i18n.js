import {defineMessages} from 'react-intl';

export default defineMessages({
    pageTitle: {
        id: 'login.title',
        defaultMessage: 'Iniciar sesión'
    },
    user: {
        label: {
            id: 'login.labels.user',
            tagName: 'label',
            defaultMessage: 'Nombre de usuario:'
        },
        validation: {
            required: {
                id: 'login.user.validation.required',
                defaultMessage: 'Nombre de usuario es requerido'
            }
        }
    },
    password: {
        label: {
            id: 'login.labels.password',
            tagName: 'label',
            defaultMessage: 'Contraseña:'
        },
        validation: {
            required: {
                id: 'login.password.validation.required',
                defaultMessage: 'Contraseña es requerido'
            }
        }
    },
    submitBtn: {
        id: 'login.labels.submitBtn',
        defaultMessage: 'Enviar'
    },
    lostChangesText: {
        id: 'lostChangesText',
        defaultMessage: 'Tenga en cuenta que todos los cambios no guardados se perderán.'
    },
    logOutConfirmation: {
        id: 'logOutConfirmation',
        defaultMessage: '¿Está seguro de cerrar sesión?'
    },
    logOutText: {
        id: 'logOutText',
        defaultMessage: 'Cerrar Sesión'
    }
});
