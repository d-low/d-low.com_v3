import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// Containers/Views/Pages
import HomeView from './containers/home-view.js';
import ListingView from './containers/listing-view.js';
import PostListingView from './containers/post-listing-view.js';
import PostView from './containers/post-view.js';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={HomeView} />
    <Route path="/:place/:year/:season/:post" component={PostView} />
    <Route path="/:place/:year/:season" component={PostListingView} />
    <Route path="/:place/:year" component={ListingView} />
    <Route path="/:place" component={ListingView} />
  </Router>
);
