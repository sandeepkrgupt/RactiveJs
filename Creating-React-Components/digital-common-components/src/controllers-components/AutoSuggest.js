import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

class AutoSuggest extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
            isShowNoMatchNotification: false,
            isInitialValueHandeled: false
        };

        this.suggestionsCount = 10;
        this.suggestionsCountWithoutPriority = null;
        this.rootOrderedList = [];
        this.maxAccuracy = 0;
        this.userEntriesArray = [];
        this.lastRequestId = null;
        this.textHighLightStyle = {
            color: 'black',
            fontWeight: 'bold'
        };

        this.onChange = this.onChange.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.prepereUserEntries = this.prepereUserEntries.bind(this);
        this.selectMatchSuggestionAndMapsByAccuracy = this.selectMatchSuggestionAndMapsByAccuracy.bind(this);
    }

    onSuggestionSelected(event, {suggestion}) {
        this.props.isSuggestionSelectedCallback({isSuggestionSelected: true, selectedValue: suggestion});
        this.setState({selectedSugestionKey: suggestion.key});
    }

    onChange(event, obj) {
        this.props.isSuggestionSelectedCallback({isSuggestionSelected: false, selectedValue: null});
        let isShowNoMatchNotification = this.state.isShowNoMatchNotification;
        if (obj.newValue.trim().length < this.props.inputCountForRender) {
            isShowNoMatchNotification = false;
        }

        this.setState({value: obj.newValue, isShowNoMatchNotification});
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
        const stringLength = 45;
        const areaCodeString = suggestion.areaCode.toString();
        const stateString = suggestion.state.toString();
        const cityString = suggestion.city.toString();
        const populationString = suggestion.population.toString();
        let suggestionString = `${cityString},${stateString},${populationString}`;
        if (suggestionString.length > 42) {
            suggestionString = `${suggestionString.substring(0, 42)}...`;
        } else if (suggestionString.length <= 42) {
            suggestionString += '   '.repeat((stringLength - suggestionString.length));
        }

        return `${suggestionString}   ${areaCodeString}`;
    }

    clearSelectedItem() {
        this.setState({
            value: ''
        });
    }

    loadSuggestions(userEntry) {
        if (this.props.suggestionsList) {
            const userEntriesArray = this.prepereUserEntries(userEntry);

            const cloneOfSuggestionList = JSON.parse(JSON.stringify(this.props.suggestionsList));

            const finalSuggestionList = this.selectMatchSuggestionAndMapsByAccuracy(cloneOfSuggestionList, userEntriesArray);

            const isShowNoMatchNotification = (finalSuggestionList.length === 0);

            this.setState({suggestions: finalSuggestionList, isShowNoMatchNotification});
        }
    }

    selectMatchSuggestionAndMapsByAccuracy(suggestionsList, userEntriesArray) {
        let tempSuggestionsList = suggestionsList; /* get local copy of suggestion list that we fetch from server */

        userEntriesArray.forEach(/* search each user entered value */
            (singleUserEntry) => {
                tempSuggestionsList = tempSuggestionsList.filter(
                    (item) => {
                        let isMatch = true;
                        const number = Object.values(item).toString().toLowerCase().indexOf(singleUserEntry, 0);

                        if (number === -1) {
                            isMatch = false;
                        }

                        return isMatch;
                    }
                );
            }
        );

        return tempSuggestionsList;
    }

    shouldRenderSuggestions(value) {
        return value.trim().length >= this.props.inputCountForRender;
    }

    prepereUserEntries(userEntry) {
        let userEntriesArray = userEntry.trim().split(' ');
        userEntriesArray = userEntriesArray.filter(item => item.value !== '' || item.value !== ' '); /* delete empty array elements */
        userEntriesArray = userEntriesArray.map(item => item.toLowerCase()); /* turn user query values to lowerCase */
        this.userEntriesArray = userEntriesArray;

        return userEntriesArray;
    }

    renderSuggestion(suggestion) {
        const areaCodeString = suggestion.areaCode.toString();
        const stateString = suggestion.state.toString();
        const cityString = suggestion.city.toString();
        const populationString = suggestion.population.toString();
        let suggestionString = `${cityString},${stateString},${populationString}`;

        if (suggestionString.length > 42) {
            suggestionString = `${suggestionString.substring(0, 38)}...`;
        }

        this.userEntriesArray.forEach(
            (querystr) => {
                let tempString = querystr;
                tempString = tempString.replace('(', '[(]');
                tempString = tempString.replace(')', '[)]');
                tempString = tempString.replace('.', '[.]');
                tempString = tempString.replace(',', '[,]');
                const reg = new RegExp(tempString, 'gi');
                suggestionString = suggestionString.replace(reg, str => `|@${str}|`);
            }
        );

        let htmlParts = suggestionString.split('|');
        htmlParts = htmlParts.filter(item => item !== '');
        return (
            <span>
                {
                    htmlParts.map((part, index) => {
                        let style = null;
                        let displayValue = part;

                        if (part[0] === '@') {
                            style = this.textHighLightStyle;
                            displayValue = part.replace('@', '');
                        }

                        return (
                            <span key={index.toString()} style={style}>{displayValue}</span>
                        );
                    })
                }
                <div className={'area-code clearfix'}>{areaCodeString}</div>
            </span>
        );
    }

    render() {
        const {value, suggestions} = this.state;
        const {containerClass, inputClass} = this.props;
        const inputProps = {
            type: 'search',
            placeholder: this.props.placeholder ? this.props.placeholder : '',
            value,
            onChange: this.onChange
        };
        const theme = {
            container: `autocomplete-component${containerClass ? ` ${containerClass}` : ''}`,
            input: `form-control${inputClass ? ` ${inputClass}` : ''}`,
            suggestionsContainer: 'autocomplete-list-container',
            suggestionsList: 'autocomplete-list',
            suggestion: 'autocomplete-suggestion',
            suggestionHighlighted: 'autocomplete-suggestion-hovered'
        };

        return (
            <div>
                <h6>{this.props.headerText}</h6>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionSelected={this.onSuggestionSelected}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    // focusInputOnSuggestionClick={focusInputOnSuggestionClick} /* TODO CHECK WHAT THAT DOES */
                    theme={theme}
                />
                {this.state.isShowNoMatchNotification ? this.props.noMatchesMessage : null}
            </div>
        );
    }
}

AutoSuggest.propTypes = {
    isSuggestionSelectedCallback: PropTypes.func.isRequired,
    suggestionsList: PropTypes.PropTypes.arrayOf(PropTypes.object).isRequired,
    placeholder: PropTypes.string.isRequired,
    inputClass: PropTypes.string.isRequired,
    containerClass: PropTypes.string.isRequired,
    inputCountForRender: PropTypes.number.isRequired,
    headerText: PropTypes.string.isRequired,
    selectedValue: PropTypes.PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string
    })
};

AutoSuggest.defaultProps = {
    selectedValue: null,
    inputClass: '',
    containerClass: '',
    inputCountForRender: 1,
    headerText: ''
};

export default AutoSuggest;
