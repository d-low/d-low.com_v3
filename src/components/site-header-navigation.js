import React from 'react';

class SiteHeaderNavigation extends React.Component {
  constructor() {
    super();
    this.state = this.setState();
  }

  /**
   * @description Construction an array of links, one for each top level
   * content directory extracting the pretty name from the directory name and
   * selecting a random image from one of the post nodes.
   * @todo 
   * 1) Add a link for most recent post at the beginning of the array.
   * 2) Don't get this data from the global object. Rather use React 
   *    conventions to get it.
   * 3) Will we reuse the closure methods here? If so where should we put them?
   */
  setState() {
    const generateRandomNumber = function(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const findRandomImage = function(node) {
      if (Array.isArray(node.imgs)) {
        const index = generateRandomNumber(node.imgs.length - 1, 0);
        return '/data/' + node.path + '/' + node.imgs[index];
      }
      else {
        const keys = Object.keys(node);
        const index = generateRandomNumber(keys.length - 1, 0);
        const key = keys[index];

        return findRandomImage(node[key]);
      }
    };

    const links = [];

    for (const key in Dlow.content) {

      // TODO: Parse pretty name from directory name.

      links.push({
        name: key,
        href: '/' + key,
        image: findRandomImage(Dlow.content[key])
      });
    }

    return {
      links: links
    };
  }

  render() {
    const listItems = this.state.links.map((link) =>
      /* beautify ignore:start */
      <li key={link.name}>
        <a href={link.href} title={link.text}>
          <img src={link.image} />
          <span> 
            {link.name} 
          </span> 
        </a> 
      </li>
      /* beautify ignore:end */
    );

    return (
      /* beautify ignore:start */
      <div className="site-header-nav js-site-header-nav">
        <nav className="clearfix">
          <ul className="list-unstyled">
            {listItems} 
          </ul>
        </nav>
      </div>
      /* beautify ignore:end */
    );
  }
}

export default SiteHeaderNavigation;