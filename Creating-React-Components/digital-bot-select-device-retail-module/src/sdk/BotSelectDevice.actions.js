import {pick as _pick} from 'lodash';
import SDK from 'digital-sdk';

import actionsConfig from
    'digital-bot-select-device-retail-module/src/sdk/BotSelectDevice.actions.config';
import errorConfig from
    'digital-bot-select-device-retail-module/src/sdk/BotSelectDevice.errors';
import SDKConfig from
    'digital-bot-select-device-retail-module/src/sdk/BotSelectDevice.sdk.config';
import ActionTypes from
    'digital-bot-select-device-retail-module/src/sdk/BotSelectDevice.actionTypes';
import {registerReducer} from 'digital-bot-select-device-retail-module/src/sdk/reducers/BotSelectDevice.reducer';
import selectPlanModule from 'digital-select-plan-retail-module/src/sdk/SelectPlan.actions';
import CustomerAction from 'digital-customer-retail-module/src/sdk/Customer.actions';
import LoginAction from 'digital-login-module/src/sdk/Login.actions';

const CommerceService = new SDK.DigitalServicesImpl.DigitalCommerceService();

registerReducer();

export default class extends SDK.ActionClass {
    constructor(connectParams, store) {
        super(connectParams, store, SDKConfig, actionsConfig, errorConfig);
        this.getDeviceListSuccess = this.getDeviceListSuccess.bind(this);
        this.getDeviceListFailure = this.getDeviceListFailure.bind(this);
        this.addDeviceButton = this.addDeviceButton.bind(this);
        this.backToSelectPlanScreen = this.backToSelectPlanScreen.bind(this);
        this.retrieveSelectedPlan = this.retrieveSelectedPlan.bind(this);
        this.upadteDevicesFilter = this.upadteDevicesFilter.bind(this);
        this.getDeviceListFailure = this.getDeviceListFailure.bind(this);
        this.getFilterConfiguration = this.getFilterConfiguration.bind(this);
        this.clearFilterAndSearch = this.clearFilterAndSearch.bind(this);

        this.getFilterConfiguration();
    }

    setName(name) {
        this.dispatchStoreAction(ActionTypes.SET_BOT_SELECT_DEVICE_NAME, {name});
    }

    getInitialData() {
        const initData = {
            devices: null,
            device: {},
            selectedPlanDetail: {},
            isSuccess: false,
            isLoading: false,
            byodFlag: false,
            filterOptions: [],
            searchText: '',
            filterDefaultOptions: null
        };
        return initData;
    }

    getPayLoad() {
        const customerId = this.customerAction.getCustomerId();
        const userId = this.loginAction.getUserId();
        let payload = {};
        if (customerId && userId) {
            payload = {
                customerId,
                userId
            };
        } else {
            payload = {
                customerId: '100000027',
                userId: '548'
            };
        }
        return payload;
    }

    setInputParameters() {
        const initialData = this.getInitialData();

        this.dispatchStoreAction(ActionTypes.SET_BOT_SELECT_DEVICE_INPUT_PARAMETERS,
            initialData);
        // this hook is here to allow for calling an action to set input data into the state

        this.retrieveSelectedPlan();
        this.loadDevices();
    }

    setActions() {
        super.setActions();
        this.selectPlanModuleAction = new selectPlanModule({contextId: this.connectParams.contextId}, this.store);
        this.customerAction = new CustomerAction({contextId: this.connectParams.contextId}, this.store);
        this.loginAction = new LoginAction({contextId: this.connectParams.contextId}, this.store);
    }

    getPublicActions() {
        return [
            'setName',
            'retrieveSelectedPlan',
            'addDeviceButton',
            'backToSelectPlanScreen',
            'getSelectedDevice',
            'handleToConfigureBot',
            'handleBackToDevice',
            'updateByodFlag',
            'loadDevices',
            'upadteDevicesFilter',
            'upadteDevicesSearch',
            'clearFilterAndSearch'
        ];
    }

    onStateUpdate(/* data */) {
        // here is the place to respond to relevant state data changes and call relevant actions
        // data argument contains the module mapped state data
    }

    loadDevices() {
        const stateData = this.getData();
        const payload = this.getPayLoad();

        const request = {
            basePlanID: stateData.selectedPlanDetail.basePlanID
        };

        if (stateData.searchText) {
            request.searchDevice = stateData.searchText;
        }

        if (stateData.filterOptions) {
            request.filterOptions = stateData.filterOptions;
        }

        request.filterOptionsInd = !stateData.filterDefaultOptions;

        this.getDeviceList(payload, request);
    }

