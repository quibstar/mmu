import React, { Component } from 'react';
import GeoSuggest from '../geosuggest';
import './search.css';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <GeoSuggest />
      </div>
    );
  }
}
export default Search;
