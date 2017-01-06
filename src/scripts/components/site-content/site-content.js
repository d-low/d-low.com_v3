import React from 'react';
import styles from './site-content.css';

class SiteContent extends React.Component {
  constructor() {
    super();
  }

  render() {
    let className = styles.container;

    if (this.props.isHomePage) {
      className = styles.containerHomePageNav;
    }

    return (
      <section className={className}>
        { this.props.children }
      </section>
    );
  }
}

export default SiteContent;