import React from 'react';
import { Link } from 'react-router';
import styles from './site-navigation.css';

class SiteNavigation extends React.Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
    };

    this.toggleSiteNavigation = this.toggleSiteNavigation.bind(this);
    this.linkTextClick = this.linkTextClick.bind(this);
  }

  toggleSiteNavigation() {
    this.setState({ expanded: !this.state.expanded });
  }

  linkTextClick(e) {
    e.target.blur();
    window.setTimeout(this.toggleSiteNavigation, 250);
  }

  render() {
    const listItems = this.props.links.map(link =>
      <li className={styles.link} key={link.name}>
        <Link
          className={styles.linkText}
          onClick={this.linkTextClick}
          to={link.href}>
          { link.name }
        </Link>
      </li>,
    );

    const linksClassName = this.state.expanded ?
      styles.linksExpanded : styles.links;
    const closeButtonClassName = this.state.expanded ?
      styles.closeButtonExpanded : styles.closeButton;

    return (
      <nav>
        <button className={styles.actionButton} onClick={this.toggleSiteNavigation}>
          <i className={styles.actionButtonIcon} />
        </button>
        <button className={closeButtonClassName} onClick={this.toggleSiteNavigation}>
          <i className={styles.closeButtonIcon} />
        </button>
        <ul className={linksClassName}>
          {listItems}
        </ul>
      </nav>
    );
  }
}

SiteNavigation.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default SiteNavigation;
