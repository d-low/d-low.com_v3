import React from 'react';
import SiteNavigation from '../components/site-navigation/site-navigation.js';
import SiteHeader from '../components/site-header/site-header.js';

const ListingPage = ({ topLinks, listingLinks, title }) => (
  <div>
    <SiteNavigation links={topLinks} />
    <SiteHeader />
    <div>
      <h1>Listing View</h1>
      <h2>{ title }</h2>
      <pre>
        { JSON.stringify(listingLinks, null, 2)}
      </pre>
    </div>
  </div>
);

ListingPage.propTypes = {
  listingLinks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  title: React.PropTypes.string.isRequired,
  topLinks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default ListingPage;
