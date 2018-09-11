import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import messages from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.i18n';
import {NIR_STATUS} from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.consts';

class AreaCode extends Component {
    openPopUp(item) {
        this.props.openAreaCodePopUp(item);
    }

    removeNirItem(item) {
        this.props.removeBotAreaCode(item);
    }

    render() {
        const {botItem, status} = this.props;
        const {nirDetails} = botItem;

        return (
            <div className="offer-accordion-heading">
                <div className="row">
                    <div className="col-sm-3 col-md-3 offer-title">
                        <strong className="b-p3">
                            {<FormattedMessage {...messages.areaCode} />}
                        </strong>
                    </div>
                    <div className="col-sm-3 col-md-5">
                        {nirDetails ?
                            `${nirDetails.city},${nirDetails.state},${nirDetails.population} \u00A0\u00A0\u00A0\u00A0 ${nirDetails.areaCode}`
                            :
                            <FormattedMessage {...messages.notSelectedText} />
                        }
                    </div>
                    {(status === NIR_STATUS.Draft ||
                        status === NIR_STATUS.PendingPolicyCheck ||
                        status === NIR_STATUS.PolicyCheckApproved) &&
                        <div>
                            { nirDetails ? (
                                <div className="col-sm-3 col-md-2 col-md-offset-2">
                                    <div className="description description-small">
                                        <span>
                                            <a onClick={() => this.openPopUp(botItem)}>{
                                                <FormattedMessage {...messages.changeText} />}</a>
                                            {'  |  '}
                                            <a onClick={() => this.removeNirItem(botItem)}>{nirDetails ?
                                                <FormattedMessage {...messages.removeText} /> : ''}</a>
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="col-sm-3 col-md-2 col-md-offset-2">
                                    <div className="description description-small">
                                        <a className="link" onClick={() => this.openPopUp(botItem)}>{
                                            <FormattedMessage {...messages.selectText} />}</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default AreaCode;
