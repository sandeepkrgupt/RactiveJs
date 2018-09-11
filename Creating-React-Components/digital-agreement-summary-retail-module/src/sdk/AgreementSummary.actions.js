import React from 'react';
import SDK from 'digital-sdk';
import __ from 'lodash';
import DigitalComponents from 'digital-common-components';
import actionsConfig from 'digital-agreement-summary-retail-module/src/sdk/AgreementSummary.actions.config';
import errorConfig from 'digital-agreement-summary-retail-module/src/sdk/AgreementSummary.errors';
import SDKConfig from 'digital-agreement-summary-retail-module/src/sdk/AgreementSummary.sdk.config';
import ActionTypes from 'digital-agreement-summary-retail-module/src/sdk/AgreementSummary.actionTypes';
import messages from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.i18n';
import {registerReducer} from 'digital-agreement-summary-retail-module/src/sdk/reducers/AgreementSummary.reducer';
import CreateSalesAgreement from 'digital-create-sales-agreement-retail-module/lib/sdk/CreateSalesAgreement.actions';
import LoginActions from 'digital-login-module/src/sdk/Login.actions';
import PopupAction from 'digital-popup-module/src/sdk/Popup.actions';
import DashboardActions from 'digital-dashboard-retail-module/src/sdk/Dashboard.actions';
import SetBusinessGroup from 'digital-set-business-group-retail-module/src/sdk/SetBusinessGroup.actions';
import SalesAgreementAction from 'digital-create-sales-agreement-retail-module/src/sdk/CreateSalesAgreement.actions';
import CustomerAction from 'digital-customer-retail-module/src/sdk/Customer.actions';
import SelectPlanAction from 'digital-select-plan-retail-module/src/sdk/SelectPlan.actions';
import {MessageTypes, StatusCode} from 'digital-sdk/src/const/messageTypes';
import {PAYMENT_BOX_SIMULATOR_URL, DIGITAL_JSP_RETURN_URL} from '../widget/AgreementSummary.consts';

registerReducer();

const CommerceService = new SDK.DigitalServicesImpl.DigitalCommerceService();
const CareService = new SDK.DigitalServicesImpl.DigitalCareService();
let areaCodePopupData;
let selectedAreaCode;

export default class extends SDK.ActionClass {
    constructor(connectParams, store) {
        super(connectParams, store, SDKConfig, actionsConfig, errorConfig);
        this.getMessageConfiguration = this.getMessageConfiguration.bind(this);
    }

    setActions() {
        super.setActions();
        this.createSalesAgreementAction = new CreateSalesAgreement(
            {contextId: this.connectParams.contextId}, this.store);
        this.SetBusinessGroupAction = new SetBusinessGroup(
            {contextId: this.connectParams.contextId}, this.store);

        this.loginActions = new LoginActions({}, this.store);
        this.dashboardActions = new DashboardActions({}, this.store);
        this.salesAgreementAction = new SalesAgreementAction({
            contextId: this.connectParams.contextId
        }, this.store);
        this.customerAction = new CustomerAction({
            contextId: this.connectParams.contextId
        }, this.store);
        this.popupAction = new PopupAction({}, this.store);
        this.selectPlanAction = new SelectPlanAction({contextId: this.connectParams.contextId}, this.store);
    }

    getInitialData() {
        const initData = {
            totalAgreementSummaryGroupsData: {},
            totalAgreementSummaryPriceData: {},
            cancelOrderStatus: {},
            configurePlanData: {},
            cancelOrderInProgress: false,
            submitSalesAgreementInProgress: false,
            maxLimitExceed: false,
            genericError: false,
            isExpandTaxBtn: true
        };
        return initData;
    }

    getManageDocumentsConfig() {
        const loginData = this.loginActions.getData();
        const {clientConfiguration} = loginData;
        const customerID = this.customerAction.getCustomerId();
        const archiveID = this.salesAgreementAction.getOrderId();
        return {
            ...clientConfiguration,
            customerID,
            archiveID
        };
    }

    changeIsExpandTaxBtnStatus(isExpandTaxBtnStatus) {
        this.dispatchStoreAction(ActionTypes.CHANGE_ISEXPAND_BTN_STATUS, {isExpandTaxBtn: isExpandTaxBtnStatus});
    }

    setInputParameters() {
        const initialData = this.getInitialData();
        this.dispatchStoreAction(ActionTypes.SET_AGREEMENT_SUMMARY_INPUT_PARAMETERS,
            initialData);
        const payload = this.getSalesAgreementPayload();
        this.fetchSalesAgreementSummary(payload);
    }

    /* Services */

    getSalesAgreementPayload() {
        let salesAgreementOrderID = null;
        let salesAgreementID = null;
        let userId = null;

        const createSAOrderID = this.createSalesAgreementAction.getOrderId();
        const createSAID = this.createSalesAgreementAction.getAgreementId();

        if (createSAOrderID && createSAID) {
            salesAgreementOrderID = createSAOrderID;
            salesAgreementID = createSAID;
        }

        if (this.loginActions) {
            userId = this.loginActions.getUserId();
        }

        return {salesAgreementOrderID, salesAgreementID, userId};
    }

    getSalesAgreementSummary() {
        return this.getData();
    }

    getAddSharedAllowanceData() {
        return this.getData().addSharedAllowanceData;
    }

    getConfigurePlanData() {
        return this.getData().configurePlanData;
    }

