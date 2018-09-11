import React, {Component} from 'react';
import CheckBox from '../controllers-components/CheckBox';
import Button from '../controllers-components/Button';

class FilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            displayPopover: 'hidden',
            componentID: null,
            arrayvar: [],
            buttonActive: 'btn-small-active-maxis btn',
            buttonDefault: 'btn-maxis-small btn',
            display: 'hidden',
            productClass: props.ProductClass,
            width: {
                minWidth: 0
            }
        };
        this.clickPopover = this.clickPopover.bind(this);
        this.closePopover = this.closePopover.bind(this);
        this.SelectFilter = this.SelectFilter.bind(this);
        this.closeSelected = this.closeSelected.bind(this);
        this.clearFilterMobile = this.clearFilterMobile.bind(this);
    }

    SelectFilter(e) {
        let arrayvar = [];
        arrayvar = this.state.arrayvar;
        const textContent = e.currentTarget.textContent;
        if (arrayvar.indexOf(textContent) === -1) {
            arrayvar.push(textContent);
            this.setState({
                componentID: e.currentTarget.id,
                arrayvar: [...arrayvar]
            });
        } else {
            e.preventDefault();
        }
        if (arrayvar.length === '') {
            this.setState({
                display: 'hidden'
            });
        } else {
            this.setState({
                display: 'visible'
            });
        }
    }
    closeSelected(event) {
        let arrayvar = [];
        arrayvar = this.state.arrayvar;
        const textContent = event.currentTarget.parentElement.id;
        const removeItems = arrayvar.indexOf(textContent);
        if (removeItems !== -1) {
            arrayvar.splice(removeItems, 1);
            this.setState({
                arrayvar: [...arrayvar]
            });
        }
        if (this.state.arrayvar.length === 0) {
            this.setState({
                display: 'hidden'
            });
        }
    }

    closePopover() {
        this.setState({
            displayPopover: 'hidden'
        });
    }

    clickPopover() {
        const overLayWidth = document.querySelector(`'.' + ${this.state.productClass}`).offsetWidth - 3;
        this.setState({
            count: this.state.count + 1
        });
        if (this.state.count % 2 !== 0) {
            this.setState({
                displayPopover: 'visible',
                width: {
                    minWidth: overLayWidth
                }
            });
        } else {
            this.setState({
                displayPopover: 'hidden'
            });
        }
    }
    clearFilterMobile() {
        this.setState({
            arrayvar: [],
            display: 'hidden',
            componentID: ''
        });
    }
    render () {
        const props = this.props;
        const buttonActive = this.state.buttonActive;
        const buttonDefault = this.state.buttonDefault;
        return (
            <div className="filterComponent">
                <div className="row">
                    <div className="col-6 hidden-md-down">
                        <div className="filterPlaceholder">{props.filterPlaceholder}</div>
                    </div>
                    <div className="col-6 hidden-md-down">
                        <a tabIndex="0" className="clear-all" onClick={props.clearFilter} role="button">
                            {props.clearFilterText}
                        </a>
                    </div>
                    <div className="col-12 hidden-md-down">
                        {props.filterCatagory.map((filterItems) => {
                            return (
                                <ul className="customFilter" key={filterItems.id}>
                                    <div className="customFilterPadding">{filterItems.text}</div>
                                    {filterItems.Catagory.map((items) => {
                                        return (
                                            <li key={items.id}>
                                                <CheckBox
                                                    componentClass="isValid"
                                                    label={items.FilterLabel}
                                                    checked={items.checkedValue} />
                                            </li>
                                        );
                                    })}
                                </ul>
                            );
                        })}
                    </div>
                    <div className="col-12 hidden-lg-up">
                        <div className="row FilterComponentMobile">
                            <div className="col-12 FilterTabPadding">
                                <div className="FilterContent popover__wrapper">
                                    <div
                                        className="clickPopover"
                                        onClick={this.clickPopover}
                                        role="button"
                                        tabIndex="-1"
                                        >
                                        <i className="material-icons add">add</i>
                                        <span className="FilterLabel">Add filter</span>
                                    </div>
                                    <div className={this.state.displayPopover}>
                                        <div className="popover popover-bottom" style={this.state.width}>
                                            <div className="popover-content" style={this.state.width}>
                                                <i
                                                    className="material-icons float-right close closeIcon"
                                                    onClick={this.closePopover}
                                                    tabIndex="-1"
                                                    role="button">close</i>
                                                {props.filterCatagory.map((filterItems) => {
                                                    return (
                                                        <ul className="customFilter" key={filterItems.id}>
                                                            <div>
                                                                <div className="text-left mobileFilterText">
                                                                    {filterItems.text}
                                                                </div>
                                                            </div>
                                                            {filterItems.Catagory.map((items) => {
                                                                return (
                                                                    <li key={items.id}>
                                                                        <Button
                                                                            Componentid={items.id}
                                                                            buttonClass={
                                                                                this.state.componentID === items.id
                                                                                ?
                                                                                buttonActive
                                                                                :
                                                                                buttonDefault
                                                                            }
                                                                            clickEvent={this.SelectFilter}
                                                                            buttonLabel={items.FilterLabel} />
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`col-12 addedFilter ${this.state.display}`}
                                    style={this.state.width}>
                                    <div className="row">
                                        <div className="col-6 FilterText">
                                            {props.FilterText}
                                        </div>
                                        <div
                                            className="col-6 text-right clearAll"
                                            onClick={this.clearFilterMobile}
                                            tabIndex="-1"
                                            role="button"
                                            >
                                            {props.clearFilterText}
                                        </div>
                                        <div className="col-12 v-p-small">
                                            {this.state.arrayvar.map((item) => {
                                                return (
                                                    <div
                                                        className="selectedCatagory"
                                                        key={item}
                                                        id={item}>
                                                        <span>{item}</span>
                                                        <i
                                                            id="item"
                                                            className="material-icons close"
                                                            onClick={this.closeSelected}
                                                            tabIndex="-1"
                                                            role="button"
                                                            >
                                                            close
                                                        </i>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterComponent;
