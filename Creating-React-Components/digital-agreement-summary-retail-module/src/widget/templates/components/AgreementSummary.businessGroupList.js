import React, {Component} from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import Consts from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.consts';
import CreateAgreementActions from 'digital-create-sales-agreement-retail-module/src/sdk/CreateSalesAgreement.actions';
import messages from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.i18n';
import BusinessGroup from './AgreementSummary.businessGroup';

class BusinessGroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    formatTaxValue(withTaxPrice, withoutTaxPrice, isMonthly, isDecimal) {
        const isMonthlyFormat = isMonthly == null || isMonthly ? 'monthly' : null;
        const isDecimalFormat = isDecimal != null ? isDecimal : true;
        return (
            this.props.isExpandTaxBtn ?
                this.props.formatPrice(withTaxPrice, isMonthlyFormat, isDecimalFormat) :
                this.props.formatPrice(withoutTaxPrice, isMonthlyFormat, isDecimalFormat)
        );
    }

    fetchData(data) {
        this.isBusinessGroups = false;
        this.businessGroups = {};
        if (data.businessGroups && data.businessGroups.length > 0) {
            this.sa_status = this.props.totalAgreementSummaryPriceData.salesAgreementStatus.code;
            this.isBusinessGroups = true;
            this.businessGroupsCount = data.businessGroups.length;
            this.businessGroups = data.businessGroups.map((groupItem) => {
                const newGroup = {
                    groupName: groupItem.groupName,
                    groupID: groupItem.groupID
                };

                if (groupItem.sharedAllowance) {
                    newGroup.isSharedAllowance = true;
                    if (groupItem.sharedAllowance.basePlan) {
                        newGroup.sharedAllowanceName = groupItem.sharedAllowance.basePlan.planName;
                        const sharedAllowancePriceDetails = groupItem.sharedAllowance.basePlan.planPriceDetails;
                        if (sharedAllowancePriceDetails && sharedAllowancePriceDetails.recurringCharge) {
                            newGroup.sharedAllowancePrice =
                                this.formatTaxValue(
                                    sharedAllowancePriceDetails.recurringCharge.totalFinalAmountWithTax,
                                    sharedAllowancePriceDetails.recurringCharge.totalFinalAmountWithoutTax);
                        }
                        newGroup.sharedAllowanceBasePlan = true;
                        newGroup.sharedAllowanceOrderId = groupItem.sharedAllowance.orderID;
                        newGroup.sharedAllowanceOrderActionId = groupItem.sharedAllowance.orderActionID;
                        if (sharedAllowancePriceDetails) {
                            this.discountSharedAllowance(sharedAllowancePriceDetails, newGroup);
                        }
                    }
                    if (groupItem.sharedAllowance.additionalAllowances &&
                        groupItem.sharedAllowance.additionalAllowances.length > 0) {
                        this.handleAddons(groupItem.sharedAllowance, newGroup);
                    }
                    newGroup.isAddSharedAllowanceAllowed = groupItem.sharedAllowance.isAddAllowed;
                }

                if (groupItem.bots === undefined || groupItem.bots.length === 0) {
                    newGroup.showError = true;
                }

                if (groupItem.bots && groupItem.bots.length > 0) {
                    newGroup.isBots = true;
                    newGroup.bots = groupItem.bots.map((botItem) => {
                        const newBot = {};
                        if (botItem.plan) {
                            newBot.planName = botItem.plan.planName;
                            newBot.orderActionID = botItem.plan.orderActionID;
                            newBot.orderID = botItem.plan.orderID;
                            newBot.productOffering = botItem.plan.productOffering;
                            newBot.planPrice =
                                this.formatTaxValue(
                                    botItem.plan.finalAmountWithTax,
                                    botItem.plan.finalAmountWithoutTax);
                            newBot.planSubscriptionsNo = botItem.plan.subscriptionsNo;
                            newBot.showError = botItem.plan.showError;
                            newBot.planTotalSubscriptionsPrice =
                                this.formatTaxValue(
                                    botItem.plan.totalSubscriptionsPriceWithTax,
                                    botItem.plan.totalSubscriptionsPrice);
                            this.discountPlan(botItem, newBot);
                            this.handleAddons(botItem, newBot);
                        }

                        if (botItem.commitment && botItem.commitment.length > 0) {
                            newBot.commitment = botItem.commitment;
                        }

                        newBot.orderActionID = botItem.orderActionID;
                        if (botItem.nirDetails) {
                            newBot.nirDetails = botItem.nirDetails;
                        }

                        if (botItem.device && !botItem.device.isBYOD) {
                            newBot.isBYOD = botItem.device.isBYOD;
                            newBot.deviceName = botItem.device.deviceName;
                            newBot.deviceFullPrice =
                                this.formatTaxValue(
                                    botItem.device.fullPriceWithTax, botItem.device.fullPrice, false);
                            if (botItem.device.installments) {
                                newBot.totalFinalAmountWithoutTax =
                                    this.formatTaxValue(
                                        botItem.device.installments[0].installmentCharge.totalFinalAmountWithTax,
                                        botItem.device.installments[0].installmentCharge.totalFinalAmountWithoutTax);
                            } else {
                                newBot.totalFinalAmountWithoutTax =
                                    this.formatTaxValue(
                                        botItem.device.immediateCharge.totalFinalAmountWithTax,
                                        botItem.device.immediateCharge.totalFinalAmountWithoutTax, false);
                            }
                            this.discountDeviceFullPrice(botItem, newBot);

                            if (botItem.device.installments) {
                                newBot.isDeviceInstallments = true;
                                newBot.deviceInstallmentsCount = botItem.device.installments[0].months;
                                newBot.deviceInstallmentsPrice =
                                    this.formatTaxValue(
                                        botItem.device.installments[0].installmentCharge.finalAmountWithTax,
                                        botItem.device.installments[0].installmentCharge.finalAmountWithoutTax);
                                newBot.deviceInstallmentAmoutWithoutTax =
                                    this.formatTaxValue(
                                        botItem.device.installments[0].installmentCharge.amoutWithTax,
                                        botItem.device.installments[0].installmentCharge.amoutWithoutTax);
                                newBot.deviceInstallmentDiscountPercentage =
                                    this.props.formatPercentage(
                                        botItem.device.installments[0].installmentCharge.discountPercentage);
                                newBot.deviceInstallmentDiscountDuration =
                                    botItem.device.installments[0].installmentCharge.discountDuration;
                                newBot.deviceInstallmentDiscountAmountWithoutTax =
                                    this.formatTaxValue(
                                        botItem.device.installments[0].installmentCharge.discountAmountWithTax,
                                        botItem.device.installments[0].installmentCharge.discountAmountWithoutTax);
                            }
                        } else {
                            newBot.isBYOD = botItem.device.isBYOD;
                            newBot.deviceName = botItem.device.deviceName;
                        }

                        return newBot;
                    });
                }

                return newGroup;
            });
        }
    }

    handleAddons(item, newItem) {
        const addOns = item.addOns || item.additionalAllowances;

        if (addOns) {
            newItem.addOnsArray = [];
            for (let i = 0; i < addOns.length; i += 1) {
                newItem.addOnsArray[i] = {};
                newItem.addOnsArray[i].discountPercentage =
                    this.props.formatPercentage(addOns[i].planPriceDetails.recurringCharge.discountPercentage);
                newItem.addOnsArray[i].amoutWithoutTax =
                    this.formatTaxValue(
                        addOns[i].planPriceDetails.recurringCharge.amoutWithTax,
                        addOns[i].planPriceDetails.recurringCharge.amoutWithoutTax);
                newItem.addOnsArray[i].discountDuration = addOns[i].planPriceDetails.recurringCharge.discountDuration;
                newItem.addOnsArray[i].discountAmountWithoutTax =
                    this.formatTaxValue(
                        addOns[i].planPriceDetails.recurringCharge.discountAmountWithTax,
                        addOns[i].planPriceDetails.recurringCharge.discountAmountWithoutTax);
                newItem.addOnsArray[i].finalAmountWithoutTax =
                    this.formatTaxValue(
                        addOns[i].planPriceDetails.recurringCharge.finalAmountWithTax,
                        addOns[i].planPriceDetails.recurringCharge.finalAmountWithoutTax);
                newItem.addOnsArray[i].totalFinalAmountWithoutTax =
                    this.formatTaxValue(
                        addOns[i].planPriceDetails.recurringCharge.totalFinalAmountWithTax,
                        addOns[i].planPriceDetails.recurringCharge.totalFinalAmountWithoutTax);
                newItem.addOnsArray[i].addOnsName = addOns[i].planName;
            }
        }

        if (item.addOnsTotal) {
            newItem.addOnsTotal = {};
            newItem.addOnsTotal.addOnsSummaryWithoutTax =
                this.formatTaxValue(
                    item.addOnsTotal.addOnsSummaryWithTax,
                    item.addOnsTotal.addOnsSummaryWithoutTax);
            newItem.addOnsTotal.totalAddOnsSummaryWithoutTax =
                this.formatTaxValue(
                    item.addOnsTotal.totalAddOnsSummaryWithTax,
                    item.addOnsTotal.totalAddOnsSummaryWithoutTax);
        }
    }

    discountDeviceFullPrice(botItem, newBot) {
        if (botItem.device.immediateCharge && botItem.device.immediateCharge.discountPercentage) {
            newBot.immediateCharge = {};
            newBot.immediateCharge.finalAmountWithoutTax =
                this.formatTaxValue(
                    botItem.device.immediateCharge.finalAmountWithTax,
                    botItem.device.immediateCharge.finalAmountWithoutTax);
            newBot.immediateCharge.amoutWithoutTax =
                this.formatTaxValue(
                    botItem.device.immediateCharge.amoutWithTax,
                    botItem.device.immediateCharge.amoutWithoutTax);
            newBot.immediateCharge.discountPercentage = this.props.formatPercentage(
                botItem.device.immediateCharge.discountPercentage);
            newBot.immediateCharge.discountDuration =
                botItem.device.immediateCharge.discountDuration;
            newBot.immediateCharge.discountAmountWithoutTax =
                this.formatTaxValue(
                    botItem.device.immediateCharge.discountAmountWithTax,
                    botItem.device.immediateCharge.discountAmountWithoutTax);
        }
    }

    discountPlan(botItem, newBot) {
        if (botItem.plan.discountPercentage) {
            newBot.planDiscountPercentage =
                this.props.formatPercentage(botItem.plan.discountPercentage);
            newBot.planDiscountDuration = botItem.plan.discountDuration;
            newBot.planDiscountAmountWithoutTax =
                this.formatTaxValue(
                    botItem.plan.discountAmountWithTax,
                    botItem.plan.discountAmountWithoutTax);
            newBot.planAmoutWithoutTax =
                this.formatTaxValue(
                    botItem.plan.amoutWithTax,
                    botItem.plan.amoutWithoutTax);
            newBot.planFinalAmountWithoutTax =
                this.formatTaxValue(
                    botItem.plan.finalAmountWithTax,
                    botItem.plan.finalAmountWithoutTax);
        }
    }

    discountSharedAllowance(sharedAllowancePriceDetails, newGroup) {
        if (sharedAllowancePriceDetails.recurringCharge && sharedAllowancePriceDetails.recurringCharge.discountPercentage) {
            newGroup.sharedAllowance = {};
            newGroup.sharedAllowance.amoutWithoutTax =
                this.formatTaxValue(
                    sharedAllowancePriceDetails.recurringCharge.amoutWithTax,
                    sharedAllowancePriceDetails.recurringCharge.amoutWithoutTax);
            newGroup.sharedAllowance.discountPercentage =
                this.props.formatPercentage(
                    sharedAllowancePriceDetails.recurringCharge.discountPercentage);
            newGroup.sharedAllowance.discountDuration =
                sharedAllowancePriceDetails.recurringCharge.discountDuration;
            newGroup.sharedAllowance.discountAmountWithoutTax =
                this.formatTaxValue(
                    sharedAllowancePriceDetails.recurringCharge.discountAmountWithTax,
                    sharedAllowancePriceDetails.recurringCharge.discountAmountWithoutTax);
            newGroup.sharedAllowance.finalAmountWithoutTax =
                this.formatTaxValue(
                    sharedAllowancePriceDetails.recurringCharge.finalAmountWithTax,
                    sharedAllowancePriceDetails.recurringCharge.finalAmountWithoutTax);
        }
    }

    render() {
        this.fetchData(this.props.totalAgreementSummaryGroupsData);

        return (
            <div id="businessGroupList">
                { this.isBusinessGroups && this.businessGroups.map((groupItem) => {
                    return (
                        <BusinessGroup key={groupItem.groupID} groupItem={groupItem} {...this.props} />
                    );
                })}
            </div>
        );
    }
}

export default BusinessGroupList;
