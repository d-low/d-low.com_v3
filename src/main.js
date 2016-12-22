import React from 'react';
import ReactDOM from 'react-dom';
import SiteHeaderNavigation from './site-header-navigation';
import SiteFooterLinks from './site-footer-links';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(SiteHeaderNavigation),
    document.querySelector('.js-site-header-nav')
  );
  ReactDOM.render(
    React.createElement(SiteFooterLinks),
    document.querySelector('.js-site-footer')
  );
});