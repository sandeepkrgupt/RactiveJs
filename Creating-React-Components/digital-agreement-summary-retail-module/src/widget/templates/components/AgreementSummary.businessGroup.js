import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import DigitalComponents from 'digital-common-components';
import {EDITABLE_STATUS} from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.consts';
import messages from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.i18n';
import BotItem from './AgreementSummary.botItem';
import Discount from './AgreementSummary.discount';
import AddonsList from './AgreementSummary.addonsList';

const {Tooltip} = DigitalComponents.DigitalControllerComponents;

class BusinessGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.isExpandEditMenu = false;
        this.goToSharedAllowance = this.props.goToSharedAllowance;
        this.goToSelectPlan = this.props.goToSelectPlan;
        this.removeBOT = this.props.removeBOT;
        this.goToConfigurePlan = this.props.goToConfigurePlan;
        this.showError = false;
    }

    getExistingAllowedSharedAllowanceDiv() {
        /* eslint-disable */
        const discountIcon = <img src="resources/pic/discount.svg" alt="" />;
        return (
            <div className={`order-allowance ${this.businessGroup.addOnsArray ? 'addons-shared-allowance' : ''}`}>
                <div className="col-sm-8 col-md-9 order-allowance-icon">
                    <img src="resources/pic/allowance.svg" alt="" />
                    <h4>{this.businessGroup.sharedAllowanceName}</h4>
                </div>

                <div className="col-sm-3 col-md-2">
                    <dl className="description">
                        <dt><FormattedMessage {...messages.total} /></dt>
                        <dd>{this.businessGroup.sharedAllowancePrice}
                            {this.businessGroup.sharedAllowance &&
                            this.businessGroup.sharedAllowance.discountPercentage &&
                            this.businessGroup.sharedAllowance.discountPercentage !== '0%' &&
                            <Tooltip icon={discountIcon} >
                                <Discount
                                    amoutWithoutTax={this.businessGroup.sharedAllowance.amoutWithoutTax}
                                    discountPercentage={this.businessGroup.sharedAllowance.discountPercentage}
                                    discountDuration={this.businessGroup.sharedAllowance.discountDuration}
                                    discountAmountWithoutTax={this.businessGroup.sharedAllowance.discountAmountWithoutTax}
                                    finalAmountWithoutTax={this.businessGroup.sharedAllowance.finalAmountWithoutTax}
                                />
                            </Tooltip>
                            }
                        </dd>
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
                                    orderActionID: this.businessGroup.sharedAllowanceOrderActionId,
                                    groupName: this.businessGroup.groupName,
                                    planName: this.businessGroup.sharedAllowanceName,
                                    isConfigureSharedAllowance: true
                                })}>
                                <span className="settings-icon">
                                    <img src="resources/pic/configure_blue.svg" alt="" />
                                </span>
                                <FormattedMessage {...messages.configure} />
                            </div>
                            <div
                                className="settings-item"
                                onClick={() => this.removeBOT({
                                    orderID: this.businessGroup.sharedAllowanceOrderId
                                })}>
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
        );
    }

    getDisabledSharedAllowanceDiv() {
        return (
            <div className="order-allowance disabled">
                <div className="order-allowance-icon">
                    <img src="resources/pic/business-offer.svg" alt="" />
                    <div>
                        <h4>{this.businessGroup.sharedAllowanceName}</h4>
                        <p className="icon-text p-b5">
                            <img src="resources/pic/info.svg" alt="" />
                            <FormattedMessage {...messages.addSharedAllowance} />
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    getAddSharedAllowanceDiv() {
        const questionIcon = <img src="resources/pic/question.svg" alt="" />;
        return (
            <div className="order-add">
                <div className="col-sm-8 col-md-9 order-add-title">
                    <span className="order-add-icon">
                        <img src="resources/img/plus.svg" alt="" />
                    </span>
                    <a
                        className="link"
                        onClick={(e) => {
                            e.preventDefault();
                            this.goToSharedAllowance({groupName: this.businessGroup.groupName});
                        }}>
                        <FormattedMessage {...messages.addSharedAllowance} />
                        <Tooltip icon={questionIcon} >
                            <FormattedMessage {...messages.monthlyPaymentInfo} />
                        </Tooltip>
                    </a>
                </div>
            </div>
        );
    }

    getRelevantDivForSharedAllowance() {
        if (this.businessGroup.sharedAllowanceBasePlan) {
            if (this.businessGroup.isAddSharedAllowanceAllowed) {
                return this.getExistingAllowedSharedAllowanceDiv();
            }
            return this.getDisabledSharedAllowanceDiv();
        }
        if (this.sa_status === EDITABLE_STATUS) {
            return this.getAddSharedAllowanceDiv();
        }
        return '';
    }

    fetchData(data) {
        this.businessGroup = data.groupItem;
        this.showError = data.groupItem.showError;
        this.sa_status = this.props.totalAgreementSummaryPriceData &&
            this.props.totalAgreementSummaryPriceData.salesAgreementStatus &&
            this.props.totalAgreementSummaryPriceData.salesAgreementStatus.code;
    }

    expandEditMenu() {
        this.setState({isExpandEditMenu: !this.state.isExpandEditMenu});
    }

    render() {
        this.fetchData(this.props);
        const inlineAlertPadding = {
            padding: '8px'
        };

        return (
            <div id={`businessGroup_${this.businessGroup.groupID}`}>
                <div className="row">
                    <div className="col-sm-12 justify">
                        <h2 className="subtitle">
                            <span className="subtitle-icon">
                                <img src="resources/pic/recipients.svg" alt="" />
                            </span>
                            {this.businessGroup.groupName}
                            {this.businessGroup.isBots &&
                                <span className="p-b2 subtext">
                                    <FormattedMessage {...messages.BusinessOfferCount} values={{boCount: this.businessGroup.bots.length}} />
                                </span>
                            }
                        </h2>
                        {this.sa_status === EDITABLE_STATUS &&
                        <a
                            className="link"
                            onClick={(e) => {
                                e.preventDefault();
                                this.goToSelectPlan({
                                    groupName: this.businessGroup.groupName,
                                    groupID: this.businessGroup.groupID
                                });
                            }}><FormattedMessage {...messages.createBusinessOffer} /></a>
                        }
                    </div>
                </div>
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
                                        {...messages.removeLastBotMsg} />
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

                    <div>
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="p-b3"><FormattedMessage {...messages.sharedAllowance} /></h4>
                            </div>
                        </div>
                        <div className="row" id={`sharedAllowanceArea_${this.businessGroup.groupName}`}>
                            <div className="col-sm-12">
                                { this.getRelevantDivForSharedAllowance() }
                                <div className="col-sm-12">
                                    <div className="offer-body">
                                        { this.businessGroup.addOnsArray &&
                                            <AddonsList
                                                addOnsArray={this.businessGroup.addOnsArray}
                                                addOnsTotal={this.businessGroup.addOnsTotal}
                                                isSharedAllowance={true} /> }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                {this.businessGroup.isBots &&
                    <div>
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="p-b3"><FormattedMessage
                                    {...messages.BusinessOffer}
                                    values={{boCount: this.businessGroup.bots.length}} /></h4>
                            </div>
                        </div>
                        <div id={`businessGroup_${this.businessGroup.groupID}`} className="row offer-list">
                            { this.businessGroup.bots.map((botItem) => {
                                return (
                                    <BotItem
                                        key={botItem.orderActionID}
                                        botItem={botItem}
                                        removeBOT={this.removeBOT}
                                        goToConfigurePlan={this.goToConfigurePlan}
                                        status={this.sa_status}
                                        {...this.props}
                                        />
                                );
                            })}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default BusinessGroup;
