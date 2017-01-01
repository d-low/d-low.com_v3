import React from 'react';
import ReactDOM from 'react-dom';
import HomeView from './views/home-view';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(HomeView),
    document.querySelector('.js-main-container')
  );
});