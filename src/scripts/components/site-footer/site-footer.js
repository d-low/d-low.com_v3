import React from 'react';
import styles from './site-footer.css';

class SiteFooter extends React.Component {
  constructor() {
    super();

    // TBD: Should this be state or props or something else?
    this.state = {
      footerLinks: [
        {
          anchor: {
            className: styles.listItemLink,
            href: 'mailto:info@d-low.com',
            title: 'Send me an email',
          },
          iconClassName: styles.iconMail,
          name: 'email',
        },
        {
          anchor: {
            className: styles.listItemLink,
            href: 'https://www.facebook.com/mike.dilorenzo.3',
            target: '_blank',
            title: 'Friend me on Facebook',
          },
          iconClassName: styles.iconFacebook,
          name: 'facebook',
        },
        {
          anchor: {
            className: styles.listItemLink,
            href: 'https://github.com/d-low',
            target: '_blank',
            title: 'Check out my codes on Github',
          },
          iconClassName: styles.iconGitHub,
          name: 'github',
        },
        {
          anchor: {
            className: styles.listItemLink,
            href: 'http://www.linkedin.com/pub/mike-dilorenzo/7/b76/14b',
            target: '_blank',
            title: 'Connect with me on LinkedIn',
          },
          iconClassName: styles.iconLinkedIn,
          name: 'linkedin',
        },
        {
          anchor: {
            className: styles.listItemLink,
            href: 'http://twitter.com/dlow',
            target: '_blank',
            title: 'Follow my infrequent Tweets',
          },
          iconClassName: styles.iconTwitter,
          name: 'twitter',
        },
      ],
    };
  }

  render() {
    const footerListItems = this.state.footerLinks.map(footerLink =>
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
      /* beautify ignore:start */
      <footer className={styles.container}>
        <nav className={styles.listItemNav}>
          <ul>
            {footerListItems}
          </ul>
        </nav>
      </footer>
      /* beautify ignore:end */
    );
  }
}

export default SiteFooter;
