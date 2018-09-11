import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import messages from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.i18n';
import ManageDocuments from 'digital-agreement-summary-retail-module/src/widget/templates/components/AgreementSummary.ManageDocuments';
import {DELIVERY_METHOD, EDITABLE_STATUS, STATUS_CODES, REJECTED_STATUS} from
        'digital-agreement-summary-retail-module/src/widget/AgreementSummary.consts';
import DigitalComponents from 'digital-common-components';

const {Tooltip} = DigitalComponents.DigitalControllerComponents;

class TotalPrice extends Component {
    constructor(props, context) {
        super(props, context);
        this.goToSetBusinessGroup = this.props.goToSetBusinessGroup;
        this.goToDeliveryOptionPage = this.props.goToDeliveryOptionPage;
        this.handleClick = (e) => {
            this.setState({target: e.target, show: !this.state.show});
        };
        this.state = {
            show: false,
            isExpandTaxBtn: true,
            showMore: false
        };
    }
    getStoreID(data) {
        return data ? ({
            deliveryMethod: data.deliveryMethod,
            storeID: data.storeID,
            streetName: data.streetName,
            // addressLine2: data.addressLine2,
            externalNumber: data.externalNumber,
            neighborhood: data.neighborhood,
            // municipality: data.municipality,
            postalCode: data.postalCode,
            city: data.city,
            // state: data.state,
            country: data.country
        }) : '';
    }
    fetchData(data) {
        this.businessGroups = data.businessGroups;
        this.agreementName = data.agreementName;
        this.agreementOrderID = data.agreementOrderID;
        this.commissionAffectation = this.props.formatPercentage(data.commissionAffectation);
        this.SA_Status = data.salesAgreementStatus;
        this.installments = data.installments;
        this.downPayment = {};

        if (this.SA_Status && this.SA_Status.additionalInfo && this.SA_Status.additionalInfo.policyItem) {
            this.serviceDeposit = this.SA_Status.additionalInfo.policyItem.serviceDeposit &&
                this.props.formatPrice(this.SA_Status.additionalInfo.policyItem.serviceDeposit, null, true);
            this.downPayment.totalAmountWithTax = this.SA_Status.additionalInfo.policyItem.downPayment.totalAmountWithTax &&
                this.props.formatPrice(this.SA_Status.additionalInfo.policyItem.downPayment.totalAmountWithTax, null, true);
            this.downPayment.totalAmountWithoutTax = this.SA_Status.additionalInfo.policyItem.downPayment.totalAmountWithoutTax &&
                this.props.formatPrice(this.SA_Status.additionalInfo.policyItem.downPayment.totalAmountWithoutTax, null, true);
            this.equipmentDeposit = this.SA_Status.additionalInfo.policyItem.equipmentDeposit &&
                this.props.formatPrice(this.SA_Status.additionalInfo.policyItem.equipmentDeposit, null, true);
        }
        this.subscriptionsNo = data.subscriptionsNo;
        if (data.totalAgreementPrice ||
            (this.props.totalAgreementSummaryPriceData.totalImmediateWithTax === 0 &&
                this.props.totalAgreementSummaryPriceData.totalMonthlyWithTax === 0)) {
            if (data.totalAgreementPrice.services) {
                this.servicePriceWithoutTax =
                    this.props.formatPrice(data.totalAgreementPrice.services.priceWithoutTax, 'monthly', true);
                this.servicePriceWithTax =
                    this.props.formatPrice(data.totalAgreementPrice.services.priceWithTax, 'monthly', true);
                this.freeMonths = data.totalAgreementPrice.services.freeMonths;
            }
            if (data.totalAgreementPrice.devices) {
                this.deviceFullPrice = this.props.formatPrice(data.totalAgreementPrice.devices.fullPrice, null, true);
            }
            if (data.totalAgreementPrice.immediatePayment) {
                this.immediateDevicesFullPrice = this.props.formatPrice(
                    data.totalAgreementPrice.immediatePayment.devicesFullPrice, null, true);
                this.immediateInstallmentPayment = this.props.formatPrice(
                    data.totalAgreementPrice.immediatePayment.installmentPayment, null, true);
                this.immediateServiceDeposit = this.props.formatPrice(
                    data.totalAgreementPrice.immediatePayment.serviceDeposit, null, true);
            }
            if (data.totalAgreementPrice.includeTax) {
                if (data.totalAgreementPrice.includeTax.services) {
                    this.taxServicesPrice = this.props.formatPrice(
                        data.totalAgreementPrice.includeTax.services.price, 'monthly', true);
                }
                if (data.totalAgreementPrice.includeTax.devices &&
                    data.totalAgreementPrice.includeTax.devices.installments &&
                    data.totalAgreementPrice.includeTax.devices.installments.length > 0) {
                    this.isTaxDeviceInstallments = true;
                } else if (data.totalAgreementPrice.includeTax.devices &&
                    data.totalAgreementPrice.includeTax.devices.fullPrice) {
                    this.taxTotalPrice =
                        this.props.formatPrice(data.totalAgreementPrice.includeTax.devices.fullPrice, null, true);
                }
            }
        }
        if (this.props.totalAgreementSummaryGroupsData.businessGroups.length === 0) {
            this.hideShowMoreClass = 'hidden';
        }
        this.messageStatusDescription = '';
        if (this.SA_Status) {
            this.statusID = `status${this.SA_Status.code}`;
            let classAlert = '';
            switch (this.SA_Status.code) {
            case 'Cancelled':
                classAlert = 'alert-warning';// gray
                break;
            case 'Completed':
                classAlert = 'alert-success';// green
                break;
            case 'CreditClassReject':
            case 'PolicyCheckRejected':
                classAlert = 'alert-danger';// red
                break;
            default:
                classAlert = 'alert-info';// orange
                break;
            }

            this.classAlert = classAlert;
        }

        this.monthlyPrice = this.state.isExpandTaxBtn ?
                this.props.formatPrice(
                    this.props.totalAgreementSummaryPriceData.totalMonthlyWithTax, 'monthly', true) :
                this.props.formatPrice(
                    this.props.totalAgreementSummaryPriceData.totalMonthlyWithoutTax, 'monthly', true);
        this.immediatePrice = this.state.isExpandTaxBtn ?
                this.props.formatPrice(this.props.totalAgreementSummaryPriceData.totalImmediateWithTax, false, true) :
                this.props.formatPrice(this.props.totalAgreementSummaryPriceData.totalImmediateWithoutTax, false, true);
    }

