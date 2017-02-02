import React from 'react';

const SiteNavigation = function SiteNavigation(props) {
  const listItems = props.links.map(link =>
    <li key={link.name}>
      <a href={link.href}>{ link.name }</a>
    </li>,
  );

  return (
    <nav>
      <button>
        <i className="icon icon-hamburger" />
      </button>
      <ul>
        {listItems}
      </ul>
    </nav>
  );
};

SiteNavigation.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default SiteNavigation;
