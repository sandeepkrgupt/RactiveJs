import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {DatePicker as MaterialDatePicker} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class DatePicker extends Component {

    populateFields(props) {
        const datePickerTheme = {
            datePicker: {
                selectColor: '#39f',
                color: '#39f'
            },
            flatButton: {
                primaryTextColor: '#39f',
                fontSize: '13px'
            }
        };

        const css = `${props.datePickerWrapperClass} ${props.isToggleViolation ? 'error' : ''}`;
        const DateTimeFormat = global.Intl.DateTimeFormat;
        const muiTheme = getMuiTheme(datePickerTheme);
        const container = props.isDialog ? 'dialog' : 'inline';
        const mode = props.isLandscape ? 'landscape' : 'portrait';
        const min = props.minDate || null;
        const max = props.maxDate || null;
        const format = props.formatDate ||
            new DateTimeFormat(props.locale, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format;

        return {
            css, DateTimeFormat, muiTheme, container, mode, min, max, format
        };
    }

    render() {
        const {props} = this;
        const {hintText, handleClick, value, idValue, isDisabled, autoOk, hideCalendarDate, locale, okLabel,
            cancelLabel, openToYearSelection, shouldDisableDate, datePickerClass, dialogContainerStyle, style,
            textFieldStyle} = props;

        const dpData = this.populateFields(props);
        const {css, DateTimeFormat, muiTheme, container, mode, min, max, format} = dpData;
        const dpClass = `date-picker ${datePickerClass || ''} ${isDisabled ? 'disabled' : ''}`;


        return (
            <div
                key={idValue}
                id={idValue}
                className={css}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <MaterialDatePicker
                        container={container}
                        mode={mode}
                        autoOk={autoOk}
                        hideCalendarDate={hideCalendarDate}
                        DateTimeFormat={DateTimeFormat}
                        locale={locale}
                        formatDate={format}
                        disabled={isDisabled}
                        onChange={(e, date) => handleClick(date)}
                        className={dpClass}
                        {...(value && {defaultDate: value})}
                        {...(hintText && {hintText})}
                        {...(min && {min})}
                        {...(max && {max})}
                        {...(okLabel && {okLabel})}
                        {...(cancelLabel && {cancelLabel})}
                        {...(openToYearSelection && {openToYearSelection})}
                        {...(shouldDisableDate && {shouldDisableDate})}
                        {...(dialogContainerStyle && {dialogContainerStyle})}
                        {...(style && {style})}
                        {...(textFieldStyle && {textFieldStyle})}
                    />
                </MuiThemeProvider>
                <i className="far fa-calendar-alt" />
            </div>
        );
    }
}

export default DatePicker;
