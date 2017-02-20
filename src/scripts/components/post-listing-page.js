import React from 'react';
import SiteNavigation from './site-navigation/site-navigation.js';
import SiteHeader from './site-header/site-header.js';
import SiteContent from './site-content/site-content.js';
// import TileNavigation from './tile-navigation/tile-navigation.js';
import SiteFooter from './site-footer/site-footer.js';
import { borderGrayBackground } from '../../styles/base/colors.css';

// TODO: Use names that correspond to our pages when parameterizing components.
// i.e. Use "isListingView" instead of "isContentPage". It's more consistent to
// use names that correspond with our views!
const PostListingPage = ({ links, title, topLinks }) => (
  <div className={borderGrayBackground}>
    <SiteNavigation links={topLinks} />
    <SiteHeader />
    <SiteContent title={title}>
      <pre>
        { JSON.stringify(links, null, 2) }
      </pre>
    </SiteContent>
    <SiteFooter />
  </div>
);

PostListingPage.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  title: React.PropTypes.string.isRequired,
  topLinks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default PostListingPage;