    fetchSalesAgreementSummary(payload, config) {
        const serviceRequestPromise = this.serviceRequest(
            CommerceService,
            CommerceService.getSalesAgreementSummary,
            {
                data: payload,
                config
            },
            ActionTypes.RESERVE_SALES_AGREEMENT
        );

        serviceRequestPromise.then((result) => {
            if (result && result.data && result.data.salesAgreementSummary) {
                const agreementSummaryData = result.data.salesAgreementSummary;

                this.checkBOTAndSubscriptionLimit(agreementSummaryData);
                const maxBOTSubscriptions = this.loginActions.getConfigItem('MAX_SUBSCRIPTIONS_PER_BOT');
                const totalAgreementSummaryPriceData = this.fetchTotalAgreementSummaryPriceData(agreementSummaryData, maxBOTSubscriptions);
                const totalAgreementSummaryGroupsData = this.fetchTotalAgreementSummaryGroupsData(agreementSummaryData, maxBOTSubscriptions);
                const totalAgreementSummaryFreeMonthsData =
                    this.fetchTotalAgreementSummaryFreeMonthsData(agreementSummaryData);
                const salesAgreementStatusData = this.fetchSalesAgreementStatus(agreementSummaryData);
                const salesAgreementSummaryData =
                    {totalAgreementSummaryPriceData,
                        totalAgreementSummaryFreeMonthsData,
                        totalAgreementSummaryGroupsData,
                        salesAgreementStatusData};
                this.dispatchStoreAction(ActionTypes.UPDATE_SALES_AGREEMENT_SUMMARY_DATA,
                    salesAgreementSummaryData);
                this.createSalesAgreementAction.setSalesAgreementNameFromSummary(agreementSummaryData.agreementName);
            }
        }).catch((err) => {
            console.log(err); // NOSONAR
        });
    }

    checkBOTAndSubscriptionLimit(agreementSummaryData) {
        const maxSASubscriptions = this.loginActions.getConfigItem('MAX_SUBSCRIPTIONS_PER_AGREEMENT');
        const maxBOTs = this.loginActions.getConfigItem('MAXIMUM_BOT_ALLOWED');

        if (agreementSummaryData.totalBOTsQuantity && maxBOTs &&
            (parseInt(agreementSummaryData.totalBOTsQuantity, 10) > parseInt(maxBOTs, 10))) {
            const mapObj = {'{X}': agreementSummaryData.totalBOTsQuantity,
                '{Y}': maxBOTs
            };
            const message = (messages.botLimitMsg.defaultMessage).replace(/{X}|{Y}/gi, (matched) => {
                return mapObj[matched];
            });
            this.showBOTAndSubLimitErrorMessage(message, messages.maxLimitExceedInd.defaultMessage);
        }

        if (maxSASubscriptions &&
            agreementSummaryData.totalQuantity &&
            (parseInt(agreementSummaryData.totalQuantity, 10) >
                parseInt(maxSASubscriptions, 10))) {
            const mapObj = {'{X}': agreementSummaryData.totalQuantity,
                '{Y}': maxSASubscriptions
            };
            const message = (messages.subscriptionLimitMsg.defaultMessage).replace(/{X}|{Y}/gi, (matched) => {
                return mapObj[matched];
            });
            this.showBOTAndSubLimitErrorMessage(message, messages.maxLimitExceedInd.defaultMessage);
        }
    }

    showBOTAndSubLimitErrorMessage(message, indicator) {
        const object = {};
        object[indicator] = true;
        this.dispatchStoreAction(ActionTypes.UPDATE_BOT_SUBSCRIPTION_LIMIT_DATA, object);
        if (message) {
            this.emitMessage(message);
        }
    }

    emitMessage(messageKey) {
        const messageToEmit = {
            messageKeys: {statusCode: StatusCode.SUCCESS},
            messagePayload: {
                type: MessageTypes.ERROR,
                messageDetails: {messageData: {id: 'SuccessMessage_added', defaultMessage: messageKey}},
                autoClear: true
            }
        };
        this.messageEmitter.emit(messageToEmit.messageKeys, messageToEmit.messagePayload, messageToEmit.options);
    }

    emitMessageOnCreditCheckFailed(messageKey) {
        const messageToEmit = {
            messageKeys: {statusCode: StatusCode.ERROR},
            messagePayload: {
                type: MessageTypes.ERROR,
                messageDetails: {messageData: {id: 'creditCheckMessage_added', defaultMessage: messageKey}},
                autoClear: true
            }
        };
        this.messageEmitter.emit(messageToEmit.messageKeys, messageToEmit.messagePayload, messageToEmit.options);
    }

    fetchTotalAgreementSummaryPriceData(inputData, maxBOTSubscriptions) {
        const totalAgreementSummaryPriceData = {};
        totalAgreementSummaryPriceData.totalAgreementPrice = {};
        this.fetchTotAgrSumRecurringData(totalAgreementSummaryPriceData, inputData);
        this.fetchTotAgrSumImmediateData(totalAgreementSummaryPriceData, inputData);
        totalAgreementSummaryPriceData.agreementOrderID = this.createSalesAgreementAction.getOrderId();
        totalAgreementSummaryPriceData.subscriptionsNo = inputData.totalQuantity;
        totalAgreementSummaryPriceData.commissionAffectation = inputData.commissionAffectation;
        totalAgreementSummaryPriceData.agreementName = inputData.agreementName;
        totalAgreementSummaryPriceData.freeMonths = inputData.freeMonths;
        totalAgreementSummaryPriceData.totalImmediateWithoutTax = inputData.totalImmediateWithoutTax;
        totalAgreementSummaryPriceData.totalImmediateWithTax = inputData.totalImmediateWithTax;
        totalAgreementSummaryPriceData.totalMonthlyWithoutTax = inputData.totalMonthlyWithoutTax;
        totalAgreementSummaryPriceData.totalMonthlyWithTax = inputData.totalMonthlyWithTax;
        if (inputData.totalPriceDetails && inputData.totalPriceDetails.installments) {
            totalAgreementSummaryPriceData.installments = inputData.totalPriceDetails.installments;
        }
        totalAgreementSummaryPriceData.addressDetailsForSA = inputData.addressDetailsForSA;
        totalAgreementSummaryPriceData.maxBOTSubscriptions = maxBOTSubscriptions;
        totalAgreementSummaryPriceData.removeLastBOT = inputData.removeLastBOT;
        if (inputData.salesAgreementStatus) {
            totalAgreementSummaryPriceData.salesAgreementStatus = inputData.salesAgreementStatus;
        }
        return totalAgreementSummaryPriceData;
    }

