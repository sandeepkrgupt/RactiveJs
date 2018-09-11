import {Utils} from 'digital-sdk';


class PropsProvider {
    constructor(context) {
        this.context = context;
    }

    getComponentProps(props) {
        const {config, actions} = props;
        return {
            intl: props.intl,
            widgetName: config.defaultName,
            totalAgreementSummaryPriceData: props.totalAgreementSummaryPriceData,
            totalAgreementSummaryGroupsData: props.totalAgreementSummaryGroupsData,
            totalAgreementSummaryFreeMonthsData: props.totalAgreementSummaryFreeMonthsData,
            formatPrice: Utils.formatPrice,
            formatPercentage: Utils.formatPercentage,
            goToSharedAllowance: actions.goToSharedAllowance,
            goToSelectPlan: actions.goToSelectPlan,
            goToConfigurePlan: actions.goToConfigurePlan,
            goToSetBusinessGroup: actions.goToSetBusinessGroup,
            removeBOT: actions.removeBOT,
            showModal: props.showModal,
            hidePopUp: actions.hidePopUp,
            manageDocumentsConf: actions.getManageDocumentsConfig(),
            creditStatus: props.creditStatus,
            getSalesAgreementStatus: actions.getSalesAgreementStatus(),
            clearAllFreeMonths: actions.clearAllFreeMonths,
            goToDeliveryOptionPage: actions.goToDeliveryOptionPage,
            openUpdateFreeMonthsPopUp: actions.openUpdateFreeMonthsPopUp,
            nirDetails: props.nirDetails,
            openAreaCodePopUp: actions.openAreaCodePopUp,
            removeBotAreaCode: actions.removeBotAreaCode,
            isExpandTaxBtn: props.isExpandTaxBtn,
            changeIsExpandTaxBtnStatus: actions.changeIsExpandTaxBtnStatus
        };
    }
}

export default PropsProvider;
