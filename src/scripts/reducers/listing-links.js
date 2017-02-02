import { getLinks, prettifyTitle } from './get-links.js';

/**
 * @description Get the listing links and pretty title for the current page.
 */
const listingLinks = (state = {}, action) => {
  let parts = null;
  let newState = null;

  switch (action.type) {
    case 'SELECT_NODE':
      parts = action.path.split('/');

      newState = {
        links: getLinks(action.path, false),
        title: prettifyTitle(parts[parts.length - 1]),
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

export default listingLinks;
