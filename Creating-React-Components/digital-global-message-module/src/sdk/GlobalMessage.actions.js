import {pick as _pick} from 'lodash';
import SDK from 'digital-sdk';

import actionsConfig from
    'digital-global-message-module/src/sdk/GlobalMessage.actions.config';
import errorConfig from
    'digital-global-message-module/src/sdk/GlobalMessage.errors';
import SDKConfig from
    'digital-global-message-module/src/sdk/GlobalMessage.sdk.config';
import ActionTypes from
    'digital-global-message-module/src/sdk/GlobalMessage.actionTypes';
import {registerReducer} from 'digital-global-message-module/src/sdk/reducers/GlobalMessage.reducer';

registerReducer();

export default class extends SDK.ActionClass {
    constructor(connectParams, store) {
        super(connectParams, store, SDKConfig, actionsConfig, errorConfig);
        this.redirectFlag = false;
        this.onStateUpdate = this.onStateUpdate.bind(this);
    }
    redirectToCSPLogin() {
        this.dispatchStoreAction(ActionTypes.REDIRECT_TO_CSP_LOGIN);
    }
    setName(name) {
        this.dispatchStoreAction(ActionTypes.SET_GLOBAL_MESSAGE_NAME, {name});
    }

    setInputParameters(data) {
        const propertiesToPickFromData = [
            'topicName'
        ];
        this.dispatchStoreAction(ActionTypes.SET_GLOBAL_MESSAGE_INPUT_PARAMETERS,
            _pick(data, propertiesToPickFromData));
        // this hook is here to allow for calling an action to set input data into the state
    }

    storeRoutes(path) {
        const pathObject = {lastPath: '', currPath: ''};
        const data = this.getData();
        pathObject.lastPath = data.pathObject && data.pathObject.lastPath;
        pathObject.currPath = data.pathObject && data.pathObject.currPath;

        if (pathObject.lastPath || pathObject.currPath) {
            if (path !== pathObject.currPath) {
                const last = pathObject.currPath;
                pathObject.lastPath = last;
                pathObject.currPath = path;

                this.dispatchStoreAction(ActionTypes.STORE_ROUTE_PATH, {pathObject});
            }
        } else {
            pathObject.lastPath = '';
            pathObject.currPath = path;

            this.dispatchStoreAction(ActionTypes.STORE_ROUTE_PATH, {pathObject});
        }
    }


    getRouteList() {
        return this.getData().pathObject;
    }

    getPublicActions() {
        return [
            'setName',
            'redirectToCSPLogin',
            'storeRoutes',
            'getRouteList'
            // specify here class methods you would like to be public
        ];
    }

    onStateUpdate(data) {
        if (this.isRedirect(data)) {
            this.redirectFlag = true;
            this.redirectToCSPLogin();
        }
    }

    isRedirect(data) {
        if (this.redirectFlag === false && data && data.sharedMessages && data.sharedMessages[0]
                && data.sharedMessages[0].messageDetails
                && data.sharedMessages[0].messageDetails.messageCode === 'forbidden') {
            return true;
        }
        return false;
    }
}

