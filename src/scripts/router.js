import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import nodeSelector from './reducers/node-selector.js';
import selectNode from './actions/select-node.js';

// Containers/Views/Pages
import HomeView from './containers/home-view.js';
import ListingView from './containers/listing-view.js';
import PostListingView from './containers/post-listing-view.js';
import PostView from './containers/post-view.js';

const store = createStore(nodeSelector);
const onEnterHandler = function onEnterHandler(nextState) {
  store.dispatch(selectNode(nextState.location.pathname));
};

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomeView} onEnter={onEnterHandler} />
      <Route path="/:place/:year/:season/:post" component={PostView} onEnter={onEnterHandler} />
      <Route path="/:place/:year/:season" component={PostListingView} onEnter={onEnterHandler} />
      <Route path="/:place/:year" component={ListingView} onEnter={onEnterHandler} />
      <Route path="/:place" component={ListingView} onEnter={onEnterHandler} />
    </Router>
  </Provider>
);
