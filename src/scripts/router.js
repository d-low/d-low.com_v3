import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import nodeSelector from './reducers/node-selector.js';

// Containers/Views/Pages
import HomeView from './containers/home-view.js';
import ListingView from './containers/listing-view.js';
import PostListingView from './containers/post-listing-view.js';
import PostView from './containers/post-view.js';

const store = createStore(nodeSelector);

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomeView} />
      <Route path="/:place/:year/:season/:post" component={PostView} />
      <Route path="/:place/:year/:season" component={PostListingView} />
      <Route path="/:place/:year" component={ListingView} />
      <Route path="/:place" component={ListingView} />
    </Router>
  </Provider>
);
