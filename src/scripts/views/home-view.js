import React from 'react';
import HomeSiteContent from '../components/home-site-content';
import SiteHeader from '../components/site-header/site-header.js';
import TileNavigation from '../components/tile-navigation/tile-navigation.js';
import SiteContent from '../components/site-content';
import SiteFooter from '../components/site-footer';

class HomeView extends React.Component {
  constructor() {
    super();
  }

  /**
   * @description Construction an array of links, one for each top level
   * content directory extracting the pretty name from the directory name and
   * selecting a random image from one of the post nodes.
   * @todo 
   * 1) Add a link for most recent post at the beginning of the array.
   * 2) Move this to a utility class since it will be used on listing pages.
   */
  getLinks() {
    const links = [];

    const generateRandomNumber = function(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

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

    for (const key in Dlow.content) {

      // TODO: Parse pretty name from directory name.

      links.push({
        name: key,
        href: '/' + key,
        image: findRandomImage(Dlow.content[key])
      });
    }

    return links;
  }

  render() {
    const links = this.getLinks();

    return (
      <div className="main-view">
        <SiteHeader></SiteHeader>
        <SiteContent>
          <TileNavigation links={links}></TileNavigation>
          <HomeSiteContent></HomeSiteContent>
        </SiteContent>
        <SiteFooter></SiteFooter>
      </div>
    );
  }
}

export default HomeView;