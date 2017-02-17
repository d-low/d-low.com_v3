import { combineReducers } from 'redux';
import setHomeData from './set-home-data.js';
import setListingData from './set-listing-data.js';

const reducers = combineReducers({
  homeData: setHomeData,
  listingData: setListingData,
});

export default reducers;
