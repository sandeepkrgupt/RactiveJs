import React, {Component} from 'react';

class SelectionList extends Component {
    render() {
        const {props} = this;
        const {handleClick, items = [], idValue, value, isDisabled} = props;
        let {selectionListClass} = props;
        selectionListClass = `btn-group ${selectionListClass}`;

        const btnSecondaryCSS = isDisabled ? 'btn btn-secondary' : 'btn btn-secondary-orange';
        const btnPrimaryCSS = isDisabled ? 'btn btn-primary' : 'btn btn-primary-orange';

        return (
            <div className={selectionListClass} id={idValue}>
                { items && items.map((item) => {
                    return (
                        <button
                            key={item.key}
                            className={item.code === value ? btnPrimaryCSS : btnSecondaryCSS}
                            id={item.id}
                            onClick={(event) => {
                                event.preventDefault();
                                handleClick(item.code);
                            }}
                            disabled={isDisabled}
                        >
                            {item.decode}
                        </button>
                    );
                }, this)}
            </div>
        );
    }
}

export default SelectionList;
