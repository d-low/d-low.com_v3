import { combineReducers } from 'redux';
import topLinks from './top-links.js';
import listingLinks from './listing-links.js';

const reducers = combineReducers({
  topLinks,
  listingLinks,
});

export default reducers;
