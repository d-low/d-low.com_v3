import ReactDOM from 'react-dom';
import Router from './router';

// TBD: Should we create one SASS manifest file that includes all these in the
// proper order and include it here? Then we can use CSS modules as appropriate
// everywhere else. It feels like a nice hybrid approach.

import '../styles/base/reset';
import '../styles/base/typography';
import '../styles/base/element-defaults';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    Router,
    document.querySelector('.js-main-container'),
  );
});
