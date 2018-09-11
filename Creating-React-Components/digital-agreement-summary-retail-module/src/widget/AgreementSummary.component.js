import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AgreementSummaryMainView from 'digital-agreement-summary-retail-module/src/widget/templates/AgreementSummary.mainView';
import AgreementSummaryProps from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.propsProvider';

class AgreementSummaryComponent extends Component {
    static get contextTypes() {
        return {
            policy: PropTypes.func,
            permissions: PropTypes.object,
            config: PropTypes.object
        };
    }

    constructor(props) {
        super(props);
        this.propsProvider = new AgreementSummaryProps(this.context);
    }

    render() {
        return <AgreementSummaryMainView {...this.propsProvider.getComponentProps(this.props)} />;
    }
}

export default AgreementSummaryComponent;

