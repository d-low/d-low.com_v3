import React from 'react';

class SiteFooter extends React.Component {
  constructor() {
    super();

    this.state = {
      footerLinks: [{
        anchor: {
          className: 'mail',
          href: 'mailto:info@d-low.com',
          title: 'Send me an email'
        },
        iconClassName: 'icon-mail3',
        name: 'email',
        text: 'Send me an email'
      }, {
        anchor: {
          className: 'facebook',
          href: 'https://www.facebook.com/mike.dilorenzo.3',
          target: '_blank'
        },
        iconClassName: 'icon-facebook2',
        name: 'facebook',
        text: 'Friend me on Facebook'
      }, {
        anchor: {
          className: 'github',
          href: 'https://github.com/d-low',
          target: '_blank',
        },
        iconClassName: 'icon-github2',
        name: 'github',
        text: 'Check out my codes on Github'
      }, {
        anchor: {
          className: 'linkedin',
          href: 'http://www.linkedin.com/pub/mike-dilorenzo/7/b76/14b',
          target: '_blank'
        },
        iconClassName: 'icon-linkedin',
        name: 'linkedin',
        text: 'Connect with me on LinkedIn'
      }, {
        anchor: {
          className: 'twitter',
          href: 'http://twitter.com/dlow',
          target: '_blank'
        },
        iconClassName: 'icon-twitter2',
        name: 'twitter',
        text: 'Follow my infrequent Tweets'
      }]
    };
  }

  render() {
    const footerListItems = this.state.footerLinks.map((footerLink) =>
      /* beautify ignore:start */
      <li key={footerLink.name}>
        <a className={"webicon " + footerLink.anchor.className} 
          href={footerLink.anchor.href}
          target={footerLink.anchor.target}
          title={footerLink.text}>
          <i className={"icon " + footerLink.iconClassName}></i> 
          <span> 
            {footerLink.text} 
          </span> 
        </a> 
      </li>
      /* beautify ignore:end */
    );

    return (
      /* beautify ignore:start */
      <footer className="site-footer js-site-footer">
        <nav>
          <ul className="list-inline"> 
            {footerListItems} 
          </ul> 
        </nav>
      </footer>
      /* beautify ignore:end */
    );
  }
}

export default SiteFooter;