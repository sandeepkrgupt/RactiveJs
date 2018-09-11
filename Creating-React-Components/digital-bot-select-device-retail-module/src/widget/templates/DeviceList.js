import React, {Component} from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import messages from 'digital-bot-select-device-retail-module/src/widget/BotSelectDevice.i18n';

class DeviceList extends Component {
    constructor(viewProps) {
        super(viewProps);

        this.devices = this.props.devices;
        this.numOfInstallments = viewProps.numOfInstallments;
        this.addDeviceButton = viewProps.addDeviceButton;
        this.moreRecordsExist = viewProps.moreRecordsExist;
        this.isLoading = viewProps.isLoading;
        this.maxReturnedRecords = this.props.maxReturnedRecords;
        this.upadteDevicesFilter = viewProps.upadteDevicesFilter;
        this.clearFilterAndSearch = viewProps.clearFilterAndSearch;
        this.state = {
            isLoading: this.isLoading
        };

        this.showFilter = viewProps.showFilter;
    }

    onAddDeviceClickEvent(device) {
        const selectedDevice = device;
        const installmentsData = {
            numOfInstallments: this.numOfInstallments
        };
        Object.assign(selectedDevice, installmentsData);
        this.addDeviceButton(selectedDevice);
    }

    clearFilterAndSearchText() {
        this.clearFilterAndSearch();
    }

    deviceListRender() {
        if (!this.props.devices) {
            return (
                <div />
            );
        }

        if (this.props.devices && this.props.devices.length === 0) {
            return (
                <div>
                    <div className="row search-empty p-t-15">
                        <div className="col-sm-12">
                            <img src="resources/pic/illustartion.svg" alt="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <h2 className="big-title">Oops...</h2>
                            {messages.noDeviceFoundLabel1.defaultMessage}
                            <p>{messages.noDeviceFoundLabel2.defaultMessage}</p>
                            <a onClick={() => this.clearFilterAndSearchText()} className="btn btn-primary">
                                {messages.resetFilterLabel.defaultMessage}</a>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {
                    this.props.moreRecordsExist && this.showFilter &&
                    <div className="alert alert-info m-y-10">
                        <strong className="p-b3">
                            <FormattedMessage {...messages.moreRecordsExist} values={{maxReturnedRecords: this.props.maxReturnedRecords}} />
                        </strong>
                    </div>
                }
                {
                    this.props.devices.map((device) => {
                        // If image url is not present, provide default image URL
                        if (!device.imageurl) {
                            device.imageurl = 'https://image.flaticon.com/icons/svg/15/15874.svg';
                        }

                        return (
                            <div className="row plan" key={device.deviceID}>
                                <div className="col-sm-1 plan-image">
                                    <img src={device.imageurl} alt="" />
                                </div>
                                <div className="col-sm-4 col-md-3">
                                    <h4>{device.name}</h4>
                                </div>
                                <div className="col-sm-5">
                                    <p>
                                        {device.description}
                                    </p>
                                </div>
                                <div className="col-sm-2 col-md-3 plan-btn">
                                    <a
                                        id={device.deviceID}
                                        className="btn btn-secondary"
                                        onClick={() => this.onAddDeviceClickEvent(device)}
                                    >
                                        {messages.add.defaultMessage}
                                    </a>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
    render () {
        return (
            <div>
                {this.deviceListRender()}
            </div>
        );
    }
}

export default DeviceList;