    expandTaxClick () {
        this.setState({isExpandTaxBtn: !this.state.isExpandTaxBtn});
        this.props.changeIsExpandTaxBtnStatus(!this.state.isExpandTaxBtn);
    }

    showMoreLessClick () {
        this.setState({showMore: !this.state.showMore});
    }

    render() {
        const questionIcon = <img src="resources/pic/question.svg" alt="" />;
        const AddressDetailsForSA = this.getStoreID(this.props.totalAgreementSummaryPriceData.addressDetailsForSA);

        this.fetchData(this.props.totalAgreementSummaryPriceData);
        const arrowClass = this.state.showMore ? 'top' : 'down';
        return (
            <div id="totalPrice">
                {this.SA_Status && this.SA_Status.code &&
                (this.SA_Status.code !== EDITABLE_STATUS) && (
                    <div className={`alert ${this.classAlert}`}>
                        {this.SA_Status.decode}
                        <small>

                            {messages[this.statusID] && this.SA_Status.code !== STATUS_CODES.PendingforPayment &&
                                <FormattedMessage {...messages[this.statusID]} />
                            }
                            {!messages[this.statusID] && <FormattedMessage {...messages.statusUnknown} />}

                            {this.SA_Status.additionalInfo &&
                            (this.SA_Status.code === REJECTED_STATUS.CreditClassReject || this.SA_Status.code === REJECTED_STATUS.PolicyCheckRejected) &&
                            <span>
                                {this.SA_Status.additionalInfo.policyStatusReason &&
                                <Tooltip icon={questionIcon}>
                                    <FormattedMessage {...messages[this.SA_Status.additionalInfo.policyStatusReason]} />
                                    {this.SA_Status.additionalInfo.rejectInformationList &&
                                    this.SA_Status.additionalInfo.rejectInformationList.map((list) => {
                                        return (
                                            <div>{list.message}</div>);
                                    })
                                    }
                                </Tooltip>
                                }
                            </span>
                            }
                            {this.SA_Status.additionalInfo && this.SA_Status.additionalInfo.paySlipNumber &&
                            this.SA_Status.code === STATUS_CODES.PendingforPayment &&
                            <div>
                                <FormattedMessage {...messages.statusPendingforPayment} values={{slipNum: this.SA_Status.additionalInfo.paySlipNumber}} />
                            </div>
                            }
                        </small>
                    </div>
                )}
                <div className="order-info">
                    <div className={`drop-arrow drop-arrow-${arrowClass} ${this.hideShowMoreClass}`} onClick={() => this.showMoreLessClick()} />
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h1 className="justify">
                                    <div>
                                        <FormattedMessage {...messages.agreementSummaryTitle} />
                                        <span className="p-b2 subtext">{this.agreementName}</span>
                                        <span className="p-b2 subtext">#{this.agreementOrderID}A</span>
                                    </div>
                                    <div className={`nice-toggle nice-toggle-revert ${this.hideShowMoreClass}`}>
                                        <input id="niceToggle1" type="checkbox" value="" onClick={() => this.expandTaxClick()} checked={this.state.isExpandTaxBtn} />
                                        <label htmlFor="niceToggle1">
                                            {this.state.isExpandTaxBtn ?
                                                <FormattedMessage {...messages.hideTax} /> :
                                                <FormattedMessage {...messages.showTax} />}
                                        </label>
                                        <small>
                                            {!this.state.isExpandTaxBtn ? <FormattedMessage {...messages.withoutTaxesMessage} /> :
                                            <FormattedMessage {...messages.withTaxesMessage} />
                                            }
                                        </small>
                                    </div>
                                </h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-5 col-md-4">
                                <nav className="order-nav">

                                    <div className="order-nav-item">
                                        <span className="order-nav-icon">
                                            <img src="resources/pic/business_groups.svg" alt="" />
                                        </span>
                                        <FormattedMessage {...messages.businessGroups} />
                                        {this.props.totalAgreementSummaryGroupsData && this.props.totalAgreementSummaryGroupsData.businessGroups &&
                                        ` (${this.props.totalAgreementSummaryGroupsData.businessGroups.length})`}

                                        {(this.SA_Status && this.SA_Status.code === EDITABLE_STATUS) &&
                                        (AddressDetailsForSA && AddressDetailsForSA.deliveryMethod ?
                                            <span className="order-nav-btn" onClick={() => this.goToSetBusinessGroup()}>
                                                <img src="resources/pic/plus.svg" alt="" />
                                                <FormattedMessage {...messages.add} />
                                            </span>
                                            :
                                            <span className="order-nav-btn linkDisable">
                                                <img src="resources/pic/plus.svg" alt="" />
                                                <FormattedMessage {...messages.add} />
                                            </span>)
                                        }
                                    </div>

                                    <div className="order-nav-item">
                                        <span className="order-nav-icon">
                                            <img src="resources/pic/subscriptions.svg" alt="" />
                                        </span>
                                        <FormattedMessage {...messages.totalSubscriptions} /> ({this.subscriptionsNo})
                                    </div>

                                    <div className="order-nav-item active">
                                        <span className="order-nav-icon">
                                            <img src="resources/pic/manage_documents.svg" alt="" />
                                        </span>
                                        <ManageDocuments {...this.props.manageDocumentsConf} />
                                    </div>

                                    <div className="order-nav-item">
                                        <span className="order-nav-icon">
                                            <img src="resources/pic/delivery_black.svg" alt="" />
                                        </span>
                                        {AddressDetailsForSA && AddressDetailsForSA.deliveryMethod &&
                                        (AddressDetailsForSA.deliveryMethod === DELIVERY_METHOD ?
                                            <FormattedMessage {...messages.storePickUp} /> :
                                            <FormattedMessage {...messages.shipToCustomer} />
                                        )}
                                        {AddressDetailsForSA && AddressDetailsForSA.deliveryMethod &&
                                        <Tooltip icon={questionIcon}>
                                            <span>
                                                {AddressDetailsForSA.deliveryMethod === DELIVERY_METHOD &&
                                                <div>
                                                    <FormattedMessage {...messages.storeID} />
                                                    <span> {AddressDetailsForSA.storeID}</span>
                                                </div>}
                                                <div>
                                                    {AddressDetailsForSA.streetName}&nbsp;
                                                    {AddressDetailsForSA.externalNumber}, &nbsp;{AddressDetailsForSA.neighborhood}
                                                    {AddressDetailsForSA.postalCode}
                                                </div>
                                                <div>
                                                    {AddressDetailsForSA.city}, &nbsp;{AddressDetailsForSA.country}
                                                </div>
                                            </span>
                                        </Tooltip>
                                        }
                                        {(!AddressDetailsForSA || !AddressDetailsForSA.deliveryMethod) &&
                                        <FormattedMessage {...messages.addDeliveryMethod} />
                                        }
                                        {(!AddressDetailsForSA || !AddressDetailsForSA.deliveryMethod) &&
                                        <span className="order-nav-btn" onClick={() => this.props.goToDeliveryOptionPage()}>
                                            <img src="resources/pic/plus.svg" alt="" />
                                            <FormattedMessage {...messages.add} />
                                        </span>
                                            }
                                    </div>
                                </nav>
                            </div>

                            <div className="col-sm-4 col-md-4 order-column">
                                <dl className="order-price">
                                    <dt>
                                        <FormattedMessage {...messages.monthlyPayment} />
                                        <Tooltip icon={questionIcon}>
                                            <FormattedMessage {...messages.monthlyPaymentInfo} />
                                        </Tooltip>
                                    </dt>
                                    <dd>{this.monthlyPrice}</dd>
                                </dl>
                            </div>

                            <div className="col-sm-3 col-md-4 order-column">
                                <dl className="order-price">
                                    <dt><FormattedMessage {...messages.immediatePayment} /></dt>
                                    <dd>{this.immediatePrice}</dd>
                                </dl>
                            </div>
                        </div>

                        {this.state.showMore &&
                        <div className="order-table">
                            <div className="row order-table-head">
                                <div className="col-sm-4">
                                    <strong><FormattedMessage {...messages.services} /></strong>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-4">
                                    <FormattedMessage {...messages.servicePlan} />
                                </div>
                                <div className="col-sm-4">
                                    {this.state.isExpandTaxBtn ?
                                        this.servicePriceWithTax : this.servicePriceWithoutTax}
                                </div>
                                <div className="col-sm-4">
                                    -
                                </div>
                            </div>
                            {this.serviceDeposit &&
                            <div className="row">
                                <div className="col-sm-4">
                                    <FormattedMessage {...messages.serviceDeposit} />
                                </div>
                                <div className="col-sm-4">
                                    -
                                </div>
                                <div className="col-sm-4">
                                    {this.serviceDeposit}
                                </div>
                            </div>
                            }
                            <div className="row order-table-head">
                                <div className="col-sm-4">
                                    <strong><FormattedMessage {...messages.devices} /></strong>
                                </div>
                            </div>
                            {this.installments && this.installments.map((installment) => {
                                return (
                                    <div className="row" key={`installment_${installment.months}`}>
                                        <div className="col-sm-4">
                                            {installment.months} <FormattedMessage {...messages.installment} />
                                        </div>
                                        <div className="col-sm-4">
                                            {this.state.isExpandTaxBtn ? this.props.formatPrice(installment.installmentCharge.totalAmountWithTax, 'monthly', true) :
                                                this.props.formatPrice(installment.installmentCharge.totalAmountWithoutTax, 'monthly', true)}
                                        </div>
                                        <div className="col-sm-4">
                                            -
                                        </div>
                                    </div>
                                );
                            })
                            }
                            <div className="row">
                                <div className="col-sm-4">
                                    <FormattedMessage {...messages.fullPrice} />
                                </div>
                                <div className="col-sm-4">
                                    -
                                </div>
                                <div className="col-sm-4">
                                    {this.state.isExpandTaxBtn ? this.taxTotalPrice : this.deviceFullPrice}
                                </div>
                            </div>
                            {this.downPayment.totalAmountWithTax &&
                            (<div className="row">
                                <div className="col-sm-4">
                                    <FormattedMessage {...messages.downPayment} />
                                </div>
                                <div className="col-sm-4">
                                    -
                                </div>
                                <div className="col-sm-4">
                                    {this.state.isExpandTaxBtn ?
                                        this.downPayment.totalAmountWithTax : this.downPayment.totalAmountWithoutTax}
                                </div>
                            </div>)}
                            {this.equipmentDeposit &&
                            (<div className="row">
                                <div className="col-sm-4">
                                    <FormattedMessage {...messages.deviceDeposit} />
                                </div>
                                <div className="col-sm-4">
                                    -
                                </div>
                                <div className="col-sm-4">
                                    {this.equipmentDeposit}
                                </div>
                            </div>)}
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TotalPrice;
