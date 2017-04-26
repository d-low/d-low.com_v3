import React from 'react';
import { Link } from 'react-router';
import styles from './site-navigation.css';

const SiteNavigation = function SiteNavigation(props) {
  function linkClick(e) {
    e.target.blur();
  }

  const listItems = props.links.map(link =>
    <li className={styles.link} key={link.name}>
      <Link
        className={styles.linkText}
        onClick={linkClick}
        to={link.href}>
        { link.name }
      </Link>
    </li>,
  );

  return (
    <nav className={styles.container}>
      <ul className={styles.links}>
        {listItems}
      </ul>
    </nav>
  );
};

SiteNavigation.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default SiteNavigation;
