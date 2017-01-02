import React from 'react';
import '../../styles/modules/site-header';

class SiteHeader extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (  
      <header className="site-header">
        <div className="site-header-logo clearfix">
          <h1>d-low.com</h1>
          <small>Words and photos by Mike DiLorenzo</small>
        </div>
      </header>
    );
  }
}

export default SiteHeader;