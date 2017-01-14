import React from 'react';
import AboutMe from '../components/about-me/about-me.js';
import SiteHeader from '../components/site-header/site-header.js';
import TileNavigation from '../components/tile-navigation/tile-navigation.js';
import SiteContent from '../components/site-content/site-content.js';
import SiteFooter from '../components/site-footer/site-footer.js';

const HomeView = function HomeView() {
  const links = HomeView.getLinks();

  return (
    <div className="main-view">
      <SiteHeader />
      <SiteContent isHomePageNav>
        <TileNavigation isHomePage links={links} />
      </SiteContent>
      <SiteContent>
        <AboutMe />
      </SiteContent>
      <SiteFooter />
    </div>
  );
};

/**
 * @description Construction an array of links, one for each top level
 * content directory extracting the pretty name from the directory name and
 * selecting a random image from one of the post nodes.
 * @todo
 * 1) Move this to a utility class since it will be used on listing pages.
 */
HomeView.getLinks = function getLinks() {
  const links = [];

  const generateRandomNumber = function generateRandomNumber(max, min) {
    return Math.floor((Math.random() * ((max - min) + 1)) + min);
  };

  const findRandomImage = function findRandomImage(node) {
    if (Array.isArray(node.imgs)) {
      const index = generateRandomNumber(node.imgs.length - 1, 0);
      return `/data/${node.path}/${node.imgs[index]}`;
    }

    const keys = Object.keys(node);
    const index = generateRandomNumber(keys.length - 1, 0);
    const key = keys[index];

    return findRandomImage(node[key]);
  };

  Object.keys(window.Dlow.content).forEach((key) => {
    links.push({
      name: key,
      href: `/${key}`,
      image: findRandomImage(window.Dlow.content[key]),
    });
  });

  // Add the most recent post to the beginning of the links

  if (window.Dlow.mostRecentPostPath) {
    let node = window.Dlow.content;

    window.Dlow.mostRecentPostPath.split('/').forEach((part) => {
      node = node[part];
    });

    if (node) {
      links.splice(0, 0, {
        name: 'What\'s new?',
        href: `/${window.Dlow.mostRecentPostPath}`,
        image: findRandomImage(node),
      });
    }
  }

  return links;
};

export default HomeView;
