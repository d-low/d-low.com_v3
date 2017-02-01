import { getLinks } from './get-links.js';

/**
 * @description ...
 */
const topLinks = (state = {}, action) => {
  const newState = {
    links: getLinks('/', window.Dlow.content, true),
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
