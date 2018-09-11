import React, {Component} from 'react';
import messages from 'digital-bot-select-device-retail-module/src/widget/BotSelectDevice.i18n';
import DeviceFilterOption from 'digital-bot-select-device-retail-module/src/widget/templates/BotSelectDevice.Filter.Option';

export default class DeviceFilter extends Component {
    constructor(viewProps) {
        super(viewProps);
        this.defaultPresentedItemsCount = this.props.defaultPresentedItemsCount || 4;
        this.upadteDevicesFilter = viewProps.upadteDevicesFilter;
        this.filterDefaultOptions = viewProps.filterDefaultOptions;
        this.isLoading = this.props.isLoading;
        this.filterOptions = this.props.filterOptions;
    }

    resetFilters() {
        this.upadteDevicesFilter([]);
    }

    updateFilterAndReloadDevices(filterOption, optionValue) {
        const optionValueCode = optionValue.filterOptionID;
        const filterCategoryID = filterOption.filterCategoryID;
        const filterOptions = this.filterOptions;
        const filterOptionsLength = filterOptions.length;

        optionValue.checked = !optionValue.checked;
        let optionExist = false;
        if (filterOptionsLength) {
            for (let i = filterOptionsLength - 1; i > -1; i -= 1) {
                if (filterOptions[i].filterCategoryID === filterCategoryID) {
                    this.updateFilteredCategory(filterOptions, optionValueCode, i);
                    optionExist = true;
                }
            }
        }

        if (!optionExist) {
            filterOptions.push({
                filterCategoryID,
                filterOptionValues: [{
                    filterOptionID: optionValueCode
                }]
            });
        }

        this.upadteDevicesFilter(filterOptions);
    }

    updateFilteredCategory(filterOptions, optionValueCode, filterCategoryIndex) {
        const options = filterOptions[filterCategoryIndex].filterOptionValues;
        let vauleExist = false;
        if (options && options.length) {
            for (let i = options.length - 1; i > -1; i -= 1) {
                vauleExist = this.removeFilterOptionIfExist({filterOptions, options, i, filterCategoryIndex, optionValueCode, vauleExist});
            }
        }
        if (!vauleExist) {
            filterOptions[filterCategoryIndex].filterOptionValues.push({
                filterOptionID: optionValueCode
            });
        }
    }

    removeFilterOptionIfExist(args) {
        if (args.options[args.i].filterOptionID === args.optionValueCode) {
            args.options.splice(args.i, 1);
            if (!args.options.length) {
                args.filterOptions.splice(args.filterCategoryIndex, 1);
            }
            args.vauleExist = true;
        }

        return args.vauleExist;
    }

    render() {
        if (this.props.filterDefaultOptions) {
            return (
                <div className="col-sm-2 right-linet devicesFilterContainer">
                    <a onClick={() => this.resetFilters()}>{messages.resetFilterLabel.defaultMessage}</a>
                    <div className="filter">
                        {
                            this.props.filterDefaultOptions.map((filterOption) => {
                                return (
                                    <DeviceFilterOption
                                        key={'filter-option-'.concat(filterOption.filterCategoryID)}
                                        updateFilterAndReloadDevices={(f, v) => this.updateFilterAndReloadDevices(f, v)}
                                        filterOption={filterOption}
                                        defaultPresentedItemsCount={this.defaultPresentedItemsCount}
                                        {...this.props}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            );
        }
        return <span />;
    }
}
