import { getLinks } from './get-links.js';

/**
 * @description Set the top level links for the home page.
 */
const setHomeData = (state = {}, action) => {
  let newState = null;

  switch (action.type) {
    case 'GET_HOME_DATA':
      newState = {
        links: getLinks('/', true),
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

export default setHomeData;
