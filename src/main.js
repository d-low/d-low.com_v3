import React from 'react';
import ReactDOM from 'react-dom';
import SiteFooterLinks from './site-footer-links';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(SiteFooterLinks),
    document.querySelector('.js-site-footer')
  );
});