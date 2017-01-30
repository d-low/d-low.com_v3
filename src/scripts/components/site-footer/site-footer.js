import React from 'react';
import iconStyles from '../../../styles/base/icons/icons.css';
import styles from './site-footer.css';

class SiteFooter extends React.Component {
  constructor() {
    super();

    this.footerLinks = [{
      anchor: {
        className: styles.listItemLink,
        href: 'mailto:info@d-low.com',
        title: 'Send me an email',
      },
      iconClassName: iconStyles.iconMail,
      name: 'email',
    }, {
      anchor: {
        className: styles.listItemLink,
        href: 'https://www.facebook.com/mike.dilorenzo.3',
        rel: 'noopener noreferrer',
        target: '_blank',
        title: 'Friend me on Facebook',
      },
      iconClassName: iconStyles.iconFacebook,
      name: 'facebook',
    }, {
      anchor: {
        className: styles.listItemLink,
        href: 'https://github.com/d-low',
        rel: 'noopener noreferrer',
        target: '_blank',
        title: 'Check out my codes on Github',
      },
      iconClassName: iconStyles.iconGitHub,
      name: 'github',
    }, {
      anchor: {
        className: styles.listItemLink,
        href: 'http://www.linkedin.com/pub/mike-dilorenzo/7/b76/14b',
        rel: 'noopener noreferrer',
        target: '_blank',
        title: 'Connect with me on LinkedIn',
      },
      iconClassName: iconStyles.iconLinkedIn,
      name: 'linkedin',
    }, {
      anchor: {
        className: styles.listItemLink,
        href: 'http://twitter.com/dlow',
        rel: 'noopener noreferrer',
        target: '_blank',
        title: 'Follow my infrequent Tweets',
      },
      iconClassName: iconStyles.iconTwitter,
      name: 'twitter',
    }];
  }

  render() {
    const footerListItems = this.footerLinks.map(footerLink =>
      <li className={styles.listItem} key={footerLink.name}>
        <a {...footerLink.anchor}>
          <i className={footerLink.iconClassName} />
          <span className={styles.listItemText}>
            {footerLink.anchor.title}
          </span>
        </a>
      </li>,
    );

    return (
      <footer className={styles.container}>
        <nav className={styles.listItemNav}>
          <ul>
            {footerListItems}
          </ul>
        </nav>
      </footer>
    );
  }
}

export default SiteFooter;
