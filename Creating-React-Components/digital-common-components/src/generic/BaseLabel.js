import React, {Component} from 'react';
import classnames from 'classnames';

export default class BaseLabel extends Component {
    getTitle(title) {
        if (!title) {
            return null;
        }
        return <span className="st-form__label">{title}</span>;
    }
    getIcon(hasIcon) {
        if (!hasIcon) {
            return null;
        }

        return <span className="st-form__icon" />;
    }
    getLabelClasses(props) {
        const {className, noDefaultClasses, mandatory, hasError, small} = props;

        const classesMap = {
            'st-form__line': !noDefaultClasses,
            small,
            mandatory,
            error: hasError
        };
        if (className) {
            classesMap[className] = true;
        }
        const labelClasses = classnames(classesMap);
        return labelClasses;
    }
    render() {
        const {htmlFor, children, title, hasIcon} = this.props;
        const labelClasses = this.getLabelClasses(this.props);
        return (
            <div htmlFor={htmlFor} className={labelClasses}>
                {this.getTitle(title)}
                {children}
                {this.getIcon(hasIcon)}
            </div>
        );
    }
}
