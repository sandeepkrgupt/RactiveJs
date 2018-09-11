import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import DigitalComponents from 'digital-common-components';
import messages from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.i18n';
import {EDITABLE_STATUS} from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.consts';
import Discount from './AgreementSummary.discount';
import AddonsList from './AgreementSummary.addonsList';
import AreaCode from './AgreementSummary.areaCode';

const {Tooltip} = DigitalComponents.DigitalControllerComponents;


class BotItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.isToggleCollapse = true;
        this.removeBOT = this.props.removeBOT;
        this.goToConfigurePlan = this.props.goToConfigurePlan;
        this.sa_status = this.props.status;
        this.showError = false;
    }

    toggleCollapse () {
        this.setState({isToggleCollapse: !this.state.isToggleCollapse});
    }

    fetchData(data) {
        this.bot = data.botItem;
        this.showError = data.botItem.showError;
        this.maxBOTSubscriptions = data.totalAgreementSummaryPriceData.maxBOTSubscriptions;
    }

    render() {
        const discountIcon = <img src="resources/pic/discount.svg" alt="" />;
        this.fetchData(this.props);
        if (this.props.totalAgreementSummaryPriceData.salesAgreementStatus) {
            this.sa_status = this.props.totalAgreementSummaryPriceData.salesAgreementStatus.code;
        }
        const inlineAlertPadding = {
            padding: '8px'
        };

        return (
            <div>
                { this.showError &&
                    (<div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="alert alert-danger alert-close">
                                    <div style={inlineAlertPadding}>
                                        <div className="alert-close-icon">
                                            <img src="resources/pic/alert_circle.svg" alt="" />
                                        </div>
                                        <FormattedMessage
                                            {...messages.botLevelLimitMsg}
                                            values={{X: this.bot.planSubscriptionsNo, Y: this.maxBOTSubscriptions}} />
                                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">
                                            <img src="resources/img/close.svg" alt="close" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>)
                }
                <div className="col-sm-12 offer-head">
                    <div className="row">
                        <div className="col-sm-5 col-md-5 offer-icon">
                            <img src="resources/pic/business-offer.svg" alt="" />
                            <h4>{this.bot.planName}</h4>
                            <p>{this.bot.productOffering}</p>
                            { this.bot.isDeviceInstallments ? <div hidden /> : this.bot.commitment &&
                            <p>
                                <img src="resources/pic/commitment.svg" alt="" /> {this.bot.commitment}
                                &nbsp;<span>{messages.monthsCommitmentText.defaultMessage}</span>
                            </p> }
                        </div>
                        <div className="col-sm-2 col-md-2 border-left hidden-sm">

                            <dl className="description">
                                <dt><FormattedMessage {...messages.perSubscription} /></dt>
                                <dd>{this.bot.planSubscriptionsNo}</dd>
                            </dl>
                        </div>
                        <div className="col-sm-3 col-md-2 border-left">

                            <dl className="description">
                                <dt><FormattedMessage {...messages.subscriptions} /></dt>
                                <dd className="align-center">
                                    {this.bot.planPrice}
                                    {this.bot.planDiscountPercentage &&
                                    this.bot.planDiscountPercentage !== '0%' &&
                                    <Tooltip icon={discountIcon} >
                                        <Discount
                                            amoutWithoutTax={this.bot.planAmoutWithoutTax}
                                            discountPercentage={this.bot.planDiscountPercentage}
                                            discountDuration={this.bot.planDiscountDuration}
                                            discountAmountWithoutTax={this.bot.planDiscountAmountWithoutTax}
                                            finalAmountWithoutTax={this.bot.planFinalAmountWithoutTax}
                                        />
                                    </Tooltip>
                                    }
                                </dd>
                            </dl>
                        </div>
                        <div className="col-sm-3 col-md-2">

                            <dl className="description">
                                <dt><FormattedMessage {...messages.total} /></dt>
                                <dd>{this.bot.planTotalSubscriptionsPrice}</dd>
                            </dl>
                        </div>
                        {this.sa_status === EDITABLE_STATUS &&
                        <div className="col-sm-1">
                            <div className="settings">
                                <div className="settings-preview"><span /></div>
                                <div className="settings-list">
                                    <div
                                        className="settings-item"
                                        onClick={() => this.goToConfigurePlan({
                                            orderActionID: this.bot.orderActionID,
                                            planName: this.bot.planName,
                                            deviceName: this.bot.deviceName,
                                            isConfigureBOT: true
                                        })}>
                                        <span className="settings-icon">
                                            <img src="resources/pic/configure_blue.svg" alt="" />
                                        </span>
                                        <FormattedMessage {...messages.configure} />
                                    </div>
                                    <div className="settings-item" onClick={() => this.removeBOT({orderID: this.bot.orderID})}>
                                        <span className="settings-icon">
                                            <img src="resources/pic/remove.svg" alt="" />
                                        </span>
                                        <FormattedMessage {...messages.delete} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>

                <div className="col-sm-12">
                    <div className="offer-body">
                        {
                            this.bot.addOnsArray && this.bot.addOnsArray.length > 0 &&
                            <AddonsList addOnsArray={this.bot.addOnsArray} addOnsTotal={this.bot.addOnsTotal} />
                        }
                        <div className="offer-item" id={`panelDevice_${this.bot.orderActionID}`}>
                            {!this.bot.isBYOD ?
                                <div className="row">
                                    <div className="col-sm-4 col-md-5 offer-icon">
                                        <img src="resources/pic/phone.svg" alt="" />
                                        <strong className="p-b3">{this.bot.deviceName}</strong>
                                    </div>
                                    <div className="col-sm-2 col-md-2 border-left">
                                        <dl className="description">
                                            <dt><FormattedMessage {...messages.devices} /></dt>
                                            <dd>{this.bot.planSubscriptionsNo}</dd>
                                        </dl>
                                    </div>
                                    <div className="col-sm-3 col-md-2 border-left">
                                        <dl className="description description-small">
                                            <dt> <FormattedMessage {...messages.devicePer} /></dt>
                                            {this.bot.isDeviceInstallments ?
                                                <dd>
                                                    {this.bot.deviceInstallmentsPrice}
                                                    {this.bot.deviceInstallmentDiscountPercentage &&
                                                    this.bot.deviceInstallmentDiscountPercentage !== '0%' &&
                                                    <Tooltip icon={discountIcon} >
                                                        <Discount
                                                            amoutWithoutTax={this.bot.deviceInstallmentAmoutWithoutTax}
                                                            discountPercentage={this.bot.deviceInstallmentDiscountPercentage}
                                                            discountDuration={this.bot.deviceInstallmentDiscountDuration}
                                                            discountAmountWithoutTax={this.bot.deviceInstallmentDiscountAmountWithoutTax}
                                                            finalAmountWithoutTax={this.bot.deviceInstallmentsPrice}
                                                        />
                                                    </Tooltip>
                                                    }
                                                    {
                                                        <p>
                                                            {this.bot.deviceInstallmentsCount}&nbsp;
                                                            <FormattedMessage {...messages.installment} />
                                                        </p>
                                                    }
                                                </dd> :
                                                <dd>
                                                    <span>{this.bot.deviceFullPrice}
                                                        {this.bot.immediateCharge &&
                                                        this.bot.immediateCharge.discountPercentage &&
                                                        this.bot.immediateCharge.discountPercentage !== '0%' &&
                                                        <Tooltip icon={discountIcon} >
                                                            <Discount
                                                                amoutWithoutTax={this.bot.immediateCharge.amoutWithoutTax}
                                                                discountPercentage={this.bot.immediateCharge.discountPercentage}
                                                                discountDuration={this.bot.immediateCharge.discountDuration}
                                                                discountAmountWithoutTax={this.bot.immediateCharge.discountAmountWithoutTax}
                                                                finalAmountWithoutTax={this.bot.immediateCharge.finalAmountWithoutTax}
                                                            />
                                                        </Tooltip>
                                                        }
                                                    </span>
                                                    { this.bot.commitment && this.bot.commitment.length > 0 ?
                                                        <p>{messages.subsidizedText.defaultMessage}</p> :
                                                        <p> <FormattedMessage {...messages.fullPrice} /></p>
                                                    }
                                                </dd>}

                                        </dl>
                                    </div>
                                    <div className="col-sm-3 col-md-2">
                                        <dl className="description description-small">
                                            <dt><FormattedMessage {...messages.total} /></dt>
                                            <dd>{this.bot.totalFinalAmountWithoutTax}</dd>
                                        </dl>
                                    </div>
                                </div> :
                                <div className="row">
                                    <div className="col-sm-4 col-md-5 offer-icon">
                                        <img src="resources/pic/byod.svg" alt="" />
                                        <strong className="p-b3">{this.bot.deviceName}</strong>
                                    </div>
                                </div>}
                        </div>
                        <AreaCode botItem={this.bot} {...this.props} key={this.bot.orderActionID} />
                    </div>
                </div>
            </div>
        );
    }
}

export default BotItem;
