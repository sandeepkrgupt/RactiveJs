import React, {Component} from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import messages from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.i18n';


class FreeMonthsItem extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <FormattedMessage {...messages.contractActivationText} values={{freeMonthNumber: this.props.monthItem}} />
                </div>
            </div>
        );
    }
}

export default FreeMonthsItem;
