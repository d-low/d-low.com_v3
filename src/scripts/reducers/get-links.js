export const prettifyTitle = function prettifyTitle(title) {
  return title.replace(/^\d\d-/, '').replace(/[-_]/g, ' ');
};

/**
 * @description Construction an array of links, one for each child node of the
 * current node that is not a post. Extracting the pretty name from each node
 * and select a random image from one of the nodes post nodes.
 * @param path The path to the node we're working with.
 * @param node The actual node we're working with, e.g. /, /05-Colorado,
 * /05-Colorado/11-Colorado-2016/04-Fall
 * @param includeMostRecent If true, the most recent post will be prepended to
 * the returned array of links.
 * @todo Don't pass node into this function, just pass the path, and we can
 * then get the proper node here, using the recursion done in listingLinks()!
 */
export const getLinks = function getLinks(path, node, includeMostRecent = false) {
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
      name: prettifyTitle(key),
      href: `${path === '/' ? '' : path}/${key}`,
      image: findRandomImage(node[key]),
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

  return links;
};
