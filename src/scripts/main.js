import ReactDOM from 'react-dom';
import 'typeface-passion-one';

// Import SASS files before the router so that these global styles appear first
// in the bundle when extracted by the extract-text-plugin.
// TODO: Consider bunlding these into a single SASS manifest.
import '../styles/base/reset';
import '../styles/base/typography';
import '../styles/base/element-defaults';

import Router from './router';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    Router,
    document.querySelector('.js-main-container'),
  );
});