    fetchTotAgrSumRecurringData(totalAgreementSummaryPriceData, inputData) {
        if (inputData.totalPriceDetails && inputData.totalPriceDetails.recurringCharge) {
            totalAgreementSummaryPriceData.totalAgreementPrice.services = {
                price: inputData.totalPriceDetails.recurringCharge.totalFinalAmountWithoutTax,
                freeMonths: []
            };
            if (!totalAgreementSummaryPriceData.totalAgreementPrice.includeTax) {
                totalAgreementSummaryPriceData.totalAgreementPrice.includeTax = {};
            }
            totalAgreementSummaryPriceData.totalAgreementPrice.services = {
                priceWithoutTax: inputData.totalPriceDetails.recurringCharge.totalAmountWithoutTax,
                priceWithTax: inputData.totalPriceDetails.recurringCharge.totalAmountWithTax
            };
        }
    }

    fetchTotAgrSumImmediateData(totalAgreementSummaryPriceData, inputData) {
        if (inputData.totalPriceDetails && inputData.totalPriceDetails.immediateCharge) {
            totalAgreementSummaryPriceData.totalAgreementPrice.devices = {
                fullPrice: inputData.totalPriceDetails.immediateCharge.totalFinalAmountWithoutTax
            };
            if (!totalAgreementSummaryPriceData.totalAgreementPrice.includeTax) {
                totalAgreementSummaryPriceData.totalAgreementPrice.includeTax = {};
            }
            totalAgreementSummaryPriceData.totalAgreementPrice.includeTax.devices = {
                fullPrice: inputData.totalPriceDetails.immediateCharge.totalAmountWithTax
            };
        }
    }

    fetchTotalAgreementSummaryFreeMonthsData(inputData) {
        let freeMonths = [];
        if (inputData.freeMonths) {
            freeMonths = Object.values(inputData.freeMonths);
            if (freeMonths.length > 0 && freeMonths[0] !== '0') {
                return freeMonths;
            }
            return [];
        }
        return freeMonths;
    }

    fetchTotalAgreementSummaryGroupsData(inputData, maxBOTSubscriptions) {
        const totalAgreementSummaryGroupsData = {};
        totalAgreementSummaryGroupsData.businessGroups = [];
        if (inputData.businessGroupDetails && inputData.businessGroupDetails.length > 0) {
            totalAgreementSummaryGroupsData.businessGroups = inputData.businessGroupDetails.map((groupItem) => {
                const newGroupItem = {
                    groupName: groupItem.groupName,
                    groupID: groupItem.groupID,
                    sharedAllowance: groupItem.sharedAllowance
                };

                if ((groupItem.boTemplate === undefined || groupItem.boTemplate.length === 0) &&
                    !this.getData().genericError) {
                    this.showBOTAndSubLimitErrorMessage(messages.genericLimitMsg.defaultMessage,
                        messages.genericErrorInd.defaultMessage);
                }

                newGroupItem.bots = groupItem.boTemplate && groupItem.boTemplate.map((botItem) => {
                    return this.fetchTotAgrSumBotsPlanData(botItem, maxBOTSubscriptions);
                });

                return newGroupItem;
            });
        }
        return totalAgreementSummaryGroupsData;
    }

    fetchTotAgrSumBotsPlanData(botItem, maxBOTSubscriptions) {
        const newBotItem = {};
        newBotItem.plan = {};
        if (botItem.basePlan) {
            newBotItem.plan.planName = botItem.basePlan.planName;
            if (botItem.basePlan.planPriceDetails && botItem.basePlan.planPriceDetails.recurringCharge) {
                newBotItem.plan.price = botItem.basePlan.planPriceDetails.recurringCharge.finalAmoutWithoutTax;
                newBotItem.plan.priceWithTax = botItem.basePlan.planPriceDetails.recurringCharge.finalAmountWithTax;
                newBotItem.plan.totalSubscriptionsPrice =
                    botItem.basePlan.planPriceDetails.recurringCharge.totalFinalAmountWithoutTax;
                newBotItem.plan.totalSubscriptionsPriceWithTax =
                    botItem.basePlan.planPriceDetails.recurringCharge.totalFinalAmountWithTax;
                newBotItem.plan.finalAmountWithoutTax =
                    botItem.basePlan.planPriceDetails.recurringCharge.finalAmountWithoutTax;
                newBotItem.plan.finalAmountWithTax =
                    botItem.basePlan.planPriceDetails.recurringCharge.finalAmountWithTax;
                if (botItem.basePlan.planPriceDetails.recurringCharge.discountPercentage) {
                    newBotItem.plan.discountPercentage =
                        botItem.basePlan.planPriceDetails.recurringCharge.discountPercentage;
                    newBotItem.plan.discountDuration =
                        botItem.basePlan.planPriceDetails.recurringCharge.discountDuration;
                    newBotItem.plan.discountAmountWithoutTax =
                        botItem.basePlan.planPriceDetails.recurringCharge.discountAmountWithoutTax;
                    newBotItem.plan.discountAmountWithTax =
                        botItem.basePlan.planPriceDetails.recurringCharge.discountAmountWithTax;
                    newBotItem.plan.amoutWithoutTax =
                        botItem.basePlan.planPriceDetails.recurringCharge.amoutWithoutTax;
                    newBotItem.plan.amoutWithTax =
                        botItem.basePlan.planPriceDetails.recurringCharge.amoutWithTax;
                }
            }
        }
        newBotItem.plan.orderActionID = botItem.orderActionID;
        newBotItem.plan.orderID = botItem.orderID;
        newBotItem.plan.subscriptionsNo = botItem.quantity;
        newBotItem.plan.showError = false;

        if (newBotItem.plan.subscriptionsNo && maxBOTSubscriptions && (parseInt(newBotItem.plan.subscriptionsNo, 10) > parseInt(maxBOTSubscriptions, 10))) {
            newBotItem.plan.showError = true;
            if (!this.getData().genericError) {
                this.showBOTAndSubLimitErrorMessage(messages.genericLimitMsg.defaultMessage,
                    messages.genericErrorInd.defaultMessage);
            }
        }
        newBotItem.plan.productOffering = botItem.productOffering;
        newBotItem.addOns = __.filter(botItem.addOnsPlans, (addOn) => {
            return addOn.planPriceDetails && addOn.planPriceDetails.recurringCharge &&
                Number(addOn.planPriceDetails.recurringCharge.totalAmountWithoutTax);
        });
        newBotItem.addOnsTotal = botItem.addOnsTotal;
        newBotItem.orderActionID = botItem.orderActionID;

        if (botItem.commitment && botItem.commitment.length > 0) {
            newBotItem.commitment = botItem.commitment;
        }

        if (botItem.nirDetails) {
            newBotItem.nirDetails = botItem.nirDetails;
        }

        this.fetchTotAgrSumBotsDeviceData(newBotItem, botItem);

        return newBotItem;
    }

