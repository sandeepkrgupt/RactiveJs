import {SUCCESS_SUFFIX, REQUEST_SUFFIX, FAILURE_SUFFIX} from 'digital-sdk/lib/actions/types/const';
import SDK from 'digital-sdk';

import ActionTypes from 'digital-agreement-summary-retail-module/src/sdk/AgreementSummary.actionTypes';
import SDKConfig from 'digital-agreement-summary-retail-module/src/sdk/AgreementSummary.sdk.config';

const initialState = {};

const reducer = (state = initialState, action) => {
    const {type, payload = {}} = action;
    let newState;

    switch (type) {
    case ActionTypes.SET_AGREEMENT_SUMMARY_INPUT_PARAMETERS:
    case ActionTypes.CHANGE_ISEXPAND_BTN_STATUS:
    case ActionTypes.UPDATE_SALES_AGREEMENT_SUMMARY_DATA:
    case ActionTypes.UPDATE_ADD_SHARED_ALLOWANCE_DATA:
    case ActionTypes.CANCEL_ORDER:
    case ActionTypes.CANCEL_ORDER_STATUS:
    case ActionTypes.UPDATE_CONFIGURE_PLAN_DATA:
    case ActionTypes.UPDATE_SUMMARY_STATE:
    case ActionTypes.UPDATE_BOT_SUBSCRIPTION_LIMIT_DATA:
    case ActionTypes.SET_NIR_LIST:
    case `${ActionTypes.GENERATE_CONTRACT}.${FAILURE_SUFFIX}`:
    case `${ActionTypes.GENERATE_CONTRACT}.${SUCCESS_SUFFIX}`:
    case `${ActionTypes.GENERATE_CONTRACT}.${REQUEST_SUFFIX}`:
        newState = {
            ...state,
            ...payload
        };
        break;
    case ActionTypes.GO_TO_SELECT_PLAN_SCREEN:
    case ActionTypes.GO_TO_SET_BUSINESS_GROUP:
    case ActionTypes.GO_TO_DELIVERY_OPTION_PAGE:
    case ActionTypes.GO_TO_CONFIGURE_PLAN:
    case ActionTypes.GO_TO_ADD_SHARED_ALLOWANCE:
        newState = {
            ...state,
            ...payload,
            isEditSalesAgreementFlow: true
        };
        break;
    case ActionTypes.GO_TO_DASHBOARD:
        newState = {
            ...state,
            ...payload,
            isEditSalesAgreementFlow: false
        };
        break;
    case ActionTypes.SET_CREDIT_STATUS:
        newState = {
            ...state,
            ...payload
        };
        break;
    case `${ActionTypes.CANCEL_ORDER}${REQUEST_SUFFIX}`:
        newState = {
            ...state,
            ...payload,
            cancelOrderInProgress: true
        };
        break;
    case `${ActionTypes.CANCEL_ORDER}${SUCCESS_SUFFIX}`:
    case `${ActionTypes.CANCEL_ORDER}${FAILURE_SUFFIX}`:
        newState = {
            ...state,
            ...payload,
            cancelOrderInProgress: false
        };
        break;
    case ActionTypes.CLEAN_ORDER_LEVEL:
        newState = {
            ...initialState,
            viewDataParams: state.viewDataParams
        };
        break;
    case `${ActionTypes.PERFORM_SUBMIT_SALES_AGREEMENT}${REQUEST_SUFFIX}`:
        newState = {
            ...state,
            ...payload,
            submitSalesAgreementInProgress: true
        };
        break;
    case `${ActionTypes.PERFORM_SUBMIT_SALES_AGREEMENT}${SUCCESS_SUFFIX}`:
    case `${ActionTypes.PERFORM_SUBMIT_SALES_AGREEMENT}${FAILURE_SUFFIX}`:
        newState = {
            ...state,
            ...payload,
            submitSalesAgreementInProgress: false
        };
        break;
    case ActionTypes.UPDATE_FREE_MONTHS:
        newState = {
            ...state,
            totalAgreementSummaryFreeMonthsData: payload
        };
        break;
    case ActionTypes.SET_UPDATE_BOT_AREA_CODE:
        newState = setBotNirItem({...state}, payload); // NOSONAR
        break;
    default:
        newState = state;
        break;
    }
    return newState;
};

const updateBotNirItem = (botsArray, payload) => {
    for (const botItem of botsArray) {
        if (botItem.orderActionID === payload.orderActionID) {
            if (payload.nirDetails) {
                botItem.nirDetails = payload.nirDetails;
            } else {
                delete botItem.nirDetails;
            }
            break;
        }
    }
};

const setBotNirItem = (state, payload) => {
    const newState = state;
    const {businessGroups} = newState.totalAgreementSummaryGroupsData;
    if (!businessGroups || businessGroups.length === 0) {
        return newState;
    }

    for (const item of businessGroups) {
        if (item.bots || item.bots.length > 0) {
            updateBotNirItem(item.bots, payload);
        }
    }
    return newState;
};

const registrationFunc = () => {
    const {level, name} = SDKConfig;
    SDK.registerLevelReducer(level, name, reducer);
};

export {
    reducer as default,
    registrationFunc as registerReducer
};
