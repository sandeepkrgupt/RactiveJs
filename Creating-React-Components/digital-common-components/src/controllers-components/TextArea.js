import React from 'react';
import {omit} from 'lodash';
import Label from './Label';

const TextArea = (field) => {
    const {meta: {touched, error, invalid}} = field;
    const showError = field.showError !== false;
    const hasError = showError && touched && invalid;
    const hasIcon = !!field.iconClass;
    const textareaWrapperClass = `${field.textareaWrapperClass} ${hasError ? 'has-error' : ''}`;
    const inputClassName = `form-control ${hasIcon ? `form-control-icon ${field.iconClass}` : ''}`;
    const elementId = `${field.meta.form}_${field.input.name}`;
    const fieldAttributes = omit(field, 'input', 'meta', 'showError', 'label');

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

    const errorMessage = <small className="text-danger has-error__alert">{touched ? error : ''}</small>;

    return (
        <div className="form-group">
            {label}
            <div className={textareaWrapperClass}>
                <textarea
                    id={elementId}
                    className={inputClassName}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...field.input}
                    {...fieldAttributes}
                    {...readOnly}
                    maxLength={field.maxLength}
                    autoComplete={field.autoComplete}
                    value={field.input.value || ''}
                    rows={field.rows || '2'}
                />
                {hasError
                        ? errorMessage
                        : ''}
            </div>
        </div>
    );
};

export default TextArea;