    performCreditCheckSuccess(response) {
        this.dispatchStoreAction(
            ActionTypes.SET_CREDIT_STATUS, {creditStatus: response.data.responseCreditCheck.statusReason});
        if (Object.keys(response.data.responseCreditCheck).length !== 0) {
            if (response.data.responseCreditCheck.creditStatus !== 'RA') {
                const stateData = this.getData();
                const agreementName = stateData.totalAgreementSummaryPriceData.agreementName;
                this.dashboardActions.setSuccessMessage(`${agreementName}
                    Fué exitosamente enviado a validación de crédito`);
                this.dispatchStoreAction(ActionTypes.GO_TO_DASHBOARD, {});
            } else {
                this.openCreditCheckRejectedPopup();
            }
        }
    }

    performCreditCheckFailure(response) {
        const emmitTerms = ['CREDIT_CHECK_FAILED', 'MAX_AGR_SUB_EXCEEDED', 'MAX_BOT_SUB_EXCEEDED'];
        if (response && !emmitTerms.includes(response.errorCode)) {
            this.emitMessageOnCreditCheckFailed(messages.creditCheckFail.defaultMessage);
            return {};
        }

        return response;
    }

    openCreditCheckRejectedPopup() {
        let creditStatus = this.getData().creditStatus;
        const isStatusCodeInMeassages = messages.creditStatus;
        if (!isStatusCodeInMeassages) {
            creditStatus = 'DEFAULT';
        }
        const data = {
            backdrop: 'static',
            closeButtonAction: () => { this.dispatchStoreAction(ActionTypes.GO_TO_DASHBOARD, {}); },
            header: {
                img: 'resources/pic/limitation.svg',
                title: messages.creditResults.defaultMessage
            },
            body: (
                <div>
                    <div>{messages.rejectionReason.defaultMessage}{messages[creditStatus].defaultMessage}</div>
                    <div className="text-center modal-icon-wrap">
                        <img src="resources/pic/rejected.jpg" alt="rejected" />
                        <span className="modal-icon-wrap-title">{messages.rejected.defaultMessage}</span>
                    </div>
                </div>
            ),
            footer: {
                rightButton: {
                    title: messages.cancelAgreement.defaultMessage,
                    action: this.cancelAgreementPopupAction
                }
            },
            popupType: ''
        };
        this.popupAction.openPopup(data);
    }

    fetchTotAgrSumBotsDeviceData(newBotItem, botItem) {
        newBotItem.device = {};
        newBotItem.device.isBYOD = false;

        if (botItem.commitment && botItem.commitment.length > 0) {
            newBotItem.commitment = botItem.commitment;
        }
        // TODO -'device' convention instead of 'plan' in the params
        if (botItem.deviceDetails && Object.keys(botItem.deviceDetails).length > 0) {
            newBotItem.device.deviceName = botItem.deviceDetails.planName;
            if (botItem.deviceDetails.planPriceDetails &&
                botItem.deviceDetails.planPriceDetails.immediateCharge) {
                newBotItem.device.fullPrice =
                    botItem.deviceDetails.planPriceDetails.immediateCharge.finalAmountWithoutTax;
                newBotItem.device.fullPriceWithTax =
                    botItem.deviceDetails.planPriceDetails.immediateCharge.finalAmountWithTax;
                newBotItem.device.totalSubscriptionsPrice =
                    botItem.deviceDetails.planPriceDetails.immediateCharge.totalFinalAmountWithoutTax;
                newBotItem.device.totalSubscriptionsPriceWithTax =
                    botItem.deviceDetails.planPriceDetails.immediateCharge.totalFinalAmountWithTax;
                newBotItem.device.immediateCharge = botItem.deviceDetails.planPriceDetails.immediateCharge;
            }
            if (botItem.deviceDetails.planPriceDetails &&
                botItem.deviceDetails.planPriceDetails.installments) {
                newBotItem.device.installments = botItem.deviceDetails.planPriceDetails.installments;
            }
        } else {
            newBotItem.device.isBYOD = true;
            newBotItem.device.deviceName = messages.byodDeviceName.defaultMessage;
        }
    }

    goToConfigurePlan(data) {
        const payload = {
            orderActionId: data.orderActionID
        };

        if (data.isConfigureSharedAllowance) {
            payload.isConfigureSharedAllowance = true;
            payload.isConfigureBOT = false;
            payload.groupName = data.groupName;
            payload.planName = data.planName;
            payload.sharedAllowanceName = data.planName;
        } else {
            payload.isConfigureBOT = true;
            payload.isConfigureSharedAllowance = false;
            payload.planName = data.planName;
            payload.deviceName = data.deviceName;
        }

        this.dispatchStoreAction(ActionTypes.UPDATE_CONFIGURE_PLAN_DATA, {configurePlanData: payload});
        this.dispatchStoreAction(ActionTypes.GO_TO_CONFIGURE_PLAN, {});
    }

