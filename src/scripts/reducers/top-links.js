import { getLinks } from './get-links.js';

/**
 * @description Get the top level links for the home page and site navigation.
 */
const topLinks = (state = {}, action) => {
  const newState = {
    links: getLinks('/', true),
  };

  switch (action.type) {
    case 'SET_TOP_LINKS':
      return Object.assign(
        {},
        state,
        newState,
      );

    default:
      return state;
  }
};

export default topLinks;
