import React, {Component} from 'react';
import Select from 'react-select';

class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: props.value
        };
    }

    componentDidMount() {
        this.updateReduxForm();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({selectedOption: nextProps.value}, () => this.updateReduxForm());
        }
    }

    updateReduxForm() {
        if (this.props.input && this.props.input.onChange && this.props.input.value !== this.state.selectedOption) {
            this.props.input.onChange(this.state.selectedOption);
        }
    }

    handleChange(selectedOption) {
        if (this.state.selectedOption !== selectedOption.value) {
            this.setState({selectedOption: selectedOption.value}, () => this.updateReduxForm());
            const event = {
                target: {
                    value: selectedOption.value,
                    id: this.props.idValue
                }
            };
            if (this.props.handleClick) {
                this.props.handleClick(event);
            }
        }
    }

    render() {
        const {props} = this;
        const {dropdownClass, dropdownWrapperClass, meta = {},
            options = [], value, idValue, isDisabled} = props;
        const searchable = props.searchable || false;
        const {touched, error, invalid} = meta;
        const hasError = touched && invalid;
        const wrapperClass =
            `${dropdownWrapperClass} ${hasError ? 'has-error' : ''}`;
        return (
            <div className={wrapperClass}>
                <Select
                    className={dropdownClass}
                    id={idValue}
                    value={this.state.selectedOption}
                    onChange={e => this.handleChange(e)}
                    disabled={isDisabled}
                    clearable={false}
                    searchable={searchable}
                    placeholder="Seleccionar..."
                    options={options.map((item) => {
                        return {
                            value: item.code,
                            label: item.decode,
                            selected: item.code === value,
                            key: item.code,
                            id: item.code
                        };
                    })
                    }
                    />
                {hasError && <small className="text-danger has-error__alert">{error}</small>}
            </div>
        );
    }
}

export default Dropdown;
