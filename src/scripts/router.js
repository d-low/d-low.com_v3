import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers/index.js';
import setTopLinks from './actions/set-top-links.js';
import selectNode from './actions/select-node.js';

// Containers/Views/Pages
import HomeView from './containers/home-view.js';
import ListingView from './containers/listing-view.js';
import PostListingView from './containers/post-listing-view.js';
import PostView from './containers/post-view.js';

const store = createStore(reducers);

const onHomeEnter = function onHomeEnter() {
  store.dispatch(setTopLinks());
};
const onListingEnter = function onListingEnter(nextState) {
  store.dispatch(selectNode(nextState.location.pathname));
};
const onPostListingEnter = function onPostListingEnter() {
  // TODO: ...
};
const onPostEnter = function onPostEnter() {
  // TODO: ...
};

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomeView} onEnter={onHomeEnter} />
      <Route path="/:place/:year/:season/:post" component={PostView} onEnter={onPostEnter} />
      <Route path="/:place/:year/:season" component={PostListingView} onEnter={onPostListingEnter} />
      <Route path="/:place/:year" component={ListingView} onEnter={onListingEnter} />
      <Route path="/:place" component={ListingView} onEnter={onListingEnter} />
    </Router>
  </Provider>
);
