import React from 'react';
import FadeInBackgroundImageWhenVisible from '../fade-in-background-image-when-visible.js';
import styles from './tile-navigation.css';

class TileNavigation extends React.PureComponent {
  render() {
    let itemClassName = styles.item;
    let itemTitleClassName = styles.itemTitle;

    if (this.props.isContentPage) {
      itemClassName = styles.itemContentPage;
    } else if (this.props.isHomePage) {
      itemClassName = styles.itemHomePage;
      itemTitleClassName = styles.itemTitleHomePage;
    }

    const listItems = this.props.links.map(link =>
      <li className={itemClassName} key={link.name}>
        <a className={styles.itemLink} href={link.href} title={link.name}>
          <FadeInBackgroundImageWhenVisible
            backgroundImage={link.image}
            className={styles.itemImage}
            fadeInNow={false} />
          <span className={itemTitleClassName}>
            {link.name.replace(/^\d\d-/, '').replace(/[-_]/g, ' ')}
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
  isContentPage: React.PropTypes.bool,
  isHomePage: React.PropTypes.bool,
};

TileNavigation.defaultProps = {
  isContentPage: false,
  isHomePage: false,
};

export default TileNavigation;
