import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import './geosuggest.css';

class GeoSuggest extends Component {
  onSuggestSelect(suggest) {
    if (suggest) {
      console.log(suggest);
      console.log(suggest.location);
    }
  }

  render() {
    return (
      <Geosuggest
        placeholder="Start typing..."
        onSuggestSelect={this.onSuggestSelect}
        ref={el => (this._geoSuggest = el)}
      />
    );
  }
}
export default GeoSuggest;
