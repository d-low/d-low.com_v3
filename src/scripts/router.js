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

/**
 * Map old Backbone hash routes to new React routes that use HTML history API.
 * @example
 * #content/05-Colorado/12-Colorado-2017/02-Spring -> 05-Colorado/12-Colorado-2017/02-Spring
 */
const mapBackboneRoute = function mapBackboneRoute(hash) {
  let mappedRoute = '';

  if (String(hash).match('#content/')) {
    const newRoute = String(hash).replace('#content/', '');

    // Special case to convert:
    //
    // #content/05-Colorado/12-Colorado-2017/02-Spring/01-Spring_Break_In_New_Mexico-Mar_25_2017
    //
    // To:
    //
    // 05-Colorado/12-Colorado-2017/02-Spring#01-Spring_Break_In_New_Mexico-Mar_25_2017

    const newRouteParts = newRoute.split('/');

    if (newRouteParts.length === 4) {
      mappedRoute = `/${newRouteParts.slice(0, 3).join('/')}#${newRouteParts[3]}`;
    } else {
      mappedRoute = String(hash).replace('#content/', '/');
    }
  }

  return mappedRoute;
};

/**
 * When entering a route if the next state is an old Backbone hash route then
 * convert it to its corresponding new route and navigate to it. Otherwise
 * scroll to the top of the page and then dispatch the requested action to the
 * store. All of our onEnter handlers call this method.
 */
const onEnter = function onEnter(action, nextState, replace, done) {
  const mappedRoute = mapBackboneRoute(nextState.location.hash);

  if (mappedRoute) {
    replace(mappedRoute);
    done();
  } else {
    Utils.scrollToY(0)
      .then(() => {
        store.dispatch(action());
        done();
      });
  }
};

const onHomeEnter = function onHomeEnter(nextState, replace, done) {
  onEnter(getHomeData, nextState, replace, done);
};

const onListingEnter = function onListingEnter(nextState, replace, done) {
  const action = () => getListingData(nextState.location.pathname);
  onEnter(action, nextState, replace, done);
};

const onPostListingEnter = function onPostListingEnter(nextState, replace, done) {
  const action = () => getPostListingData(nextState.location.pathname);
  onEnter(action, nextState, replace, done);
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
