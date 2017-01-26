import React from 'react';
import AboutMe from '../components/about-me/about-me.js';
import SiteHeader from '../components/site-header/site-header.js';
import TileNavigation from '../components/tile-navigation/tile-navigation.js';
import SiteContent from '../components/site-content/site-content.js';
import SiteFooter from '../components/site-footer/site-footer.js';

const HomePage = ({ links }) => (
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

HomePage.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default HomePage;
