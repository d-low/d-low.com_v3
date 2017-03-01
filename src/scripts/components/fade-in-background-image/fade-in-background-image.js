import imagesloaded from 'imagesloaded';
import React from 'react';
import styles from './fade-in-background-image.css';

/**
 * @description This component will load its background image and then fade it
 * in once loaded. This will be done immediately if fadeInNow is set to true.
 * Or when our element is scrolled into view. This component should be wrapped
 * by the scrollEventsHandler higher order component when fading in elements
 * when scrolled into view. If the backgroundImage parameter is specified then
 * add that as an inline style when loading the image. Otherwise pass a CSS
 * class name that sets a background iamge.
 * @param backgroundImage URL of background image to use if not specified in
 * classnames.
 * @className Class names of element. Should specify background image if the
 * backgroundImage parameter is not specified.
 * @param fadeInNow Load and then fade in the background image immediately.
 */
class FadeInBackgroundImage extends React.Component {
  constructor() {
    super();

    let myStyle = null;

    if (this.props && this.props.backgroundImage && this.props.fadeInNow) {
      myStyle = {
        backgroundImage: `url(${this.props.backgroundImage})`,
      };
    }

    this.state = {
      imageVisible: false,
      style: myStyle,
    };
  }

  componentDidMount() {
    if (this.props.fadeInNow || this.isElementInViewport()) {
      this.fadeInImage();
    }
  }

  fadeInImage() {
    // If we haven't yet set the inline style to specify the background image
    // and we have one, then set it now, and then fade in the background image
    // once the state has changed. Otherwise immediately fade in the background
    // image.

    const loadAndFadeInImage = () => {
      imagesloaded(this.element, { background: true }, () => {
        this.setState({ imageVisible: true });
      });
    };

    if (!this.state.style && this.props.backgroundImage) {
      const newState = {
        style: {
          backgroundImage: `url(${this.props.backgroundImage})`,
        },
      };

      this.setState(newState, loadAndFadeInImage);
    } else {
      loadAndFadeInImage();
    }
  }

  isElementInViewport() {
    const rect = this.element.getBoundingClientRect();
    return rect.top <= window.innerHeight;
  }

  /**
   * @todo Should we fade in images when scrolling instead of when scrolling
   * stops? Maybe this could depend on the scrolling speed? i.e. When scrolling
   * slow fade in the images while scrolling, but not when scrolling fast.
   */
  scrollStop() {
    // When animating scrolling to top before navigating to next page we may be
    // called after our element leaves the DOM due to scroll events being
    // throttled. In this case we just exit now to avoid rasing an error.
    if (!this.element) {
      return;
    }

    if (this.isElementInViewport()) {
      if (this.props.backgroundImage) {
        this.setState({
          style: {
            backgroundImage: `url(${this.props.backgroundImage})`,
          },
        });
      }
      this.fadeInImage();
      this.imageFadedIn = true;
    }
  }

  removeScrollEvents() {
    return !!this.imageFadedIn;
  }

  // TODO: Handle additional props using the ES6 spread operator!
  // SEE:
  // https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes
  // http://stackoverflow.com/questions/29979324/how-to-combine-multiple-inline-style-objects
  render() {
    let className = `${this.props.className}`;

    if (this.state.imageVisible) {
      className = `${className} ${styles.imageVisible}`;
    } else {
      className = `${className} ${styles.imageHidden}`;
    }

    return (
      <div
        className={className}
        style={this.state.style}
        ref={(el) => { this.element = el; }}>
        { this.props.children }
      </div>
    );
  }
}

FadeInBackgroundImage.propTypes = {
  backgroundImage: React.PropTypes.string,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  fadeInNow: React.PropTypes.bool,
};

FadeInBackgroundImage.defaultProps = {
  backgroundImage: '',
  children: null,
  className: '',
  fadeInNow: true,
};

export default FadeInBackgroundImage;
