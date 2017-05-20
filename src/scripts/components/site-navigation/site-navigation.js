/* eslint no-console: 0, class-methods-use-this: 0 */

import React from 'react';
import { browserHistory, Link } from 'react-router';
import Utils from '../../utils.js';
import scrollEventsHandler from '../scroll-events-handler/scroll-events-handler.js';
import styles from './site-navigation.css';

class SiteNavigation extends React.Component {
  constructor() {
    super();

    this.ignoreScroll = false;
    this.state = {
      isHidden: true,
    };

    this.linkClick = this.linkClick.bind(this);

    // Scroll events are ignored after the URL changes (via History API) so
    // that we don't accidentally show the site navigation component again
    // after hiding it when one of it's links is clicked and the page is
    // scrolled to the top before rendering the new content.

    browserHistory.listen((location) => {
      window.setTimeout(() => {
        if (location.path !== this.prevLocation.path) {
          this.ignoreScroll = false;
        }
      }, 2500);
    });
  }

  linkClick(e) {
    e.preventDefault();

    this.prevLocation = Utils.parseUri(window.location);
    this.newLocation = Utils.parseUri(e.target.href);
    this.ignoreScroll = true;

    this.setState({
      isHidden: true,
    }, () => window.setTimeout(() => {
      browserHistory.push(this.newLocation.path);
    }, 250));
  }

  scroll() {
    if (this.ignoreScroll) {
      return;
    }

    if (this.scrollDirection === this.SCROLL_DIRECTION.UP) {
      this.setState({ isHidden: false });
    } else if (this.scrollDirection === this.SCROLL_DIRECTION.DOWN) {
      this.setState({ isHidden: true });
    }
  }

  render() {
    const className = `${styles.container} ${this.state.isHidden ? styles.containerHidden : ''}`;

    const listItems = this.props.links.map(link =>
      <li className={styles.link} key={link.name}>
        <Link
          className={styles.linkText}
          onClick={this.linkClick}
          to={link.href}>
          { link.name }
        </Link>
      </li>,
    );

    return (
      <nav className={className}>
        <ul className={styles.links}>
          {listItems}
        </ul>
      </nav>
    );
  }
}

SiteNavigation.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

// export default SiteNavigation;
export default scrollEventsHandler(SiteNavigation);
