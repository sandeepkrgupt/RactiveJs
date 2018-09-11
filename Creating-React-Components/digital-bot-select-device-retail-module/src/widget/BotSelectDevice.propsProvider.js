class PropsProvider {
    constructor(context) {
        this.context = context;
    }
    getComponentProps(props) {
        return {
            deviceList: this.getDeviceList(props),
            planList: this.getPlanList(props),
            handleBackToDevice: props.actions.handleBackToDevice,
            handleToConfigureBot: props.actions.handleToConfigureBot,
            updateByodFlag: props.actions.updateByodFlag,
            loadDevices: props.actions.loadDevices,
            upadteDevicesSearch: props.actions.upadteDevicesSearch,
            clearFilterAndSearch: props.actions.clearFilterAndSearch,
            filterDefaultOptionsCount: props.filterDefaultOptionsCount,
            showFilter: props.showFilter
        };
    }

    getDeviceList(props) {
        return {
            viewProps: {
                devices: props.devices,
                addDeviceButton: props.actions.addDeviceButton,
                isSuccess: props.isSuccess,
                isLoading: props.isLoading,
                numOfInstallments: props.numOfInstallments,
                filterOptions: props.filterOptions,
                filterDefaultOptions: props.filterDefaultOptions,
                searchText: props.searchText,
                moreRecordsExist: props.moreRecordsExist,
                maxReturnedRecords: props.maxReturnedRecords,
                upadteDevicesFilter: props.actions.upadteDevicesFilter,
                upadteDevicesSearch: props.actions.upadteDevicesSearch
            }
        };
    }

    getPlanList(props) {
        return {
            viewProps: {
                selectedPlanDetail: props.selectedPlanDetail,
                changePlanButton: props.actions.backToSelectPlanScreen
            }
        };
    }
}

export default PropsProvider;
