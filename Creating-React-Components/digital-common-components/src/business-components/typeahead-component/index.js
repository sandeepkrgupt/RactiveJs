import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

class Typeahead extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
            locationModalContinueEnabled: false
        };

        this.shouldRenderSuggestions = function(value) {
            return value.trim().length >= 3;
        };

        this.renderSuggestion = function(suggestion) {
            return (
                <span>{suggestion.value}</span>
            );
        };

        this.lastRequestId = null;
        this.onChange = this.onChange.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    }
    onSuggestionSelected(event, {suggestion}) {
        this.props.isSuggestionSelectedCallback({isSuggestionSelected: true, selectedValue: suggestion});
        this.setState({selectedSugestionKey: suggestion.key});
    }

    onChange(event, obj) {
        this.props.isSuggestionSelectedCallback({isSuggestionSelected: false, selectedValue: null});
        this.setState({
            value: obj.newValue
        });
    }

    onSuggestionsFetchRequested({value}) {
        this.loadSuggestions(value);
    }

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }

    getSuggestionValue(suggestion) {
        return suggestion.value;
    }

    loadSuggestions(value) {
        if (this.props.suggestionsList) {
            // get local copy of suggestion list that we fetch from server
            let tempSuggestionsList = this.props.suggestionsList;
            let userEntriesArray = value.split(' ');
            userEntriesArray = userEntriesArray.filter(
                item => item.value !== ''
            );

            userEntriesArray = userEntriesArray.map(
                item => item.toLowerCase()
            );

            userEntriesArray.forEach(
                (userEntry) => {
                    tempSuggestionsList = tempSuggestionsList.filter(
                        item => item.value.toLowerCase().indexOf(userEntry) !== -1
                    );
                }
            );

            tempSuggestionsList = tempSuggestionsList.slice(0, 10);

            this.setState({suggestions: tempSuggestionsList});
        }
    }

    render() {
        const {value, suggestions} = this.state;
        const focusInputOnSuggestionClick = false;
        const inputProps = {
            placeholder: this.props.placeholder ? this.props.placeholder : '',
            value: this.props.selectedValue ? this.props.selectedValue.value : value,
            onChange: this.onChange
        };
        const theme = {
            container: 'autocomplete-component',
            input: 'form-control',
            suggestionsContainer: 'autocomplete-list-container',
            suggestionsList: 'autocomplete-list',
            suggestion: 'autocomplete-suggestion',
            suggestionHighlighted: 'autocomplete-suggestion-hovered'
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                shouldRenderSuggestions={this.shouldRenderSuggestions}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                focusInputOnSuggestionClick={focusInputOnSuggestionClick}
                theme={theme}
            />
        );
    }
}

Typeahead.propTypes = {
    isSuggestionSelectedCallback: PropTypes.func.isRequired,
    suggestionsList: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
};


export default Typeahead;
