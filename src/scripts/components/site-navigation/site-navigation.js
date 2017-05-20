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
    this.prevLocation = {};

    this.state = {
      isHidden: true,
    };

    this.linkClick = this.linkClick.bind(this);

    // When the URL changes (via the history API) hide the site navigation
    // component, it may already be hidden, and ignore scroll events until 2.5s
    // after the URL changes to allow for the page to be scrolled up and for
    // React to re-render. If this wasn't done then the site navigation
    // component might be hidden in linkClick() only to be shown again when
    // scrolling up right after the URL changes and before the new page is
    // rendered.

    browserHistory.listen((location) => {
      if (this.prevLocation.path !== location.path) {
        this.setState({
          isHidden: true,
        });

        this.ignoreScroll = true;

        window.setTimeout(() => { this.ignoreScroll = false; }, 2500);

        this.prevLocation = location;
      }
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