    goToSharedAllowance(data) {
        const summaryData = this.getSalesAgreementSummary();
        const payloadData = this.getSalesAgreementPayload();
        const {businessGroups} = summaryData.totalAgreementSummaryGroupsData;
        const businessGroup = __.find(businessGroups, (bsGroup) => {
            return bsGroup.groupName === data.groupName;
        });

        const addSharedAllowanceData = {
            addSharedAllowanceData: {
                ...payloadData,
                agreementName: summaryData && summaryData.totalAgreementSummaryPriceData ?
                    summaryData.totalAgreementSummaryPriceData.agreementName : '',
                groupName: data.groupName,
                groupId: summaryData && summaryData.totalAgreementSummaryGroupsData ? businessGroup.groupID : ''
            }
        };

        this.dispatchStoreAction(ActionTypes.UPDATE_ADD_SHARED_ALLOWANCE_DATA,
            addSharedAllowanceData);

        this.dispatchStoreAction(ActionTypes.GO_TO_ADD_SHARED_ALLOWANCE, {});
    }

    getCreditCheckPayload() {
        const creditCheckData = this.getSalesAgreementPayload();
        const prepareCreditCheckJson = {
            salesAgreementOrderId: creditCheckData.salesAgreementOrderID,
            salesAgreementID: creditCheckData.salesAgreementID,
            userId: creditCheckData.userId
        };
        return prepareCreditCheckJson;
    }

