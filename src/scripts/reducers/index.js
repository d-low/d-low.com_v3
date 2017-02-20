import { combineReducers } from 'redux';
import setHomeData from './set-home-data.js';
import setListingData from './set-listing-data.js';
import setPostListingData from './set-post-listing-data.js';

const reducers = combineReducers({
  homeData: setHomeData,
  listingData: setListingData,
  postListingData: setPostListingData,
});

export default reducers;
