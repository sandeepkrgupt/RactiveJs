import React, {Component} from 'react';

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: props.checked
        };
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    toggleCheckbox(e) {
        this.setState({
            isChecked: e.target.checked
        });
        this.props.checkBoxValueHandler(e.target.checked);
    }
    render () {
        const props = this.props;
        return (
            <div className="CustomCheckbox">
                <input
                    type="checkbox"
                    id={props.id}
                    checked={this.state.isChecked}
                    onChange={this.toggleCheckbox}
                    value={props.label}
                />
                <label
                    htmlFor={props.id}
                >{props.label}</label>
            </div>
        );
    }
}

export default CheckBox;
