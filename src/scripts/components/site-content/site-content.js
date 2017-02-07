import React from 'react';
import styles from './site-content.css';

const SiteContent = function SiteContent(props) {
  let className = styles.container;

  if (props.isHomePageNav) {
    className = styles.containerHomePageNav;
  }

  return (
    <section className={className}>
      {props.title &&
        <h2 className={styles.title}>{ props.title }</h2>
      }
      {props.children }
    </section>
  );
};

SiteContent.propTypes = {
  children: React.PropTypes.node.isRequired,
  isHomePageNav: React.PropTypes.bool,
  title: React.PropTypes.string,
};

SiteContent.defaultProps = {
  isHomePageNav: false,
  title: '',
};

export default SiteContent;
