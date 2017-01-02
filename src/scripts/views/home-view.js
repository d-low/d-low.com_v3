import React from 'react';
import HomeSiteContent from '../components/home-site-content';
import SiteHeader from '../components/site-header';
import SiteHeaderNavigation from '../components/site-header-navigation';
import SiteContent from '../components/site-content';
import SiteFooter from '../components/site-footer';

class HomeView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    document.body.classList.toggle('home');
  }

  render() {
    return (
      /* beautify ignore:start */
      <div className="main-view">
        <SiteHeader></SiteHeader>
        <SiteContent>
          <SiteHeaderNavigation></SiteHeaderNavigation>
          <HomeSiteContent></HomeSiteContent>
        </SiteContent>
        <SiteFooter></SiteFooter>
      </div>
      /* beautify ignore:end */
    );
  }
}

export default HomeView;