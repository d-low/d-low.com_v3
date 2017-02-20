import { getLinks, getPostListingLinks, prettifyTitle } from './get-links.js';

/**
 * @description Set the post listing links, pretty title, and top level links
 * for for the current post listing page.
 */
const setPostListingData = (state = {}, action) => {
  let parts = null;
  let newState = null;

  switch (action.type) {
    case 'GET_POST_LISTING_DATA':
      parts = action.path.split('/');

      newState = {
        links: getPostListingLinks(action.path),
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

export default setPostListingData;
