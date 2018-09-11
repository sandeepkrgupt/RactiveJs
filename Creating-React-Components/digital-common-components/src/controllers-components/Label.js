import React from 'react';
import classnames from 'classnames';
import BaseLabel from '../generic/BaseLabel';

export default class Label extends BaseLabel {
    getLabelClasses(props = this.props) {
        const {mandatory, hasError, small, labelClass} = props;
        const className = 'control-label';
        const classesMap = {
            small,
            mandatory,
            error: hasError
        };
        classesMap[className] = true;
        classesMap[labelClass] = true;
        const labelClasses = classnames(classesMap);
        return labelClasses;
    }
    render() {
        const {htmlFor, children, hasIcon, mandatory, labelData} = this.props;
        const labelClasses = this.getLabelClasses(this.props);
        return (
            <label htmlFor={htmlFor} className={labelClasses}>
                {labelData}
                {mandatory && <span className="text-danger">*</span>}
                {children}
                {this.getIcon(hasIcon)}
            </label>
        );
    }
}
