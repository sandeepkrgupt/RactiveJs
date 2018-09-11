/* eslint camelcase: 0 */

import {defineMessages} from 'react-intl';

const messages = defineMessages({
    validators_emptyField: {
        id: 'validators_emptyField',
        defaultMessage: 'Please enter {field}'
    },
    validators_invalidPostalCode: {
        id: 'validators_invalidPostalCode',
        defaultMessage: 'Please enter a valid Postal Code'
    },
    validators_invalidNaturalNumber: {
        id: 'validators_invalidNaturalNumber',
        defaultMessage: 'Please enter a number greater than or equal to zero'
    },
    validators_invalidEmail: {
        id: 'validators_invalidEmail',
        defaultMessage: 'Please enter a valid email address'
    },
    validators_emailMismatch: {
        id: 'validators_emailMismatch',
        defaultMessage: '{field} must match Email'
    },
    validators_maxLengthExceeded: {
        id: 'validators_maxLengthExceeded',
        defaultMessage: 'Maximum characters exceeded'
    },
    charCount_remaining: {
        id: 'charCount_remaining',
        defaultMessage: ' remaining'
    },
    charCount_tooMany: {
        id: 'charCount_tooMany',
        defaultMessage: ' too many'
    }
});

export default messages;
