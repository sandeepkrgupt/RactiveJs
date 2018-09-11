import React, {Component} from 'react';
import messages from 'digital-bot-select-device-retail-module/src/widget/BotSelectDevice.i18n';
import SearchComponent from 'digital-common-components/src/business-components/SearchComponent';

export default class SearchDevice extends Component {
    constructor(viewProps) {
        super(viewProps);
        this.upadteDevicesSearc = viewProps.upadteDevicesSearch;
        this.state = {
            buttonDisabled: false
        };
    }

    onSearchSubmit(text) {
        this.props.upadteDevicesSearch(text);
    }

    render() {
        return (
            <div className="row m-b-15">
                <div className="col-md-6">
                    <SearchComponent
                        onSubmit={(text) => { this.onSearchSubmit(text); }}
                        placeHolder={messages.searchDevice.defaultMessage}
                        searchText={this.props.searchText}
                        buttonDisabled={this.state.buttonDisabled} />
                </div>
            </div>
        );
    }
}
