import React from 'react';
import SiteHeaderNavigation from './site-header-navigation';
import heroImage from '../../images/wendy-descending-saddle-between-watrous-and-woods-large.jpg';

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
          <img src={heroImage} style={{height: '100vw', width: '100vw'}} />
        </div>
        <SiteHeaderNavigation></SiteHeaderNavigation>
      </header>
    );
  }
}

export default SiteHeader;