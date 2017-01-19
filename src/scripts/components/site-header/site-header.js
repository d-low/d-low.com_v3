import React from 'react';
import FadeInBackgroundImage from '../fade-in-background-image/fade-in-background-image.js';
import styles from './site-header.css';

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

    // When the logo is fixed on larger screens then we want to fade it out
    // when the site header is scrolled out of view.
    if (window.getComputedStyle(this.logo).position === 'fixed') {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

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

  handleScroll() {
    this.didScroll = true;

    if (!this.scrollInterval) {
      this.checkIfScrolled();
      this.scrollInterval = window.setInterval(this.checkIfScrolled, 16);
    }
  }

  handleScrollStop() {
    window.clearInterval(this.scrollInterval);
    this.scrollInterval = null;
  }

  checkIfScrolled() {
    if (this.didScroll) {
      window.requestAnimationFrame(this.setLogoOpacity.bind(this));
      window.clearTimeout(this.scrollStopTimeout);
      this.scrollStopTimeout = window.setTimeout(this.handleScrollStop, 100);

      this.didScroll = false;
    }
  }

  render() {
    // TODO: Modify HTML to not display image when on home page.
    return (
      <header className={styles.siteHeaderHomePage}>
        <FadeInBackgroundImage className={styles.imageHomePage} />
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

export default SiteHeader;
