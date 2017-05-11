/* eslint class-methods-use-this: 0 */

import React from 'react';
import { browserHistory, Link } from 'react-router';
import scrollEventsHandler from '../scroll-events-handler/scroll-events-handler.js';
import styles from './site-navigation.css';

class SiteNavigation extends React.Component {
  constructor() {
    super();

    this.state = {
      isHidden: true,
    };

    this.linkClick = this.linkClick.bind(this);
  }

  linkClick(e) {
    e.preventDefault();
    const location = e.target.href;

    // TODO: After updating the browser history the page is scrolled up and we
    // may show ourself again as a result of that scroll. We don't want to do
    // this. The net effect is to hide the nav bar, scroll up, navigate to a new
    // page and show it again. We do not want to show it again. To resolve this
    // if seems like an ignoreScroll flag should be set when a link is clicked
    // and then that flat should be cleared when the page navigation completes.

    this.setState({
      isHidden: true,
    }, () => window.setTimeout(() => {
      browserHistory.push(location);
    }, 250));
  }

  scroll() {
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
