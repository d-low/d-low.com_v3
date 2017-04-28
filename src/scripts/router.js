import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers/index.js';
import getHomeData from './actions/get-home-data.js';
import getListingData from './actions/get-listing-data.js';
import getPostListingData from './actions/get-post-listing-data.js';

// Containers/Views/Pages
import HomeView from './containers/home-view.js';
import ListingView from './containers/listing-view.js';
import PostListingView from './containers/post-listing-view.js';

import Utils from './utils.js';

// Dispatch redux actions in route onEnter handlers
const store = createStore(reducers);

const onHomeEnter = function onHomeEnter(nextState, replace, done) {
  Utils.scrollToY(0)
    .then(() => {
      store.dispatch(getHomeData());
      done();
    });
};

const onListingEnter = function onListingEnter(nextState, replace, done) {
  Utils.scrollToY(0)
    .then(() => {
      store.dispatch(getListingData(nextState.location.pathname));
      done();
    });
};

const onPostListingEnter = function onPostListingEnter(nextState, replace, done) {
  Utils.scrollToY(0)
    .then(() => {
      store.dispatch(getPostListingData(nextState.location.pathname));
      done();
    });
};

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomeView} onEnter={onHomeEnter} />
      <Route path="/04-Central_America/:year" component={PostListingView} onEnter={onPostListingEnter} />
      <Route path="/02-South_America/:month" component={PostListingView} onEnter={onPostListingEnter} />
      <Route path="/03-CDT/:month" component={PostListingView} onEnter={onPostListingEnter} />
      <Route path="/:place/:year/:season" component={PostListingView} onEnter={onPostListingEnter} />
      <Route path="/:place/:year" component={ListingView} onEnter={onListingEnter} />
      <Route path="/:place" component={ListingView} onEnter={onListingEnter} />
    </Router>
  </Provider>
);
