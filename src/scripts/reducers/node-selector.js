/**
 * @description Construction an array of links, one for each child node of the
 * current node that is not a post. Extracting the pretty name from each node
 * and select a random image from one of the nodes post nodes.
 * @param node The node we're workign with, e.g. /, /05-Colorado,
 * /05-Colorado/11-Colorado-2016/04-Fall
 * @param includeMostRecent If true, the most recent post will be prepended to
 * the returned array of links.
 */
const getLinks = (node, includeMostRecent = false) => {
  const links = [];

  const generateRandomNumber = (max, min) =>
    Math.floor((Math.random() * ((max - min) + 1)) + min);

  const findRandomImage = (currentNode) => {
    if (Array.isArray(currentNode.imgs)) {
      const index = generateRandomNumber(currentNode.imgs.length - 1, 0);
      return `/data/${currentNode.path}/${currentNode.imgs[index]}`;
    }

    const keys = Object.keys(currentNode);
    const index = generateRandomNumber(keys.length - 1, 0);
    const key = keys[index];

    return findRandomImage(currentNode[key]);
  };

  Object.keys(node).forEach((key) => {
    links.push({
      name: key.replace(/^\d\d-/, '').replace(/[-_]/g, ' '),
      href: `/${key}`,
      image: findRandomImage(window.Dlow.content[key]),
    });
  });

  // Add the most recent post to the beginning of the links

  if (includeMostRecent && window.Dlow.mostRecentPostPath) {
    let mostRecentNode = window.Dlow.content;

    window.Dlow.mostRecentPostPath.split('/').forEach((part) => {
      mostRecentNode = mostRecentNode[part];
    });

    if (mostRecentNode) {
      links.splice(0, 0, {
        name: 'What\'s new?',
        href: `/${window.Dlow.mostRecentPostPath}`,
        image: findRandomImage(mostRecentNode),
      });
    }
  }

  return {
    links,
    post: null, // TODO: Return a post here or in a separate method?
    posts: [],
    title: '', // TODO: How do we get the title from the current node?
  };
};

/**
 * @desccription The initial state is the list of links from the root node of
 * our content with the what's new section added.
 */
const initialState = getLinks(window.Dlow.content, true);

/**
 * @description When navigating to a new node the SELECT_NODE action will be
 * dispatched to the store and we'll handle it here by finding the current node
 * in our content and then returning either the links, post, or posts and title
 * as the current state.
 */
const nodeSelector = (state = initialState, action) => {
  let currentNode = null;

  switch (action.type) {
    case 'SELECT_NODE':
      currentNode = window.Dlow.content;

      action.path.split('/').forEach((part) => {
        currentNode = currentNode[part];
      });

      return Object.assign({}, state, getLinks(currentNode, false));

    default:
      return state;
  }
};

export default nodeSelector;
