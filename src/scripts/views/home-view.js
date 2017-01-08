import React from 'react';
import HomeSiteContent from '../components/home-site-content';
import SiteHeader from '../components/site-header/site-header.js';
import TileNavigation from '../components/tile-navigation/tile-navigation.js';
import SiteContent from '../components/site-content/site-content.js';
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
      links.push({
        name: key,
        href: '/' + key,
        image: findRandomImage(Dlow.content[key])
      });
    }

    // Add the most recent post to the beginning of the links

    if (Dlow.mostRecentPostPath) {
      let node = Dlow.content;

      Dlow.mostRecentPostPath.split('/').forEach((part) => {
        node = node[part];
      });

      if (node) {
        links.splice(0, 0 , {
          name: 'What\'s new?',
          href: '/' + Dlow.mostRecentPostPath,
          image: findRandomImage(node)
        });
      }
    }

    return links;
  }

  render() {
    const links = this.getLinks();

    return (
      <div className="main-view">
        <SiteHeader></SiteHeader>
        <SiteContent isHomePage>
          <TileNavigation isHomePage links={links}></TileNavigation>
        </SiteContent>
        <SiteContent>
          <HomeSiteContent></HomeSiteContent>
        </SiteContent>
        <SiteFooter></SiteFooter>
      </div>
    );
  }
}

export default HomeView;