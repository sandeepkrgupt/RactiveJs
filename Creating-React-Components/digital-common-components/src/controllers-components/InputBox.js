import React from 'react';
import {omit} from 'lodash';
import Label from './Label';

const populateField = (field) => {
    let showError = false;
    let hasError = false;
    let hasIcon = false;
    let errorMessage;
    if (field.meta) {
        const {touched, error, invalid} = field.meta;
        showError = field.showError !== false;
        hasError = showError && touched && invalid;
        hasIcon = !!field.iconClass;
        errorMessage = <small className="text-danger has-error__alert">{touched ? error : ''}</small>;
    }

    return {
        hasError, hasIcon, errorMessage
    };
};

const InputBox = (field) => {
    const fieldData = populateField(field);
    const {hasError, hasIcon, errorMessage} = fieldData;
    const labelClass = field.unlabeled ? '' : 'form-group';
    const wrapperClass = field.wrapperClass != null ? field.wrapperClass : labelClass;
    const inputWrapperClass =
        `${field.inputWrapperClass ? field.inputWrapperClass : ''} ${hasError ? 'has-error' : ''}`;
    const inputClassName =
        `${field.className ? field.className : ''} form-control ${hasIcon ?
            `form-control-icon ${field.iconClass}` : ''}`;
    const elementId = field.id || `${field.meta.form}_${field.input.name}`;
    const fieldAttributes = omit(field, 'input', 'meta', 'showError', 'label', 'unlabeled');
    const value = field.input ? field.input.value : null;
    const defaultValue = field.defaultValue;
    const autoComplete = field.autoComplete ? field.autoComplete : 'off';

    let label = (<Label
        htmlFor={elementId}
        mandatory={field.mandatory}
        labelClass={field.labelClass}
        labelData={field.label} />);
    if (field.unlabeled) {
        label = null;
    }

    let readOnly = null;
    if (field.readonly) {
        readOnly = {readOnly: 'readonly'};
    }

    return (
        <div className={`${wrapperClass}`}>
            {label}
            <div className={inputWrapperClass}>
                <input
                    id={elementId}
                    className={inputClassName}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...field.input}
                    {...fieldAttributes}
                    {...readOnly}
                    maxLength={field.maxLength}
                    autoComplete={autoComplete}
                    {...(!(value == null) && {value})}
                    {...(defaultValue && {defaultValue})}
                />
                {hasError
                        ? errorMessage
                        : ''}
            </div>
        </div>
    );
};

export default InputBox;
