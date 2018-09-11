import React from 'react';
import BasicInput from './BasicInput';
import Label from '../generic/BaseLabel';
import FieldWrapper from '../controllers-components/FieldWrapper';

export default class TextInput extends BasicInput {

    getLengthMarkup() {
        const {showLength} = this.props;
        if (!showLength) {
            return null;
        }
        return (
            <span className="st-form__chars">
                {this.props.currentLength}/{this.props.maxLength}
            </span>
        );
    }

    getInputElement() {
        return this.refs.input;
    }

    handleClearClicked() {
        const mockEvent = {target: {value: ''}};
        this.handleChange(mockEvent);
    }

    getClearButton() {
        const {showClearButton} = this.props;
        if (!showClearButton) {
            return null;
        }
        return (
            <button className="st-form__clear" onClick={() => this.handleClearClicked()}>
                <span />
            </button>
        );
    }

    render() {
        const input = super.render();
        const clearButton = this.getClearButton();
        const {error, label, small, mandatory, showLength, wide} = this.props;
        const labelClass = showLength ? 'chars' : null;
        return (
            <Label title={label} hasError={!!error} mandatory={mandatory} className={labelClass}>
                <FieldWrapper small={small} error={error} wide={wide}>
                    {input}
                    {clearButton}
                    {this.getLengthMarkup()}
                </FieldWrapper>
            </Label>
        );
    }
}
