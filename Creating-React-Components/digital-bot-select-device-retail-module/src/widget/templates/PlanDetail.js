import React from 'react';
import messages from 'digital-bot-select-device-retail-module/src/widget/BotSelectDevice.i18n';
import {Utils} from 'digital-sdk';

export default function PlanDetail({viewProps}) {
    const planPrice = Utils.formatPrice(viewProps.selectedPlanDetail.price, 'monthly', true);
    return (
        <div>
            <div className="col-sm-4 plan-title">
                <img src="resources/img/plan-icon.png" alt="" />
                <h4>{viewProps.selectedPlanDetail.planName}</h4>
                <p>{viewProps.selectedPlanDetail.productOfferingName}</p>
            </div>
            <div className="col-sm-4"><p>{viewProps.selectedPlanDetail.planDescriprion}</p></div>
            <div className="col-sm-2 plan-price">
                {planPrice}
            </div>
            <div className="col-sm-2 plan-btn">
                <a
                    className="btn btn-secondary"
                    id="changePlanButton"
                    onClick={viewProps.changePlanButton}
                >
                    {messages.change.defaultMessage}
                </a>
            </div>
        </div>
    );
}
