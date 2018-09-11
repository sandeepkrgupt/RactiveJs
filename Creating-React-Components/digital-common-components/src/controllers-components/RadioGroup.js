import React from 'react';

class RadioGroup extends React.Component {
    getRadioGroupControl(props = this.props) {
        const {options = [], onClickHandler, onChangeHandler, value} = props;
        const ctrl =
        options.map(item =>
            (<div className="nice-radio nice-radio-big">
                <input
                    type="radio"
                    name={props.input.name}
                    defaultChecked={item.value === value}
                    value={item.value}
                    onClick={onClickHandler}
                    onChange={onChangeHandler}
                    id={item.idValue}
                />
                <label
                    htmlFor={item.idValue}
                    className="m-b-0"
                >
                    {item.text}
                </label>
            </div>)
        );

        return ctrl;
    }
    render() {
        const {
            errorMessage,
            isValid,
            idValue,
            radioGroupHeading,
            radioGroupHeadingClass,
            wrapperClass
        } = this.props;

        return (
            <div id={idValue}>
                <div className={radioGroupHeadingClass}>
                    {radioGroupHeading}
                </div>
                <div className={wrapperClass}>
                    {this.getRadioGroupControl()}
                </div>
                {isValid === false && <p className="error-message">{errorMessage}</p>}
            </div>);
    }
}

export default RadioGroup;
