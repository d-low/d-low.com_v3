import React from 'react';
import styles from './tile-navigation.css';

class TileNavigation extends React.PureComponent {
  render() {
    let itemClassName = styles.item;

    if (this.props.isHomePage) {
      itemClassName = styles.itemHomePage;
    }

    const listItems = this.props.links.map(link =>
      <li className={itemClassName} key={link.name}>
        <a className={styles.itemLink} href={link.href} title={link.text}>
          <figure
            className={styles.itemImage}
            style={{ backgroundImage: `url(${link.image})` }} />
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
