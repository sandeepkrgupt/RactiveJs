import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import DigitalComponents from 'digital-common-components';
import messages from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.i18n';
import Discount from './AgreementSummary.discount';

const {Tooltip} = DigitalComponents.DigitalControllerComponents;

class addOnsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discountOn: false,
            isToggleCollapsed: true
        };
    }

    changeDiscountStatus() {
        if (!this.state.discountOn) {
            this.setState({
                discountOn: true
            });
        }
    }

    render() {
        const {addOnsArray, addOnsTotal, isSharedAllowance} = this.props;
        const discountIcon = <img src="resources/pic/discount.svg" alt="" />;
        const collapseClass = `collapse ${this.state.isToggleCollapsed ? '' : 'in'}`;

        return (
            <div className="offer-accordion" id="accordion">
                <div className="offer-accordion-heading">
                    <div className="row">
                        <div className="col-sm-6 col-md-5 offer-title">
                            <strong className="b-p3">
                                <FormattedMessage {...messages.addOnsCount} values={{count: this.props.addOnsArray.length}} />
                            </strong>
                            <a
                                className={`offer-accordion-btn link ${this.state.isToggleCollapsed ? '' : 'non-collapse'}`}
                                onClick={() => this.setState({isToggleCollapsed: !this.state.isToggleCollapsed})}>
                                <FormattedMessage {...(this.state.isToggleCollapsed ? messages.showAddons : messages.hideAddons)} />
                            </a>
                        </div>
                        <div className="col-sm-3 col-md-2 col-md-offset-2">
                            { !isSharedAllowance && (
                                <dl className="description description-small">
                                    <dt><FormattedMessage {...messages.perSubscription} /></dt>
                                    <dd className="align-center">
                                        { addOnsTotal && addOnsTotal.addOnsSummaryWithoutTax }
                                        { this.state.discountOn &&
                                            <Tooltip icon={discountIcon} >
                                                <div>
                                                    <FormattedMessage {...messages.viewAddonDetails} />
                                                </div>
                                            </Tooltip>
                                        }
                                    </dd>
                                </dl>
                            )}
                        </div>
                        <div className="col-sm-3 col-md-2">
                            <dl className="description description-small">
                                <dt><FormattedMessage {...messages.total} /></dt>
                                <dd>
                                    { addOnsTotal && addOnsTotal.totalAddOnsSummaryWithoutTax }
                                    { isSharedAllowance && this.state.discountOn &&
                                        <Tooltip icon={discountIcon} >
                                            <div>
                                                <FormattedMessage {...messages.viewAddonDetails} />
                                            </div>
                                        </Tooltip>
                                    }
                                </dd>
                            </dl>
                        </div>
                    </div>

                </div>
                <div className={`offer-accordion-content ${collapseClass}`} id="collapseOne" aria-expanded="true">
                    {
                        addOnsArray && addOnsArray.length > 0 && addOnsArray.map((addOnsItem) => {
                            return (
                                <div className="row" key={`add_ons_${addOnsItem.addOnsName}`}>
                                    <div>
                                        <div className="col-sm-6 col-md-5">
                                            {addOnsItem.addOnsName}
                                        </div>
                                        <div className="col-sm-3 col-md-2 col-md-offset-2">
                                            { !isSharedAllowance && (
                                                <div>
                                                    { addOnsItem.finalAmountWithoutTax }
                                                    { addOnsItem.discountPercentage && addOnsItem.discountPercentage !== '0%' &&
                                                        <Tooltip icon={discountIcon} >
                                                            {this.changeDiscountStatus()}
                                                            <Discount
                                                                amoutWithoutTax={addOnsItem.amoutWithoutTax}
                                                                discountPercentage={addOnsItem.discountPercentage}
                                                                discountDuration={addOnsItem.discountDuration}
                                                                discountAmountWithoutTax={addOnsItem.discountAmountWithoutTax}
                                                                finalAmountWithoutTax={addOnsItem.finalAmountWithoutTax}
                                                            />
                                                        </Tooltip>
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-sm-3 col-md-2">
                                            {addOnsItem.totalFinalAmountWithoutTax}
                                            { isSharedAllowance && addOnsItem.discountPercentage && addOnsItem.discountPercentage !== '0%' &&
                                                <Tooltip icon={discountIcon} >
                                                    {this.changeDiscountStatus()}
                                                    <Discount
                                                        amoutWithoutTax={addOnsItem.amoutWithoutTax}
                                                        discountPercentage={addOnsItem.discountPercentage}
                                                        discountDuration={addOnsItem.discountDuration}
                                                        discountAmountWithoutTax={addOnsItem.discountAmountWithoutTax}
                                                        finalAmountWithoutTax={addOnsItem.finalAmountWithoutTax}
                                                    />
                                                </Tooltip>
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default addOnsList;
