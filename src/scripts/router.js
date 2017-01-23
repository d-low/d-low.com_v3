import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// Views (Pages)
import HomeView from './views/home-view.js';
import ListingView from './views/listing-view.js';
import PostListingView from './views/post-listing-view.js';
import PostView from './views/post-view.js';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={HomeView} />
    <Route path="/:place/:year/:season/:post" component={PostView} />
    <Route path="/:place/:year/:season" component={PostListingView} />
    <Route path="/:place/:year" component={ListingView} />
    <Route path="/:place" component={ListingView} />
  </Router>
);
