const EDITABLE_STATUS = 'Draft';
const DELIVERY_METHOD = 'storePickUp';
const PAYMENT_BOX_SIMULATOR_URL = '/PaymentBoxFlowSimulator.jsp';
const DIGITAL_JSP_RETURN_URL = '/PaymentBoxFlowResult.jsp';

const STATUS_CODES = {PaymentCompleted: 'PaymentCompleted', PendingforPayment: 'PendingforPayment'};
const REJECTED_STATUS = {CreditClassReject: 'CreditClassReject', PolicyCheckRejected: 'PolicyCheckRejected'};
const NIR_STATUS = {
    Draft: 'Draft',
    PendingPolicyCheck: 'PendingPolicyCheck',
    PolicyCheckApproved: 'PolicyCheckApproved'
};

export {
    EDITABLE_STATUS,
    DELIVERY_METHOD,
    PAYMENT_BOX_SIMULATOR_URL,
    DIGITAL_JSP_RETURN_URL,
    STATUS_CODES,
    REJECTED_STATUS,
    NIR_STATUS
};
