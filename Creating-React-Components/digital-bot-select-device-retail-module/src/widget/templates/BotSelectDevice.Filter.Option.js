import React, {Component} from 'react';
import messages from 'digital-bot-select-device-retail-module/src/widget/BotSelectDevice.i18n';

export default class DeviceFilterOption extends Component {
    constructor(viewProps) {
        super(viewProps);
        this.state = {
            showAll: this.props.filterOption.showAll
        };
        this.defaultPresentedItemsCount = this.props.defaultPresentedItemsCount;
        this.filterOption = this.props.filterOption;
        this.updateFilterAndReloadDevices = this.props.updateFilterAndReloadDevices;
    }

    seeAll() {
        const newVal = !this.state.showAll;
        this.filterOption.showAll = newVal;
        this.setState({
            showAll: newVal
        });
    }

    render() {
        return (
            <div className="filter-list" key={this.filterOption.filterCategoryID}>
                <h2>{this.filterOption.filterCategoryName}</h2>
                {
                    this.filterOption.filterOptionValues.map((optionValue, i) => {
                        const uuid = this.filterOption.filterCategoryID.concat(optionValue.filterOptionID);
                        if (this.state.showAll || i <= this.defaultPresentedItemsCount - 1) {
                            return (
                                <div
                                    className="nice-checkbox"
                                    key={optionValue.filterOptionValue}>
                                    <input
                                        id={uuid}
                                        type="checkbox"
                                        value={optionValue.filterOptionID}
                                        onChange={() => this.updateFilterAndReloadDevices(this.filterOption, optionValue)}
                                        checked={optionValue.checked} />
                                    <label htmlFor={uuid}>
                                        {optionValue.filterOptionValue}
                                    </label>
                                </div>
                            );
                        }

                        return '';
                    })
                }

                {
                    this.filterOption.filterOptionValues.length > this.defaultPresentedItemsCount &&
                    <p className="p-t-15">
                        <a onClick={() => this.seeAll()}>{(this.state.showAll) ? messages.seeLess.defaultMessage : messages.seeAll.defaultMessage}</a>
                    </p>
                }
            </div>
        );
    }
}
