import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InstantSearch, Configure, Index, Highlight } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import Autosuggest from 'react-autosuggest';



export const AlgoliaSearch = () => (
  <InstantSearch
    appId="6B2HFL051A"
    apiKey="46f5454eead67b5f8fbb66e85f13b80e"
    indexName="appointments"
  >
    <AutoComplete />
    <Configure hitsPerPage={1} />
  </InstantSearch>
);



class PrimaryInput extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.currentRefinement,
  };

  onChange = (event, { newValue }) => this.setState({ value: newValue });

  onSuggestionsFetchRequested = ({ value }) => this.props.refine(value);

  onSuggestionsClearRequested = () => this.props.refine();

  getSuggestionValue = hit => hit.name;

  renderSuggestion = hit => (<Highlight attribute="service" hit={hit} tagName="mark" />);

  renderSectionTitle = section => section.index;

  getSectionSuggestions = section => section.hits;

  render() {

    const inputProps = {
      placeholder: 'Search for services...',
      onChange: this.onChange,
      value: this.state.value,
      style: {
        width: "15%",
        padding: "0.8%",
        fontSize: "1.5em",
        borderRadius: "5px",
        border: "none",
      }
    };

    return (
      <Autosuggest
        suggestions={this.props.hits}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        renderSectionTitle={this.renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions}
      />
    );
  }
}

const AutoComplete = connectAutoComplete(PrimaryInput);