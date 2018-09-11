import React, {Component} from 'react';

class SortComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaysortComponent: props.displaysortComponent
        };
        this.ToggleComponent = this.ToggleComponent.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            displaysortComponent: nextProps.displaysortComponent
        });
    }

    ToggleComponent() {
        this.setState({
            displaysortComponent: !this.state.displaysortComponent
        });
    }

    render () {
        const props = this.props;
        const displaysortComponent = this.state.displaysortComponent;
        const SortList = props.SortList;
        const SortListComponent = [];
        let i = 0;
        if (props.SortComponentClass === 'MobileView') {
            for (i; i < SortList.length; i += 1) {
                SortListComponent.push(
                    <option
                        key={i}
                        id={i}
                        value={SortList[i].displayName}>{`Sort:  ${SortList[i].displayName}`}
                    </option>
                );
            }
        } else {
            for (i; i < SortList.length; i += 1) {
                if (props.selectedFilter.displayName === SortList[i].displayName) {
                    SortListComponent.push(
                        // disable no-noninteractive-element-interactions next-line
                        <li>
                            <div
                                className="listItems hide-for-mobile"
                                key={i}
                                onClick={props.selectSort}>
                                <div className="text-right">
                                    <span
                                        className="float-left d-block"
                                        id={i}>
                                        {SortList[i].displayName}
                                    </span>
                                    <i className="material-icons check">check</i>
                                </div>
                            </div>
                        </li>
                );
                } else {
                    SortListComponent.push(
                        <li>
                            <div
                                className="listItems hide-for-mobile"
                                key={i}
                                id={i}
                                onClick={props.selectSort}>
                                <div
                                    className="d-block"
                                    id={i}>
                                    {SortList[i].displayName}
                                </div>
                            </div>
                        </li>
                    );
                }
            }
        }
        return (
            <div className={`SortComponent ${props.SortComponentClass}`}>
                {
                    props.SortComponentClass === 'MobileView'
                    ?
                        <select onChange={this.ToggleComponent}>
                            {SortListComponent}
                        </select>
                    :
                        <div className="Short">
                            <div
                                className="button"
                                onClick={this.ToggleComponent}
                                tabIndex="-1"
                                role="button">
                                <span className="sortLabel my-2">
                                    {`Sort: ${props.sortSelectedLabel}`}
                                </span>
                                <i className="material-icons keyboard_arrow_down">keyboard_arrow_down</i>
                            </div>
                            {this.state.displaysortComponent === true ?
                                <div className={`popover popover-bottom ${displaysortComponent}`}>
                                    <div className="popover-content">
                                        <ul className="SortList">
                                            {SortListComponent}
                                        </ul>
                                    </div>
                                </div>
                    :
                        ''
                    }
                        </div>
                }
            </div>
        );
    }
}

export default SortComponent;
