import React, {Component} from 'react';

export default class SearchComponent extends Component {
    constructor(viewProps) {
        super(viewProps);
        this.onSubmit = viewProps.onSubmit;
        this.onChange = viewProps.onChange;
    }

    onBeforeRender() {
        if (this.textField && this.props.searchText === '') {
            this.textField.value = '';
        }
    }

    getIcon() {
        const fill = (this.props.buttonDisabled) ? '#d0d1d6' : '#E9751F';
        const ellipseClass = (this.props.buttonDisabled) ? 'searchButtonDisabled' : 'searchButtonEnabled';
        return (
            <g>
                <ellipse
                    cx="16.46875"
                    cy="17"
                    fill={fill}
                    rx="16.46875"
                    ry="17"
                    className={ellipseClass} />
                <path
                    d={'M25.776864,25.2168311 L21.0218229,20.2661588 C22.2444275,'
                        + '18.8112558 22.9142998,16.9806902 22.9142998,15.0749921C22.9142998,'
                        + '10.6225117 19.2955866,7 14.8477749,7 C10.3999632,7 6.78125,'
                        + '10.6225117 6.78125,15.0749921 C6.78125,19.5274725 10.3999632,'
                        + '23.1499842 14.8477749,23.1499842 C16.5175456,23.1499842 18.1087553,'
                        + '22.6458238 19.4691922,21.6887617 L24.2603573,26.6770003 C24.4606175,'
                        + '26.8851947 24.7299693,27 25.0186106,27 C25.2918203,27 25.5510013,'
                        + '26.8957273 25.7477543,26.7061405 C26.1658108,26.3034442 26.1791381,'
                        + '25.6356774 25.776864,25.2168311 Z M14.8477749,9.10651968 C18.1354099,'
                        + '9.10651968 20.809989,11.7839062 20.809989,15.0749921 C20.809989,'
                        + '18.366078 18.1354099,21.0434645 14.8477749,21.0434645 C11.5601399,'
                        + '21.0434645 8.88556084,18.366078 8.88556084,15.0749921 C8.88556084,'
                        + '11.7839062 11.5601399,9.10651968 14.8477749, 9.10651968 Z'}
                    fill="#FFFFFF"
                    fillRule="nonzero"
                    id="Shape" />
            </g>
        );
    }

    getSVG() {
        return (
            <svg viewBox="0 0 34 34">
                <g fill="none" fillRule="evenodd" stroke="none">
                    <g transform="translate(-730.000000, -225.000000)">
                        <g transform="translate(223.000000, 220.000000)">
                            <g transform="translate(507.125000, 5.000000)">
                                { this.getIcon() }
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }

    render() {
        this.onBeforeRender();
        return (
            <div className="search-field">
                <input
                    type="search"
                    name="search-customer"
                    placeholder={this.props.placeHolder}
                    onChange={() => { if (this.onChange) { this.onChange(this.textField.value); } }}
                    ref={(el) => { this.textField = el; }}
                    disabled={this.props.disabled} />
                <button
                    type="submit"
                    onClick={() => { this.onSubmit(this.textField.value); }}
                    disabled={this.props.buttonDisabled || this.props.disabled} >
                    { this.getSVG() }
                </button>
            </div>
        );
    }
}
