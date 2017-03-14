import ReactDOM from 'react-dom';

// TODO: If we can import a CSS file from this module then we can remove the
// eslint rule that turns off requiring extensions on imports
import 'typeface-passion-one';

// Including the fetch polyfill in webpack.config.js using webpack.ProvidePlugin()
// isn't working, so it's brought in here directly.
import 'whatwg-fetch';

// Import global styles before the router so that they appear first in the
// bundle when extracted by the extract-text-plugin.
import '../styles/base/reset.css';
import '../styles/base/typography.css';
import '../styles/base/element-defaults.css';

import Router from './router';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    Router,
    document.querySelector('.js-main-container'),
  );
});
