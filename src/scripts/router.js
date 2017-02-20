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
import PostView from './containers/post-view.js';

/**
 * @description Scroll to requested Y position using easing transition and
 * request animation frame.
 * @see http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation#26808520
 * @todo Move this method to a utilities module if we need to use it elsewhere
 */
const scrollToY = function scrollToY(scrollTargetY = 0) {
  return new Promise((resolve) => {
    let currentTime = 0;
    const pageYOffset = window.pageYOffset;
    const time = 0.5;

    // Easing equation from https://github.com/danro/easing-js/blob/master/easing.js
    const easeOutSine = pos => Math.sin(pos * (Math.PI / 2));

    // Add animation loop
    const tick = () => {
      currentTime += 1 / 60;

      const p = currentTime / time;
      const t = easeOutSine(p);

      if (p < 1) {
        window.scrollTo(
          0,
          pageYOffset + ((scrollTargetY - pageYOffset) * t),
        );
        window.requestAnimationFrame(tick);
      } else {
        window.scrollTo(0, scrollTargetY);
        resolve();
      }
    };

    // call it once to get started
    tick();
  });
};

// Dispatch redux actions in route onEnter handlers
const store = createStore(reducers);

const onHomeEnter = function onHomeEnter(nextState, replace, done) {
  scrollToY(0)
    .then(() => {
      store.dispatch(getHomeData());
      done();
    });
};

const onListingEnter = function onListingEnter(nextState, replace, done) {
  scrollToY(0)
    .then(() => {
      store.dispatch(getListingData(nextState.location.pathname));
      done();
    });
};

const onPostListingEnter = function onPostListingEnter(nextState, replace, done) {
  scrollToY(0)
    .then(() => {
      store.dispatch(getPostListingData(nextState.location.pathname));
      done();
    });
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
