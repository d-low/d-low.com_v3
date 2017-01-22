import React from 'react';
import FadeInBackgroundImage from '../fade-in-background-image/fade-in-background-image.js';
import scrollEventsHandler from '../scroll-events-handler/scroll-events-handler.js';
import styles from './site-header.css';

/**
 * @description The SiteHeader class renders and provides behavior for the site
 * header component on all pages of the site. It uses the FadeInBackgroundImage
 * component to fade in the hero image. It also uses the scrollEventsHandler
 * higher order component for responding to scroll events. As the page scrolls
 * the logo will be faded out and eventually hidden.
 * @todo Add proper rendering and markup for other pages on site.
 */
class SiteHeader extends React.Component {
  constructor() {
    super();

    this.didScroll = false;
    this.scrollInterval = null;
    this.scrollStopTimeout = null;

    this.checkIfScrolled = this.checkIfScrolled.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollStop = this.handleScrollStop.bind(this);
  }

  componentDidMount() {
    this.setLogoOpacity();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * @todo Should we use state to set the opacity and display? Or is it better
   * to use DOM methods for this.
   */
  setLogoOpacity() {
    const logoHeight = parseInt(window.getComputedStyle(this.logo).height, 10);
    let opacity = Number(1 - (window.pageYOffset / (window.innerHeight - logoHeight))).toFixed(2);

    opacity = opacity < 0 ? 0 : opacity;
    this.logo.style.opacity = opacity;

    // The logo needs to be hidden (dislay: none) when it is no longer visible,
    // when content below it has been scrolled into view, so that it doesn't
    // sit on top of now visible content preventing the user from interacting
    // with it.

    if (opacity === 0) {
      this.logo.style.display = 'none';
    } else {
      this.logo.style.display = 'block';
    }
  }

  /**
   * @description The scrollEventsHandler() higher order component will call
   * this method on its base class when a scroll event happens. So when one
   * occurs we set our logo opacity
   */
  scroll() {
    window.requestAnimationFrame(this.setLogoOpacity.bind(this));
  }

  render() {
    // TODO: Modify HTML to not display image when on home page.
    return (
      <header className={styles.siteHeaderHomePage}>
        <FadeInBackgroundImage className={styles.imageHomePage} fadeInNow />
        <div className={styles.logo} ref={(el) => { this.logo = el; }}>
          <h1 className={styles.logoBigText}>
            d-low.com
          </h1>
          <small className={styles.logoSmallText}>
            Words and photos by Mike DiLorenzo
          </small>
        </div>
      </header>
    );
  }
}

export default scrollEventsHandler(SiteHeader);
