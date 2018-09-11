import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import messages from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.i18n';
import TotalPrice from './components/AgreementSummary.totalPrice';
import BusinessGroupList from './components/AgreementSummary.businessGroupList';
import FreeMonthsList from './components/AgreementSummary.freeMonthsList';


class AgreementSummaryMainView extends Component {

    constructor(props) {
        super(props);
        this.context = props;
    }
    render() {
        this.isLoaded = this.props.totalAgreementSummaryPriceData && this.props.totalAgreementSummaryPriceData.agreementName !== undefined;

        return this.isLoaded && (
        <div id="salesAgreementSummary">
            { this.props.totalAgreementSummaryPriceData &&
            (<TotalPrice totalAgreementSummaryPriceData={this.props.totalAgreementSummaryPriceData} {...this.props} />)}
            <div className="container">
                {this.props.totalAgreementSummaryFreeMonthsData &&
                <FreeMonthsList totalAgreementSummaryFreeMonthsData={this.props.totalAgreementSummaryFreeMonthsData} {...this.props} />
                }
                { this.props.totalAgreementSummaryGroupsData &&
                (<BusinessGroupList totalAgreementSummaryGroupsData={this.props.totalAgreementSummaryGroupsData} {...this.props} />)}
            </div>
            {(this.props.totalAgreementSummaryGroupsData.businessGroups === null ||
            this.props.totalAgreementSummaryGroupsData.businessGroups.length === 0) &&
            <div className="container text-center saNoData">
                <img src="resources/pic/illustartion.svg" alt="" />
                {this.props.totalAgreementSummaryPriceData.addressDetailsForSA &&
                this.props.totalAgreementSummaryPriceData.addressDetailsForSA.deliveryMethod ?
                    <div>
                        <FormattedMessage {...messages.noExistingBusinessGroup} />
                    </div> :
                    <div>
                        <FormattedMessage {...messages.noDelivery} />
                    </div>
                }
            </div>
            }
        </div>
            );
    }
    }

export default AgreementSummaryMainView;
