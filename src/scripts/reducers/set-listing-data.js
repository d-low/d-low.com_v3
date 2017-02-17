import { getLinks, prettifyTitle } from './get-links.js';

/**
 * @description Set the listing links, pretty title, and top level links for
 * for the current listing page.
 */
const setListingData = (state = {}, action) => {
  let parts = null;
  let newState = null;

  switch (action.type) {
    case 'GET_LISTING_DATA':
      parts = action.path.split('/');

      newState = {
        links: getLinks(action.path, false, true),
        title: prettifyTitle(parts[parts.length - 1]),
        topLinks: [{ name: 'Home', href: '/', image: '' }].concat(getLinks('/', false)),
      };

      return Object.assign(
        {},
        state,
        newState,
      );

    default:
      return state;
  }
};

export default setListingData;