    performCreditCheck() {
        const payload = this.getCreditCheckPayload();
        return new Promise((resolve, reject) => {
            const serviceRequestPromise = this.serviceRequest(
                CommerceService,
                CommerceService.performCreidtCheck,
                {payload}, ActionTypes.PERFORM_CREDIT_CHECK,
                this.performCreditCheckSuccess.bind(this),
                this.performCreditCheckFailure.bind(this)
            );
            serviceRequestPromise.then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    performSubmitSalesAgreement() {
        let userId = null;
        let saOrderId = null;
        if (this.loginActions) {
            userId = this.loginActions.getUserId() || 'Asmsa1';
        }
        if (this.createSalesAgreementAction) {
            saOrderId = this.createSalesAgreementAction.getOrderId() || '528';
        }
        const data = {
            userId
        };
        const payload = {
            saOrderId
        };
        return new Promise((resolve, reject) => {
            const submitSalesAgreementInProgress = this.getData().submitSalesAgreementInProgress;
            if (!submitSalesAgreementInProgress) {
                const serviceRequestPromise = this.serviceRequest(
                    CommerceService,
                    CommerceService.performSubmitSalesAgreement,
                    {payload, data},
                    ActionTypes.PERFORM_SUBMIT_SALES_AGREEMENT,
                    this.performSubmitSalesAgreementSuccess.bind(this),
                    this.performSubmitSalesAgreementFailure.bind(this)
                );
                serviceRequestPromise.then((res) => {
                    resolve(res);
                }).catch((err) => {
                    if (err) {
                        reject(err);
                    }
                });
            }
        });
    }

    performSubmitSalesAgreementSuccess() {
        const stateData = this.getData();
        const agreementName = stateData.totalAgreementSummaryPriceData.agreementName;
        this.dashboardActions.setSuccessMessage(
            (messages.agreementSummarySubmitSuccess.defaultMessage).replace('{agreementName}', agreementName));
        this.dispatchStoreAction(ActionTypes.GO_TO_DASHBOARD, {});
    }

    performSubmitSalesAgreementFailure(response) {
        if (response &&
            response.errorCode === 'SUBMIT_ORDER_FAILED'
            && response.statusCode === 500) {
            // Cannot use FormattedMessage Due to Styling Issue
            const errorMessage = `${messages.orderFailed.defaultMessage}`;

            const messageToEmit = this.getMessageConfiguration(errorMessage);
            this.messageEmitter.emit(messageToEmit.messageKeys, messageToEmit.messagePayload, messageToEmit.options);
            return {};
        }
        return response;
    }

    updateFreeMonths(freeMonths, update) {
        this.popupAction.closePopup();
        const payload = {};
        let salesAgreementId = null;
        let userId = null;
        if (this.loginActions) {
            userId = this.loginActions.getUserId();
        }
        if (this.createSalesAgreementAction) {
            salesAgreementId = this.createSalesAgreementAction.getAgreementId();
        }

        const data = {
            userId,
            salesAgreementId
        };
        if (update) {
            for (let i = 0; i < freeMonths.length; i += 1) {
                const key = `freeMonth${i + 1}`;
                payload[key] = `${freeMonths[i]}`;
            }
        }


        return new Promise((resolve, reject) => {
            const serviceRequestPromise = this.serviceRequest(
                CommerceService,
                CommerceService.updateFreeMonth,
                {payload, data},
                ActionTypes.UPDATE_FREE_MONTHS,
                this.updateFreeMonthsSuccess.bind(this),
                this.updateFreeMonthsFailure.bind(this)
            );
            serviceRequestPromise.then((res) => {
                resolve(res);
            }).catch((err) => {
                if (err) {
                    reject(err);
                }
            });
        });
    }

    updateFreeMonthsSuccess(response) {
        const updateFreeMonthResponse = response.data;
        let freeMonths;
        if (updateFreeMonthResponse && updateFreeMonthResponse.status === 'Success') {
            delete updateFreeMonthResponse.status;
            freeMonths = Object.values(updateFreeMonthResponse);
            if (!(freeMonths.length > 0 && freeMonths[0] !== '0')) {
                freeMonths = [];
            }
            const totalAgreementSummaryFreeMonthsData = freeMonths;
            const freeMonthsData = {totalAgreementSummaryFreeMonthsData};
            this.dispatchStoreAction(ActionTypes.UPDATE_SALES_AGREEMENT_SUMMARY_DATA, freeMonthsData);
        }
    }

    updateFreeMonthsFailure() {

    }

    goToSelectPlan(data) {
        this.SetBusinessGroupAction.setBusinessGroup(data.groupID, data.groupName);
        // set flow type 'isFlowFromSetBG = false' to navigate back to Agreement summary page
        this.selectPlanAction.dispatchStoreAction(ActionTypes.SET_SELECT_PLAN_INPUT_PARAMETERS,
            {isFlowFromSetBG: false});

        this.dispatchStoreAction(ActionTypes.GO_TO_SELECT_PLAN_SCREEN,
            {groupName: data.groupName});
    }

    goToSetBusinessGroup() {
        // set flow type 'isFlowFromSetBG = false' to navigate back to Agreement summary page
        this.selectPlanAction.dispatchStoreAction(ActionTypes.SET_SELECT_PLAN_INPUT_PARAMETERS,
            {isFlowFromSetBG: false});
        this.dispatchStoreAction(ActionTypes.GO_TO_SET_BUSINESS_GROUP);
    }

    goToDeliveryOptionPage() {
        this.dispatchStoreAction(ActionTypes.GO_TO_DELIVERY_OPTION_PAGE);
    }

    removeBOTRestCall({orderId, isCancelAgreement, getSalesAgreementPayload}) {
        const data = {};

        return new Promise((resolve, reject) => {
            const cancelOrderInProgress = this.getData().cancelOrderInProgress;
            if (!cancelOrderInProgress) {
                const serviceRequestPromise = this.serviceRequest(
                    CommerceService,
                    CommerceService.cancelOrder,
                    {payload: {orderId, userId: getSalesAgreementPayload.userId}, data},
                    ActionTypes.CANCEL_ORDER
                );

                serviceRequestPromise.then((res) => {
                    resolve(res);
                    this.dispatchStoreAction(ActionTypes.CANCEL_ORDER_STATUS,
                        {cancelOrderStatus: res.data});
                    if (isCancelAgreement) {
                        this.dashboardActions.setSuccessMessage(messages.agreementCanceledMessageText.defaultMessage);
                        this.dispatchStoreAction(ActionTypes.GO_TO_DASHBOARD, {});
                    } else {
                        this.setInputParameters();
                    }
                }).catch((err) => {
                    reject(err);
                    this.dispatchStoreAction(ActionTypes.CANCEL_ORDER_STATUS,
                        {cancelOrderStatus: err.data});
                });
            }
        });
    }

    removeBOT(data) {
        const getSalesAgreementPayload = this.getSalesAgreementPayload();
        return this.removeBOTRestCall(
            {
                orderId: data.orderID,
                isCancelAgreement: data.isCancelAgreement,
                getSalesAgreementPayload
            }
        );
    }

    getSalesAgreementStatus() {
        return this.createSalesAgreementAction.getStatus();
    }

    fetchSalesAgreementStatus(inputData) {
        const salesAgreementStatusData = {};
        salesAgreementStatusData.salesAgreementStatus = inputData.salesAgreementStatus;
        return salesAgreementStatusData;
    }

    getGenerateContractPayload() {
        const customerData = this.customerAction.getCustomerId();
        const loginData = this.loginActions.getUserId();
        const payload = {
            customerID: customerData,
            userId: loginData
        };
        return payload;
    }

    getSummaryStatusData() {
        const stateData = this.getData();
        return stateData;
    }

    handleGenerateContract() {
        const payload = this.getGenerateContractPayload();
        const data = this.createSalesAgreementAction.getAgreementId();
        return new Promise((resolve, reject) => {
            const serviceRequestPromise = this.serviceRequest(
                    CommerceService,
                    CommerceService.generateContract,
                    {payload, data},
                    ActionTypes.GENERATE_CONTRACT,
                    this.generateContractSuccess.bind(this),
                    this.generateContractFailure.bind(this)
                );
            serviceRequestPromise.then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    base64toBlob(b64Data, contentType, sliceSize) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = [];

            for (let i = 0; i < slice.length; i += 1) {
                byteNumbers.push(slice.charCodeAt(i));
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    generateContractSuccess(response) {
        const contractDetails = response.data;
        const fileName = contractDetails.fileName;
        const doc = contractDetails.document;

        const pdfData = this.base64toBlob(doc, 'application/pdf', 512);
        // For IE support
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(pdfData, fileName);
        } else {
            const fileURL = window.URL.createObjectURL(pdfData);
            const win = window.open(fileURL, fileName);
            win.document.title = fileName;
        }
    }

    getMessageConfiguration (errorMessage) {
        return {
            messageKeys: {statusCode: StatusCode.INTERNAL_SERVER_ERROR},
            messagePayload: {
                type: MessageTypes.ERROR,
                messageDetails: {messageData: {id: 'SuccessMessage_added', defaultMessage: errorMessage}},
                autoClear: true
            }
        };
    }

    generateContractFailure(response) {
        if (response &&
            response.errorCode === 'GENERATE_CONTRACT_FAILED'
            && response.statusCode === 500) {
            // Cannot use FormattedMessage Due to Styling Issue
            const errorMessage = `${messages.contractFailed.defaultMessage}`;

            const messageToEmit = this.getMessageConfiguration(errorMessage);
            this.messageEmitter.emit(messageToEmit.messageKeys, messageToEmit.messagePayload, messageToEmit.options);
            return {};
        }
        return response;
    }

    openCancelAgreementPopup() {
        const data = {
            header: {
                img: 'resources/pic/cancel.svg',
                title: messages.cancelAgreementHeaderText.defaultMessage
            },
            body: messages.cancelAgreementPopupBodyText.defaultMessage,
            footer: {
                rightButton: {
                    title: messages.cancelAgreementPopupFooterText.defaultMessage,
                    action: this.cancelAgreementPopupAction
                }
            },
            popupType: ''
        };
        this.popupAction.openPopup(data);
    }

    cancelAgreementPopupAction() {
        const agreementOrderID = this.createSalesAgreementAction.getOrderId();
        const data = {
            orderID: agreementOrderID,
            isCancelAgreement: true
        };
        this.removeBOT(data);
        this.popupAction.closePopup();
    }

    updatePBPaymentConfirmation(pbData) {
        if (pbData && pbData.message &&
            (pbData.message.extLastStatus === '0' && (pbData.message.confirmNum || pbData.message.depositSlipNum))) {
            const {salesAgreementOrderID, userId} = this.getSalesAgreementPayload();
            const data = {salesAgreementOrderID, userId};

            const payload = {
                paymentConfirmationFromPB: {
                    pbImmediateConfirmationNumber: pbData.message.confirmNum,
                    pbSlipNumber: pbData.message.depositSlipNum
                }
            };

            const serviceRequestPromise = this.serviceRequest(
                CommerceService,
                CommerceService.updatePBPaymentConfirmation,
                {
                    data,
                    payload
                },
                ActionTypes.RESERVE_PAYMENT_CONFIRMATION_DATA
            );

            serviceRequestPromise.then((result) => {
                if (result) {
                    this.dashboardActions.setSuccessMessage(messages.orderSubmitAfterPaymentSuccess.defaultMessage);
                    this.dispatchStoreAction(ActionTypes.GO_TO_DASHBOARD, {});
                }
            }).catch((err) => {
                console.log(err); // NOSONAR
            });
        } else {
            const {Tooltip} = DigitalComponents.DigitalControllerComponents;
            const questionIcon = <img src="resources/pic/question.svg" alt="" />;

            const popupData = {
                header: {
                    img: 'resources/pic/limitation.svg',
                    title: messages.handlePayment.defaultMessage
                },
                body: (
                    <div>
                        { messages.paymentFailure.defaultMessage}
                        { pbData.message && pbData.message.depositErrorText &&
                            <Tooltip icon={questionIcon}>{pbData.message.depositErrorText}</Tooltip>
                        }
                        <div className="text-center modal-icon-wrap">
                            <img src="resources/pic/rejected.jpg" alt="rejected" />
                            <span className="modal-icon-wrap-title">{messages.failed.defaultMessage}</span>
                        </div>
                    </div>
                ),
                footer: {
                    rightButton: {
                        title: messages.ok.defaultMessage,
                        action: this.popupAction.closePopup
                    }
                }
            };
            this.popupAction.openPopup(popupData);
        }
    }

    openPaymentBoxPopUp() {
        const {salesAgreementOrderID, userId} = this.getSalesAgreementPayload();
        const payload = {salesAgreementOrderID, userId};

        const serviceRequestPromise = this.serviceRequest(
            CommerceService,
            CommerceService.handlePaymentLicToPB,
            {
                payload
            },
            ActionTypes.RESERVE_HANDLE_PAYMENT_DATA
        );

        serviceRequestPromise.then((result) => {
            if (result && result.data &&
                result.data.createPayOrderRequest && result.data.createPayOrderRequest.payOrder) {
                const loginData = this.loginActions.getData();
                const {clientConfiguration} = loginData;
                let isSimulator = true;

                const lastSeparatorPathIndex = window.location.pathname.lastIndexOf('/') > 0 ?
                    window.location.pathname.lastIndexOf('/') : window.location.pathname.length;

                const baseURL = window.location.origin + window.location.pathname.slice(0, lastSeparatorPathIndex);
                let targetURL = baseURL + PAYMENT_BOX_SIMULATOR_URL;

                result.data.createPayOrderRequest.payOrder.returnURL = baseURL + DIGITAL_JSP_RETURN_URL;

                if (result.data.createPayOrderRequest.payOrder && clientConfiguration) {
                    if (clientConfiguration.IS_PAYMENT_BOX_SIMULATOR != null) {
                        isSimulator = clientConfiguration.IS_PAYMENT_BOX_SIMULATOR;
                    }

                    if (clientConfiguration.DIGITAL_JSP_RETURN_URL) {
                        result.data.createPayOrderRequest.payOrder.returnURL =
                            baseURL + clientConfiguration.DIGITAL_JSP_RETURN_URL;
                    }

                    if (!isSimulator) {
                        targetURL = clientConfiguration.PAYMENT_BOX_URL;
                    }
                }

                const data = {
                    header: '',
                    body: result.data.createPayOrderRequest,
                    footer: '',
                    popupType: 'payment',
                    popupPaymentData: {
                        isSimulator,
                        targetURL,
                        updatePBPaymentConfirmation: this.updatePBPaymentConfirmation
                    }
                };

                this.popupAction.openPopup(data);
            }
        }).catch((err) => {
            console.log(err); // NOSONAR
        });
    }
    openUpdateFreeMonthsPopUp(e) {
        e.preventDefault();
        const data = {
            header: {
                img: 'resources/pic/add_black.svg',
                title: `${messages.addAFreeMonthsPopUpHeaderText.defaultMessage}`
            },
            body: JSON.stringify(this.prepareFreeMonthsPopupData()),
            footer: {
                rightButton: {
                    action: this.updateFreeMonths
                }
            },
            popupType: 'freeMonths'
        };
        this.popupAction.openPopup(data);
    }
    prepareFreeMonthsPopupData() {
        const loginData = this.loginActions.getData();
        const preSelectedMonths = this.getData().totalAgreementSummaryFreeMonthsData.map(Number);
        const {FREE_MONTHS_START_FROM_MONTH, FREE_MONTHS_INTERVAL,
            FREE_MONTHS_TOTAL_MONTHS_NUMBER, FREE_MONTHS_MAX_FREE_MONTHS} = loginData.clientConfiguration;
        const startFromMonth = FREE_MONTHS_START_FROM_MONTH || 7;
        const interval = FREE_MONTHS_INTERVAL || 5;
        const totalMonthsNumber = FREE_MONTHS_TOTAL_MONTHS_NUMBER || 24;
        const maxFreeMonths = FREE_MONTHS_MAX_FREE_MONTHS || 3;
        // dummy values NOSONAR
        const freeMonthsData = {
            startFromMonth,
            preSelectedMonths,
            interval,
            totalMonthsNumber,
            maxFreeMonths
        };
        return freeMonthsData;
    }

    clearAllFreeMonths() {
        const data = {
            header: {
                img: 'resources/pic/cancel.svg',
                title: messages.clearAllHeaderText.defaultMessage
            },
            body: `${messages.ClearAllPopupBodyText1.defaultMessage} ${messages.ClearAllPopupBodyText2.defaultMessage}`,
            footer: {
                rightButton: {
                    title: messages.clearAllHeaderText.defaultMessage,
                    action: this.clearAllFreeMonthsPopupAction
                },
                leftButton: {
                    title: messages.CancelText.defaultMessage,
                    action: this.popupAction.closePopup
                }
            },
            popupType: ''
        };
        this.popupAction.openPopup(data);
    }

    clearAllFreeMonthsPopupAction() {
        const freeMonthsArray = [0, 0, 0];
        this.updateFreeMonths(freeMonthsArray);
        this.popupAction.closePopup();
    }

    getIsEditSalesAgreementFlowStatus() {
        return this.getData().isEditSalesAgreementFlow;
    }

    fetchNirReferanceData(orderActionID) {
        return new Promise((resolve, reject) => {
            let userId = null;
            if (this.loginActions) {
                userId = this.loginActions.getUserId();
            }
            const payload = {
                userId,
                orderActionID
            };

            const serviceRequestPromise = this.serviceRequest(
                CommerceService,
                CommerceService.getNirList,
                {payload},
                ActionTypes.FETCH_NIR_LIST
            );

            serviceRequestPromise.then((res) => {
                if (res.data && res.data.nirDetails) {
                    this.dispatchStoreAction(ActionTypes.SET_NIR_LIST, res.data);
                }
                resolve(true);
            }).catch((err) => {
                if (err) {
                    reject(err);
                }
            });
        });
    }

    updateBotAreaCode(item) {
        const userId = this.loginActions.getUserId();
        const payload = {
            order_action_id: item.orderActionID,
            userId
        };

        const data = selectedAreaCode;
        this.serviceRequest(
            CommerceService,
            CommerceService.updateBotAreaCode,
            {data, payload},
            ActionTypes.UPDATE_BOT_AREA_CODE,
            this.updateBotAreaCodeSuccess.bind(this, item),
            this.updateBotAreaCodeFailure.bind(this, item)
        );
    }

    updateBotAreaCodeFailure(err) {
        this.popupAction.closePopup();

        return err;
    }

    updateBotAreaCodeSuccess(response) {
        const newItem = {
            nirDetails: {...selectedAreaCode.nirDetails},
            orderActionID: response.orderActionID
        };

        if (!selectedAreaCode.nirDetails) {
            newItem.nirDetails = null;
        }

        this.popupAction.closePopup();
        this.dispatchStoreAction(ActionTypes.SET_UPDATE_BOT_AREA_CODE, newItem);
    }

    setSelectedAreaCode({isSuggestionSelected, selectedValue}) {
        if (isSuggestionSelected) {
            areaCodePopupData.footer.rightButton.disabled = false;
            const nirDetails = {...selectedValue};
            selectedAreaCode = {nirDetails};
            this.popupAction.closePopup();
            this.popupAction.openPopup(areaCodePopupData);
        } else {
            areaCodePopupData.footer.rightButton.disabled = true;
            this.popupAction.closePopup();
            this.popupAction.openPopup(areaCodePopupData);
        }
    }

    removeBotAreaCode(item) {
        const nirDetails = null;
        selectedAreaCode = {nirDetails};
        const removeAreaCodePopupData = {
            header: {
                img: 'resources/pic/cancel.svg',
                title: `${messages.removeAreaCode.defaultMessage}`
            },
            body: `${messages.removeAreaCodeQuery.defaultMessage}`,
            footer: {
                leftButton: {
                    title: `${messages.CancelText.defaultMessage}`,
                    action: this.popupAction.closePopup
                },
                rightButton: {
                    title: `${messages.saveAndCloseText.defaultMessage}`,
                    action: () => this.updateBotAreaCode(item)
                }
            },
            popupType: ''
        };
        this.popupAction.openPopup(removeAreaCodePopupData);
    }

    openAreaCodePopUp(item) {
        const nirListResult = this.fetchNirReferanceData(item.orderActionID);
        nirListResult.then(() => {
            const {AutoSuggest} = DigitalComponents.DigitalControllerComponents;
            const nirDetails = this.getData().nirDetails;
            const autoSuggestCommon = (<AutoSuggest
                isSuggestionSelectedCallback={selectedItem => this.setSelectedAreaCode(selectedItem)}
                suggestionsList={nirDetails}
                placeholder={messages.areaCodeDefaultSearchText.defaultMessage}
                headerText={messages.nirDefaultChangeMsg.defaultMessage}
            />);
            areaCodePopupData = {
                header: {
                    img: 'resources/pic/add_black.svg',
                    title: `${messages.selectAreaCode.defaultMessage}`
                },
                body: autoSuggestCommon,
                footer: {
                    leftButton: {
                        title: `${messages.CancelText.defaultMessage}`,
                        action: this.popupAction.closePopup
                    },
                    rightButton: {
                        title: `${messages.saveAndCloseText.defaultMessage}`,
                        action: () => this.updateBotAreaCode(item),
                        disabled: true
                    }
                },
                popupType: ''
            };
            this.popupAction.openPopup(areaCodePopupData);
        }).catch((err) => {
            /* TODO - Throw Error when no result */
            console.log(err); // NOSONAR
        });
    }

    getPublicActions() {
        return [
            'getSalesAgreementSummary',
            'goToSharedAllowance',
            'getAddSharedAllowanceData',
            'goToSelectPlan',
            'goToSetBusinessGroup',
            'removeBOT',
            'getConfigurePlanData',
            'goToConfigurePlan',
            'getManageDocumentsConfig',
            'getSalesAgreementStatus',
            'handleGenerateContract',
            'getSummaryStatusData',
            'openCancelAgreementPopup',
            'cancelAgreementPopupAction',
            'clearAllFreeMonths',
            'clearAllFreeMonthsPopupAction',
            'goToDeliveryOptionPage',
            'updateFreeMonths',
            'openCreditCheckRejectedPopup',
            'getIsEditSalesAgreementFlowStatus',
            'openPaymentBoxPopUp',
            'updatePBPaymentConfirmation',
            'openUpdateFreeMonthsPopUp',
            'openAreaCodePopUp',
            'removeBotAreaCode',
            'showBOTAndSubLimitErrorMessage',
            'changeIsExpandTaxBtnStatus'
        ];
    }

    onStateUpdate(/* data */) {
        // here is the place to respond to relevant state data changes and call relevant actions
        // data argument contains the module mapped state data
    }
}

