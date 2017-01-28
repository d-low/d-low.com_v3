import React from 'react';

const ListingPage = ({ links, title }) => (
  <div>
    <h1>Listing View</h1>
    <h2>{ title }</h2>
    <pre>
      { JSON.stringify(links, null, 2)}
    </pre>
  </div>
);

ListingPage.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  title: React.PropTypes.string.isRequired,
};

export default ListingPage;
