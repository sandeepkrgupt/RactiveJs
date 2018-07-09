import SDK from 'digital-sdk';
import actionsConfig from 'digital-login-module/src/sdk/Login.actions.config';
import errorConfig from 'digital-login-module/src/sdk/Login.errors';
import SDKConfig from 'digital-login-module/src/sdk/Login.sdk.config';
import ActionTypes from 'digital-login-module/src/sdk/Login.actionTypes';
import messages from 'digital-login-module/src/widget/Login.i18n';
import PopupAction from 'digital-popup-module/src/sdk/Popup.actions';
import {registerReducer} from 'digital-login-module/src/sdk/reducers/Login.reducer';

registerReducer();

const AuthenticationService = new SDK.DigitalServicesImpl.DigitalAuthenticationService();
const CareService = new SDK.DigitalServicesImpl.DigitalCareService();

export default class extends SDK.ActionClass {
    constructor(connectParams, store) {
        super(connectParams, store, SDKConfig, actionsConfig, errorConfig);
        this.popupActions = new PopupAction({}, this.store);
    }

    doLogin(user, password) {
        return this.serviceRequest(
            AuthenticationService,
            AuthenticationService.externalLogin,
            {
                data: {user, password}
            },
            'LOGIN_REQUEST'
        )
            .then((res) => {
                this.dispatchStoreAction(ActionTypes.NAVIGATE_TO_NEXT_PAGE, {});
                return res;
            })
            .catch((err) => {
                return err;
            });
    }

    fetchUserInfo() {
        this.serviceRequest(
                CareService,
                CareService.getUserInfo,
                {},
                ActionTypes.FETCH_USER_INFO,
                this.fetchUserInfoSuccess.bind(this)
        );
    }

    fetchUserInfoSuccess(response) {
        this.dispatchStoreAction(ActionTypes.SET_USER_INFO, response.data);
        const displayErrorUUID = response.data && response.data.clientConfiguration && response.data.clientConfiguration.IS_DISPLAYING_ERROR_UUID;
        sessionStorage.setItem('displayErrorUUID', displayErrorUUID);
        return response;
    }

    getUserId() {
        return this.getData().attuid;
    }

    getConfigItem(configItem) {
        return this.getData().clientConfiguration && this.getData().clientConfiguration[configItem];
    }

    logout() {
        return new Promise((resolve, reject) => {
            const serviceRequestPromise = this.serviceRequest(
                AuthenticationService,
                AuthenticationService.externalLogout,
                {
                    data: {}
                },
                ActionTypes.LOGOUT_REQUEST,
                this.logoutSuccess.bind(this),
                this.logoutFailure.bind(this)
            );
            serviceRequestPromise.then((res) => {
                this.dispatchStoreAction(ActionTypes.USER_LOGED_OUT, {});
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    cleanAllLevels() {
        this.dispatchStoreAction(ActionTypes.CLEAN_ORDER_LEVEL, {});
        this.dispatchStoreAction(ActionTypes.CLEAN_CUSTOMER_LEVEL, {});
        this.dispatchStoreAction(ActionTypes.CLEAN_APPLICATION_LEVEL, {});
    }

    logoutSuccess(response) {
        return response;
    }

    logoutFailure(response) {
        return response;
    }

    openLogoutPopup() {
        const data = {
            header: {
                img: 'resources/pic/question_black.svg',
                title: messages.logOutConfirmation.defaultMessage
            },
            body: messages.lostChangesText.defaultMessage,
            footer: {
                rightButton: {
                    title: messages.logOutText.defaultMessage,
                    action: this.logoutPopupAction
                }
            },
            popupType: ''
        };
        this.popupActions.openPopup(data);
    }

    logoutPopupAction() {
        this.logout();
        this.popupActions.closePopup();
    }

    getPublicActions() {
        return [
            'doLogin',
            'getUserId',
            'fetchUserInfo',
            'getConfigItem',
            'logout',
            'openLogoutPopup',
            'logoutPopupAction',
            'cleanAllLevels'
        ];
    }

    onStateUpdate(/* data */) {
        // here is the place to respond to relevant state data changes and call relevant actions
        // data argument contains the module mapped state data
    }


}

