import React, {Component} from 'react';

class NavigationButton extends Component {

    render() {
        const {props} = this;
        const {label, action} = props;
        return (
            <button onClick={action}>
                <span>{label}</span>
                <i className={'material-icons icon-right'}>keyboard_arrow_right</i>
            </button>
        );
    }
}

export default NavigationButton;
