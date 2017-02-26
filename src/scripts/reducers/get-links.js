/**
 * @todo This module no longer just gets links. It now provides more generic
 * node processing methods. We need to rename it appropriately.
 */
export const prettifyTitle = function prettifyTitle(title) {
  return title.replace(/^\d\d-/, '').replace(/[-_]/g, ' ');
};

/**
 * @description Iterate through the content object nodes from the top until we
 * find the node corresponding to the specified path.
 * @todo Remove conditional assignment when new generate_content.rb used on
 * d-low.com!
 */
const getNode = function getNode(path) {
  let node = window.Dlow.content || window.Dlow.Content;
  const parts = path.split('/');

  parts.forEach((part) => {
    if (part) {
      node = node[part];
    }
  });

  return node;
};

/**
 * @description Given a path to a post return an array of paths to images
 * contained in that post.
 * @param path Path to node
 */
const getPostImages = function getPostImages(path) {
  const node = getNode(path);
  const images = [];

  node.imgs.forEach((img) => {
    images.push(`http://www.d-low.com/data${path}/${img}`);
  });

  return images;
};

/**
 * @description Given a path to a post return an array of paths to thumnail
 * images contained in that post.
 * @param path Path to node
 * @param imageToExcluded The hero image to exclude from the thumbnails
 */
const getPostThumbnails = function getPostThumbnails(path, imageToExclude = '') {
  const node = getNode(path);
  const thumbnails = [];

  node.imgs.forEach((img) => {
    if (!imageToExclude.match(img)) {
      thumbnails.push(`http://www.d-low.com/data${path}/thumbnails/${img}`);
    }
  });

  return thumbnails;
};

/**
 * @description Construction an array of links, one for each child node of the
 * current node that is not a post. Extracting the pretty name from each node
 * and select a random image from one of the nodes post nodes.
 * @param path The path to the node we're working with. e.g. /, /05-Colorado,
 * /05-Colorado/11-Colorado-2016/04-Fall
 * @param includeMostRecent If true, the most recent post will be prepended to
 * the returned array of links.
 * @param descending If true, the links will be sorted in reverse order. This
 * is used on the listing and post listing pages to show the most recent items
 * first.
 */
export const getLinks = function getLinks(path, includeMostRecent = false, descending = false) {
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

  const node = getNode(path);

  Object.keys(node).forEach((key) => {
    links.push({
      name: prettifyTitle(key),
      href: `${path === '/' ? '' : path}/${key}`,
      image: findRandomImage(node[key]),
    });
  });

  if (descending === true) {
    links.reverse();
  }

  // Add the most recent post to the beginning of the links
  // TODO: Remove conditional assignment when new generate_content.rb used on
  // d-low.com!

  if (includeMostRecent && window.Dlow.mostRecentPostPath) {
    let mostRecentNode = window.Dlow.content || window.Dlow.Content;

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

  // Use content from d-low.com
  const mappedLinks = links.map(link => ({
    name: link.name,
    href: link.href,
    image: `http://www.d-low.com${link.image}`,
  }));

  return mappedLinks;
};

/**
 * @description Given link to a post or a path to a post populate and return a
 * post object.
 */
export const getPost = function getPost(link, path) {
  const link2 = link || getLinks(path, false, true)[0];
  return {
    name: link2.name,
    href: link2.href,
    images: getPostImages(link2.href),
    text: () => new Promise((resolve) => {
      fetch(`http://www.d-low.com/data${link2.href}/index.html`)
        .then(response => response.text())
        .then(text => resolve(text));
    }),
    thumbnails: getPostThumbnails(link2.href, link2.image),
  };
};

/**
 * @todo We may want to use an async action rather than wrapping the post text
 * in a method that returns a promise.
 * @see http://redux.js.org/docs/advanced/AsyncFlow.html
 */
export const getPostListingLinks = function getPostListingLinks(path) {
  const links = getLinks(path, false, true);
  const postListingLinks = [];

  links.forEach((link) => {
    postListingLinks.push(getPost(link));
  });
  return postListingLinks;
};
