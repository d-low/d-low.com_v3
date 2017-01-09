import React from 'react';
import styles from './site-content.css';

class SiteContent extends React.Component {
  constructor() {
    super();
  }

  render() {
    let className = styles.container;

    if (this.props.isHomePageNav) {
      className = styles.containerHomePageNav;
    }
    else {
      className = styles.container;
    }

    return (
      <section className={className}>
        { this.props.children }
      </section>
    );
  }
}

export default SiteContent;