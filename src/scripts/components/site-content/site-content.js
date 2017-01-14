import React from 'react';
import styles from './site-content.css';

const SiteContent = function SiteContent(props) {
  let className = styles.container;

  if (props.isHomePageNav) {
    className = styles.containerHomePageNav;
  } else {
    className = styles.container;
  }

  return (
    <section className={className}>
      {props.children }
    </section>
  );
};

SiteContent.propTypes = {
  children: React.PropTypes.node.isRequired,
  isHomePageNav: React.PropTypes.bool,
};

SiteContent.defaultProps = {
  isHomePageNav: false,
};

export default SiteContent;
