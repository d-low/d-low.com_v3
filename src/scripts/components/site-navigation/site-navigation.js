import React from 'react';
import styles from './site-navigation.css';

class SiteNavigation extends React.Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
    };

    this.toggleSiteNavigation = this.toggleSiteNavigation.bind(this);
  }

  toggleSiteNavigation() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const listItems = this.props.links.map(link =>
      <li className={styles.link} key={link.name}>
        <a className={styles.linkText} href={link.href}>{ link.name }</a>
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
