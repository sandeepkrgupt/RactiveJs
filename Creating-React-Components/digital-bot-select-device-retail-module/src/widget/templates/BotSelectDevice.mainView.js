import React, {Component} from 'react';
import messages from 'digital-bot-select-device-retail-module/src/widget/BotSelectDevice.i18n';
import PlanDetail from 'digital-bot-select-device-retail-module/src/widget/templates/PlanDetail';
import DeviceList from 'digital-bot-select-device-retail-module/src/widget/templates/DeviceList';
import SearchDevice from 'digital-bot-select-device-retail-module/src/widget/templates/BotSelectDevice.SearchDevice';
import DeviceFilter from 'digital-bot-select-device-retail-module/src/widget/templates/BotSelectDevice.Filter';


class BotSelectDeviceMainView extends Component {
    constructor(props) {
        super(props);
        this.store = {};
        this.updateByodFlag = props.updateByodFlag;
        this.handleBackToDevice = props.handleBackToDevice;
        this.handleToConfigureBot = props.handleToConfigureBot;
        this.clearFilterAndSearch = props.clearFilterAndSearch;
        this.toggleEvent = this.toggleEvent.bind(this);
    }

    getDeviceListDOM() {
        if (this.props.showFilter) {
            const filterDefaultOptions = this.props.deviceList.viewProps.filterDefaultOptions;
            const deviceListClassName = (filterDefaultOptions && filterDefaultOptions.length > 0) ? 'col-sm-10 border-left deviceListContainer' : 'col-sm-12';
            return (
                <div className="row deviceListAndFilterContainer">

                    <DeviceFilter
                        {...this.props.deviceList.viewProps}
                        filterDefaultOptionsCount={this.filterDefaultOptionsCount} />
                    <div className={deviceListClassName}>
                        <SearchDevice {...this.props.deviceList.viewProps} />
                        <DeviceList
                            {...this.props.deviceList.viewProps}
                            showFilter={this.props.showFilter}
                            clearFilterAndSearch={this.clearFilterAndSearch} />
                    </div>
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col-sm-12">
                    <DeviceList
                        {...this.props.deviceList.viewProps}
                        showFilter={this.props.showFilter} />
                </div>
            </div>
        );
    }

    toggleEvent(event) {
        if (event.target.checked) {
            this.updateByodFlag(true);
            this.handleToConfigureBot();
        } else {
            this.handleBackToDevice();
        }
    }

    loadMainView() {
        let isDevicePurchased = false;
        if (this.props.planList.viewProps.selectedPlanDetail
            && this.props.planList.viewProps.selectedPlanDetail.deviceAcquisitionType === 'DevicePurchased') {
            isDevicePurchased = true;
        } else {
            isDevicePurchased = false;
        }

        return (
            <div>
                <div className="row plan">
                    <div className="col-sm-12 plan-head">
                        {messages.selectedPlanLabel.defaultMessage}
                    </div>
                    <PlanDetail {...this.props.planList} />
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h1 className="justify">
                            {messages.selectDeviceLabel.defaultMessage}
                            <span className="nice-toggle">
                                <input
                                    id="niceToggle1"
                                    type="checkbox"
                                    value=""
                                    onClick={this.toggleEvent}
                                    disabled={isDevicePurchased} />
                                <label htmlFor="niceToggle1">
                                    {messages.byod.defaultMessage}
                                </label>
                                {isDevicePurchased ? <small><span>{messages.isDevicePurchased.defaultMessage}</span></small> : ''}
                            </span>
                        </h1>
                    </div>
                </div>
                { this.getDeviceListDOM() }
            </div>
        );
    }

    render() {
        return (
            <div id="deviceListMainDiv" className="container botSelectDevice">
                { this.loadMainView() }
            </div>
        );
    }
}

export default BotSelectDeviceMainView;

