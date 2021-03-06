/**
 * @todo This module no longer just gets links. It now provides more generic
 * node processing methods. We need to rename it appropriately.
 */

const host = 'https://www.d-low.com';

/**
 * Remove initial digits, split on the title/date separator and keeping both
 * the title and the date, and then replace underscores with white space.
 * @example
 * 05-Colorado -> Colorado
 * Colorado-2016 -> Colorado 2016
 * 01-A_Few_Snowy_Adventures-Apr_11_2017 -> A Few Snowy Adventures Apr 11 2017
 */
export const prettifyTitle = function prettifyTitle(keyName) {
  return keyName.replace(/^\d\d-/, '').replace(/[-_]/g, ' ');
};

/**
 * Remove initial digits, split on the title/date separator and keeping the
 * title, and then replace underscores with white space.
 * @example
 * 05-Colorado -> Colorado
 * 01-A_Few_Snowy_Adventures-Apr_11_2017 -> A Few Snowy Adventures
 */
const prettifyTitleOnly = function prettifyTitleOnly(keyName) {
  return keyName.replace(/^\d\d-/, '').split(/-/)[0].replace(/_/g, ' ');
};

/**
 * Remove initial digits, split on the title/date separator and keeping the
 * date, and then replace underscores with white space, and insert a comma
 * after the day of the month.
 * @example
 * 05-Colorado -> ''
 * 01-A_Few_Snowy_Adventures-Apr_11_2017 -> Apr 11, 2017
 */
const prettifyDateOnly = function prettifyDate(keyName) {
  const datePart = keyName.replace(/^\d\d-/, '').split(/-/);

  if (datePart.length > 1) {
    try {
      return datePart[1].replace(/_/g, ' ').replace(/ (\d\d\d\d)$/, ', $1');
    } catch (exp) {
      return '';
    }
  } else {
    return '';
  }
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

  if (!Array.isArray(node.imgs)) {
    return images;
  }

  node.imgs.forEach((img) => {
    images.push(`${host}/data${path}/${img}`);
  });

  // Sort images in ascending order so they're displayed in chronological order
  images.sort((a, b) => {
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();

    if (aLower < bLower) {
      return -1;
    } else if (aLower > bLower) {
      return 1;
    }

    return 0;
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

  if (!Array.isArray(node.imgs)) {
    return thumbnails;
  }

  node.imgs.forEach((img) => {
    if (!imageToExclude.match(img)) {
      thumbnails.push(`${host}/data${path}/thumbnails/${img}`);
    }
  });

  // Sort images in ascending order so they're displayed in chronological order
  thumbnails.sort((a, b) => {
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();

    if (aLower < bLower) {
      return -1;
    } else if (aLower > bLower) {
      return 1;
    }

    return 0;
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
export const getLinks = function getLinks(
  path,
  includeMostRecent = false,
  descending = false,
  makeTitlePretty = true,
) {
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
      name: makeTitlePretty ? prettifyTitle(key) : key,
      href: `${path === '/' ? '' : path}/${key}`,
      image: findRandomImage(node[key]),
    });
  });

  // First sort links in ascending order by href
  links.sort((a, b) => {
    const aHref = a.href.toLowerCase();
    const bHref = b.href.toLowerCase();

    if (aHref < bHref) {
      return -1;
    } else if (aHref > bHref) {
      return 1;
    }

    return 0;
  });

  // Then reverse if requested
  if (descending === true) {
    links.reverse();
  }

  // Add the most recent post to the beginning of the links
  // TODO: Remove conditional assignment when new generate_content.rb used on
  // d-low.com!

  if (includeMostRecent && window.Dlow.mostRecentPostPath) {
    let mostRecentNode = window.Dlow.content || window.Dlow.Content;

    // TEMP: Use different most recent path to test internal anchors
    // 05-Colorado/11-Colorado-2016/03-Summer/03-Pawnee_Buchanan_Loop-Jul_30_2016';

    window.Dlow.mostRecentPostPath.split('/').forEach((part) => {
      mostRecentNode = mostRecentNode[part];
    });

    // TEMP: Replace last "/" with an "#" so we can link to an internal hash.
    // TODO: When generate_content.rb adds a "#" then this can be removed.
    // SEE: http://stackoverflow.com/questions/5497318/replace-last-occurrence-of-character-in-string
    if (mostRecentNode) {
      links.splice(0, 0, {
        name: 'What\'s new?',
        href: `/${window.Dlow.mostRecentPostPath.replace(/\/([^/]*)$/, '#$1')}`,
        image: findRandomImage(mostRecentNode),
      });
    }
  }

  // Use content from d-low.com
  const mappedLinks = links.map(link => ({
    name: link.name,
    href: link.href,
    image: `${host}${link.image}`,
  }));

  return mappedLinks;
};

/**
 * @description Given link to a post or a path to a post populate and return a
 * post object.
 */
export const getPost = function getPost(link, path) {
  const link2 = link || getLinks(path, false, true, false)[0];
  return {
    name: prettifyTitleOnly(link2.name),
    date: prettifyDateOnly(link2.name),
    href: link2.href,
    images: getPostImages(link2.href),
    text: () => new Promise((resolve, reject) => {
      try {
        fetch(`${host}/data${link2.href}/index.html`)
          .then(response => response.text())
          .then(text => resolve(text))
          .catch(exp => reject(exp));
      } catch (exp) {
        reject(exp);
      }
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
  const links = getLinks(path, false, true, false);
  const postListingLinks = [];

  links.forEach((link) => {
    postListingLinks.push(getPost(link));
  });
  return postListingLinks;
};
