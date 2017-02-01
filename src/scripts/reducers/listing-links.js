import { getLinks, prettifyTitle } from './get-links.js';

/**
 * @description ...
 */
const listingLinks = (state = {}, action) => {
  let currentNode = null;
  let parts = null;
  let newState = null;

  switch (action.type) {
    case 'SELECT_NODE':
      currentNode = window.Dlow.content;
      parts = action.path.split('/');

      parts.forEach((part) => {
        if (part) {
          currentNode = currentNode[part];
        }
      });

      newState = {
        links: getLinks(action.path, currentNode, false),
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
