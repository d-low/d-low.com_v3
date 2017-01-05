import React from 'react';
import styles from './tile-navigation.css';

class TileNavigation extends React.Component {
  constructor() {
    super();
  }

  render() {
    const listItems = this.props.links.map((link) =>
      <li className={styles.item} key={link.name}>
        <a className={styles.itemLink} href={link.href} title={link.text}>
          <figure className={styles.itemImage} 
                  style={{ backgroundImage: 'url(' + link.image + ')' }} />
          <span className={styles.itemTitle}> 
            {link.name} 
          </span> 
        </a> 
      </li>
    );

    return (
      <div>
        <nav>
          <ul>
            {listItems} 
          </ul>
        </nav>
      </div>
    );
  }
}

export default TileNavigation;