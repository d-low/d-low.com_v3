import React from 'react';
import styles from './site-content.css';

class SiteContent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className={styles.container}>
        { this.props.children }
      </section>
    );
  }
}

export default SiteContent;