import React, {Component} from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import DigitalComponents from 'digital-common-components';
import {EDITABLE_STATUS} from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.consts';
import messages from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.i18n';
import FreeMonthsItem from './AgreementSummary.freeMonthsItem';


const {Tooltip} = DigitalComponents.DigitalControllerComponents;

class FreeMonthsList extends Component {

    getMapFreeMonthsListDiv(totalAgreementSummaryFreeMonthsData) {
        return (
            <div className="col-sm-12">
                <div className="order-month-body">
                    {totalAgreementSummaryFreeMonthsData.map((monthItem) => {
                        return (
                            <FreeMonthsItem key={monthItem} monthItem={monthItem} />
                        );
                    })}
                </div>
            </div>
        );
    }

    getAddFreeMonthsHeaderDiv() {
        const questionIcon = <img src="resources/pic/question.svg" alt="" />;
        return (
            <div>
                <span className="order-add-icon">
                    <img src="resources/img/plus.svg" alt="" />
                </span>
                <a className="link" onClick={e => this.props.openUpdateFreeMonthsPopUp(e)}>
                    <FormattedMessage {...messages.addFreeMonthsText} />
                    <Tooltip icon={questionIcon} >
                        <FormattedMessage {...messages.freeMonthsTooltipText} />
                    </Tooltip>
                </a>
            </div>
        );
    }

    getNoFreeMonthsSelectedDiv() {
        return (
            <div>
                <span className="col-md-12">
                    <FormattedMessage {...messages.freeMonthsNotAdded} />
                </span>
            </div>
        );
    }

    getExistingFreeMonthsHeaderDiv(totalAgreementSummaryFreeMonthsData) {
        const questionIcon = <img src="resources/pic/question.svg" alt="" />;
        return (
            <div>
                <span className="p-b3">
                    <FormattedMessage {...messages.freeMonthsText} />
                </span>
                <Tooltip icon={questionIcon} >
                    <FormattedMessage{...messages.freeMonthsTooltipText} />
                </Tooltip>
                {(this.sa_status === EDITABLE_STATUS && totalAgreementSummaryFreeMonthsData.length > 0) &&
                <span>
                    <a className="m-l-25 link" onClick={e => this.props.openUpdateFreeMonthsPopUp(e)}>
                        <FormattedMessage {...messages.EditText} />
                    </a>
                    <a className="m-l-25 link" onClick={() => this.props.clearAllFreeMonths()}>
                        <FormattedMessage {...messages.clearAllHeaderText} />
                    </a>
                </span>
                }
            </div>
        );
    }

    getRelevantDivForFreeMonthList(totalAgreementSummaryFreeMonthsData, addClass) {
        if (totalAgreementSummaryFreeMonthsData) {
            const commissionAffectation = this.props.totalAgreementSummaryPriceData.commissionAffectation;
            const commissionAffectationForDisplay = (commissionAffectation && commissionAffectation !== 'unknown') ? commissionAffectation : '0';
            return (
                <div className="row order-month-wrap">
                    <div className={`col-sm-12 order-month ${addClass}`}>
                        <div className="row">
                            <div className="col-sm-8 col-md-9 order-add-title">
                                {this.sa_status === EDITABLE_STATUS && totalAgreementSummaryFreeMonthsData.length === 0
                                && this.getAddFreeMonthsHeaderDiv()}
                                {this.sa_status !== EDITABLE_STATUS && totalAgreementSummaryFreeMonthsData.length === 0
                                && this.getNoFreeMonthsSelectedDiv()}
                                {totalAgreementSummaryFreeMonthsData.length > 0 &&
                                this.getExistingFreeMonthsHeaderDiv(totalAgreementSummaryFreeMonthsData)}
                            </div>
                            <div className="col-sm-4 col-md-3 order-add-commission">
                                <FormattedMessage
                                    {...messages.taxAssignmentText}
                                    values={
                                        {commissionAffectation: commissionAffectationForDisplay}
                                    } />
                            </div>
                        </div>
                    </div>
                    {totalAgreementSummaryFreeMonthsData.length > 0 &&
                    this.getMapFreeMonthsListDiv(totalAgreementSummaryFreeMonthsData)}
                </div>
            );
        }
        return <div />;
    }

    render() {
        const {totalAgreementSummaryFreeMonthsData} = this.props;
        if (this.props.totalAgreementSummaryPriceData.salesAgreementStatus) {
            this.sa_status = this.props.totalAgreementSummaryPriceData.salesAgreementStatus.code;
        }
        const addClass = totalAgreementSummaryFreeMonthsData &&
        totalAgreementSummaryFreeMonthsData.length === 0 ? 'order-add' : '';
        return this.getRelevantDivForFreeMonthList(totalAgreementSummaryFreeMonthsData, addClass);
    }
}

export default FreeMonthsList;