    getDeviceListSuccess(response) {
        const devicesRes = response.data;
        const currentData = this.getData();
        const filterDefaultOptions = currentData.filterDefaultOptions || null;

        const returnObj = {
            devices: (devicesRes && devicesRes.devices) ? devicesRes.devices : [],
            numOfInstallments: (devicesRes) ? devicesRes.numOfInstallments : '',
            maxReturnedRecords: (devicesRes) ? devicesRes.maxReturnedRecords : null,
            moreRecordsExist: (devicesRes) ? devicesRes.moreRecordsExist : false
        };

        if (!filterDefaultOptions && devicesRes.filterOptions) {
            returnObj.filterDefaultOptions = devicesRes.filterOptions;
        }

        return returnObj;
    }

    getDeviceListFailure(response) {
        return response;
    }

    getDeviceList(payload, data) {
        return new Promise((resolve, reject) => {
            const serviceRequestPromise = this.serviceRequest(
                CommerceService,
                CommerceService.getDeviceList,
                {payload, data},
                ActionTypes.GET_DEVICE_DETAILS,
                this.getDeviceListSuccess,
                this.getDeviceListFailure
            );
            serviceRequestPromise.then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    setDefaultPlan() {
        const selectedPlanDetail = {
            planName: 'Dummy Dummy',
            planDescriprion: 'Dummy Dummy Dummy Dummy Dummy Dummy',
            basePlanID: '887604_887614_45023',
            productOfferingName: 'ALC_OT4033A_C3_BC_IUSA_GSM',
            price: '1120'
        };

        return selectedPlanDetail;
    }

    retrieveSelectedPlan() {
        const selectedPlanDetail = (this.selectPlanModuleAction) ? this.selectPlanModuleAction.getSelectedPlan() : null;
        if (selectedPlanDetail) {
            this.dispatchStoreAction(ActionTypes.ADD_PLAN_DETAIL, {
                selectedPlanDetail
            });
        } else {
            // hardcorded for testing purpose, need to remove
            this.dispatchStoreAction(ActionTypes.ADD_PLAN_DETAIL, {
                selectedPlanDetail: this.setDefaultPlan()
            }
        );
        }
    }

    getSelectedDevice() {
        return this.getData().device;
    }

    addDeviceButton(device) {
        this.dispatchStoreAction(ActionTypes.UPDATE_BYOD_FLAG, {byodFlag: false});
        this.dispatchStoreAction(ActionTypes.ADD_DEVICE_DETAIL, {
            device
        });
    }

    backToSelectPlanScreen() {
        this.dispatchStoreAction(ActionTypes.BACK_TO_SELECT_PLAN_SCREEN);
    }

    updateByodFlag(flagValue) {
        this.dispatchStoreAction(ActionTypes.UPDATE_BYOD_FLAG, {byodFlag: flagValue});
    }

    handleBackToDevice() {
        this.dispatchStoreAction(ActionTypes.NAVIGATE_TO_SELECT_DEVICE);
    }

    handleToConfigureBot() {
        this.dispatchStoreAction(ActionTypes.ADD_DEVICE_DETAIL);
    }

    upadteDevicesFilter(filter) {
        this.dispatchStoreAction(ActionTypes.UPDATE_DEVICES_FILTER, {filterOptions: filter});
        if (filter.length === 0) {
            this.clearFilterSelections();
        }
        this.loadDevices();
    }

    upadteDevicesSearch(text) {
        this.dispatchStoreAction(ActionTypes.UPDATE_DEVICE_SEARCH, {searchText: text});
        this.loadDevices();
    }

    getFilterConfiguration() {
        this.dispatchStoreAction(ActionTypes.GET_FILTER_CONFIGURATION, {
            showFilter: this.loginAction.getConfigItem('DEVICE_SELECTION_SHOW_FILER') || true,
            filterDefaultOptionsCount: this.loginAction.getConfigItem('DEVICE_SELECTION_FILTER_DEFAULT_PRESENTED_COUNT')
        });
    }

    clearFilterAndSearch() {
        this.dispatchStoreAction(ActionTypes.UPDATE_DEVICE_SEARCH, {searchText: ''});
        this.dispatchStoreAction(ActionTypes.UPDATE_DEVICES_FILTER, {filterOptions: []});
        this.clearFilterSelections();
        this.loadDevices();
    }

    clearFilterSelections() {
        const currentData = this.getData();
        const filterDefaultOptions = currentData.filterDefaultOptions || [];
        const filterOptionsLength = filterDefaultOptions.length;
        for (let i = 0; i < filterOptionsLength; i += 1) {
            const category = filterDefaultOptions[i];
            const categoryOptions = category.filterOptionValues;
            const categoryOptionsLength = categoryOptions.length;
            for (let v = 0; v < categoryOptionsLength; v += 1) {
                categoryOptions[v].checked = false;
            }
        }
        this.dispatchStoreAction(ActionTypes.SAVE_DEFAULT_FILTER, {filterDefaultOptions});
    }

}

