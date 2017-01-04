import React from 'react';
import styles from './site-header.css';

class SiteHeader extends React.Component {
  constructor() {
    super();
  }

  render() {
    // TODO: When not on the home page then use siteHeaderContentPage and
    // logoContentPage

    return (  
      <header className={styles.siteHeaderHomePage}>
        <div className={styles.logo}>
          <h1 className={styles.logoBigText}>
            d-low.com
          </h1>
          <small className={styles.logoSmallText}>
            Words and photos by Mike DiLorenzo
          </small>
        </div>
      </header>
    );
  }
}

export default SiteHeader;