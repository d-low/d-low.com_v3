import { getLinks, prettifyTitle } from './get-links.js';

/**
 * @description Get the listing links and pretty title for the current page.
 * @todo Now that we're getting the top links in this reducer should we rename
 * the action to ENTER_LISTING_VIEW and this function to enterListingView()?
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

export default listingLinks;
