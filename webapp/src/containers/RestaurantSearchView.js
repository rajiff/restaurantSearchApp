import React, { Component } from 'react';

import SearchField from '../components/SearchField';
import RestaurantSearchResult from '../components/RestaurantSearchResult';

import RestaurantSearchService from '../services/RestaurantSearchService';

export default class RestaurantSearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchInProgress: false,
      error: null,
      searchResult: {
        restaurants: []
      }
    }
  }

  handleSearchRestaurant = (searchQueryStr) => {
    this.setState({isSearchInProgress: true});

    new RestaurantSearchService().searchRestaurantByWildString(searchQueryStr, (err, result) => {
      this.setState({
        isSearchInProgress: false,
        error: (err || null),
        searchResult: (result || [])
      })
    })
  }

  render() {
    return (
    	<div>
      	<SearchField onSearch={this.handleSearchRestaurant} />
        <RestaurantSearchResult isSearchInProgress={this.state.isSearchInProgress} searchResult={this.state.searchResult} />
    	</div>
    );
  }
}

