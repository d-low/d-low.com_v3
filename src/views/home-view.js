import React from 'react';
import HomeSiteContent from '../components/home-site-content';
import SiteHeader from '../components/site-header';
import SiteContent from '../components/site-content';
import SiteFooter from '../components/site-footer';

class HomeView extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      /* beautify ignore:start */
      <div className="main-view">
        <SiteHeader></SiteHeader>
        <SiteContent>
          <HomeSiteContent></HomeSiteContent>
        </SiteContent>
        <SiteFooter></SiteFooter>
      </div>
      /* beautify ignore:end */
    );
  }
}

export default HomeView;