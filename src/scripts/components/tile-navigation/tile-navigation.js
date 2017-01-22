import React from 'react';
import FadeInBackgroundImage from '../fade-in-background-image/fade-in-background-image.js';
import scrollEventsHandler from '../scroll-events-handler/scroll-events-handler.js';
import styles from './tile-navigation.css';

const FadeInBackgroundImageWhenVisible = scrollEventsHandler(FadeInBackgroundImage);

class TileNavigation extends React.PureComponent {
  render() {
    let itemClassName = styles.item;

    if (this.props.isHomePage) {
      itemClassName = styles.itemHomePage;
    }

    const listItems = this.props.links.map(link =>
      <li className={itemClassName} key={link.name}>
        <a className={styles.itemLink} href={link.href} title={link.text}>
          <FadeInBackgroundImageWhenVisible
            backgroundImage={link.image}
            className={styles.itemImage}
            fadeInNow={false} />
          <span className={styles.itemTitle}>
            <span>
              {link.name.replace(/^\d\d-/, '').replace(/[-_]/g, ' ')}
            </span>
          </span>
        </a>
      </li>,
    );

    return (
      <div>
        <nav>
          <ul className={this.props.isHomePage ? styles.homePageItems : ''}>
            {listItems}
          </ul>
        </nav>
      </div>
    );
  }
}

TileNavigation.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  isHomePage: React.PropTypes.bool,
};

TileNavigation.defaultProps = {
  isHomePage: false,
};

export default TileNavigation;
