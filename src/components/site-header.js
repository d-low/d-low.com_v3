import React from 'react';
import SiteHeaderNavigation from './site-header-navigation';

class SiteHeader extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      /* beautify ignore:start */
      <header className="site-header">
        <div className="site-header-logo clearfix">
          <h1>d-low.com</h1>
          <small>Words and photos by Mike DiLorenzo</small>
        </div>
        <SiteHeaderNavigation></SiteHeaderNavigation>
      </header>
      /* beautify ignore:start */
    );
  }
}

export default SiteHeader;
