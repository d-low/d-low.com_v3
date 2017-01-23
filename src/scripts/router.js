import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// Views (Pages)
import HomeView from './views/home-view';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={HomeView} />
  </Router>
);
