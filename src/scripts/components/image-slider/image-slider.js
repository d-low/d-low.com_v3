import React from 'react';
import Hammer from 'react-hammerjs';
import FadeInBackgroundImage from '../fade-in-background-image/fade-in-background-image.js';
import styles from './image-slider.css';

/**
 * @description Image slider React component based on Gilbert Pellegrom's Ideal
 * Image Slider. Note that we use hammer.js to detect touch gestures, rather
 * than wiring that up ourself. We also use our own staggered animations to
 * fade in the smoke and slide down the image when showing the image slider and
 * to slide up the image and fade out the smoke when hiding the image slider.
 * While they do use timeouts in the JS that correspond to transition delays
 * and timings in the CSS, the desired staggered animations just didn't seem
 * possible using React Transition Group.
 * @see https://github.com/Codeinwp/Ideal-Image-Slider-JS
 * @todo Convert this back to a pure component since all state is now being
 * handled by the parent component.
 */
class ImageSlider extends React.Component {
  constructor(props) {
    super(props);

    // Keep track of which images have been loaded and are visible
    this.imageVisible = [];
    this.props.images.forEach(() => this.imageVisible.push(false));

    // Member variables used for image navigation
    this.state = {
      currentImage: this.props.currentImage,
      deltaX: null,
      isNavigating: false,
    };

    // Bound event handlers
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handlePan = this.handlePan.bind(this);
    this.handlePanEnd = this.handlePanEnd.bind(this);
    this.nextNavClick = this.nextNavClick.bind(this);
    this.prevNavClick = this.prevNavClick.bind(this);
    this.closeSlider = this.closeSlider.bind(this);

    // Refs
    this.container = null;
    this.items = null;
    this.item = [];

    // Flag used to indicate that the keyup event handler is already bound so
    // we avoid binding it over and over again.
    this.keyupBound = false;

    // Keep track of the translate X value of the items so that the proper item
    // is slid into view.
    this.translateX = '0';
  }

  /**
   * When the parent component passes properties to the image slider the
   * current image it passes may not be the same as what the image slider has.
   * So prior to receiving properties we reset our current image when receiving
   * a new one.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentImage !== this.state.currentImage) {
      this.setState({
        currentImage: nextProps.currentImage,
      });
      this.preloadImages(nextProps.currentImage);
      this.setTranslateX(nextProps.currentImage);
    }
  }

  /**
   * Prior to updating we preload images and/or set the new translate X value.
   * There are four handled cases:
   *
   * 1) Navigating to a new image after a swipe
   * 2) Navigating to a new image after a click on a nav button or arrow key
   * 3) Panning to view image but not a swipe to view a new one
   * 4) Finishing panning to view image and not navigating to a new one
   */
  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentImage !== this.state.currentImage &&
        !nextState.deltaX && this.state.deltaX) {
      this.preloadImages(nextState.currentImage);
      this.setTranslateX(nextState.currentImage, nextState.deltaX);
    } else if (nextState.currentImage !== this.state.currentImage) {
      this.preloadImages(nextState.currentImage);
      this.setTranslateX(nextState.currentImage);
    } else if (nextState.deltaX && nextState.deltaX !== this.state.deltaX) {
      this.setTranslateX(undefined, nextState.deltaX);
    } else if (!nextState.deltaX && this.state.deltaX) {
      this.setTranslateX(nextState.currentImage, null);
    }
  }

  /**
   * @description After rendering, if the component is visible, the add an
   * event listener for the keyup event on the document to handle keyboard
   * navigation, if we haven't already done so. And similarly, remove the keyup
   * event handler when the component is no longer visible if we've added one.
   */
  componentDidUpdate() {
    if (this.props.visible && !this.keyupBound) {
      this.keyupBound = true;
      document.addEventListener('keyup', this.handleKeyUp);
    } else if (!this.props.visible && this.keyupBound) {
      this.keyupBound = false;
      document.removeEventListener('keyup', this.handleKeyUp);
    }
  }

  /**
   * @description Set the translateX position of the items based on the index
   * of the image being shown and an optional delta X parameter set when
   * panning. Note that if we don't have a ref to each of the items yet, then
   * we have to hard code knowlege of our CSS here to set the left margin,
   * which is a bit of a hack, but only done for the first render.
   */
  setTranslateX(currentImage = this.state.currentImage, deltaX = this.state.deltaX) {
    let marginLeft = null;

    if (this.item.length && this.item[currentImage]) {
      marginLeft = currentImage * parseInt(
        window.getComputedStyle(this.item[currentImage]).marginLeft,
        10,
      );

      if (marginLeft > 0) {
        marginLeft = `${marginLeft}px`;
      }
    } else if (window.innerWidth < 768 && currentImage > 0) {
      marginLeft = `${currentImage * 2}rem`;
    }

    // We omit the margin left and use of calc if there is none as that appears
    // to be an invalid style and doesn't get rendered!
    if (marginLeft && typeof deltaX === 'number') {
      this.translateX = `calc(${currentImage * -100}vw - ${marginLeft} + ${deltaX}px)`;
    } else if (marginLeft) {
      this.translateX = `calc(${currentImage * -100}vw - ${marginLeft})`;
    } else {
      this.translateX = `${currentImage * -100}vw`;
    }
  }

  preloadImages(currentImage = this.state.currentImage) {
    this.imageVisible[currentImage] = true;

    if (currentImage + 1 < this.props.images.length) {
      this.imageVisible[currentImage + 1] = true;
    } else {
      this.imageVisible[0] = true;
    }

    if (currentImage - 1 >= 0) {
      this.imageVisible[currentImage - 1] = true;
    } else {
      this.imageVisible[this.props.images.length - 1] = true;
    }
  }

  /**
   * @todo Resolve the following panning issues:
   *
   * 1) Display a notification, of sorts, when the user tries to pan before the
   *    first image or after the last. This is seen in both Facebook and Google
   *    Photos.
   * 2) Prevent scrolling on the main page when the image slider is displayed.
   *    While not related to panning, per se, the main page can be scrolled
   *    the image slider is visible.
   */
  handlePan(e) {
    this.setState({
      deltaX: e.deltaX,
      isNavigating: false,
    });
  }

  /**
   * If the pan velocity and distance are greater great enough to be considered
   * a swipe, using HammerJS's Swipe thresholds, then navigate to the next or
   * previous image.
   * @see https://github.com/hammerjs/hammer.js/blob/master/src/recognizers/swipe.js#L11
   */
  handlePanEnd(e) {
    if (Math.abs(e.velocityX) >= window.Hammer.Swipe.prototype.defaults.velocity &&
        Math.abs(e.distance) >= window.Hammer.Swipe.prototype.defaults.threshold) {
      if (e.direction === window.Hammer.DIRECTION_LEFT) {
        this.nextImage();
      } else if (e.direction === window.Hammer.DIRECTION_RIGHT) {
        this.prevImage();
      }
    } else {
      this.setState({
        deltaX: null,
        isNavigating: true,
      });
    }
  }

  /**
   * @todo Ensure that key and keyCode work in all browsers! They should, as
   * key is new and keyCode is old and deprecated.
   */
  handleKeyUp(e) {
    if (e.key === 'ArrowLeft' || e.keyCode === 37) {
      this.prevImage();
    } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
      this.nextImage();
    } else if (e.key === 'Escape' || e.keyCode === 27) {
      this.closeSlider();
    }
  }

  nextNavClick(e) {
    e.preventDefault();
    this.nextImage();
  }

  prevNavClick(e) {
    e.preventDefault();
    this.prevImage();
  }

  closeSlider() {
    window.setTimeout(() => {
      this.setState({
        deltaX: null,
        isNavigating: false,
      });
      this.props.onCloseImageSlider();
    }, 700);

    this.container.classList.add(styles.containerHiding);
    this.items.classList.add(styles.itemsHiding);
  }

  nextImage() {
    if (this.state.currentImage < this.props.images.length - 1) {
      this.setState({
        currentImage: this.state.currentImage + 1,
        deltaX: null,
        isNavigating: true,
      });
    } else {
      this.setState({
        currentImage: 0,
        deltaX: null,
        isNavigating: true,
      });
    }
  }

  prevImage() {
    if (this.state.currentImage - 1 >= 0) {
      this.setState({
        currentImage: this.state.currentImage - 1,
        deltaX: null,
        isNavigating: true,
      });
    } else {
      this.setState({
        currentImage: this.props.images.length - 1,
        deltaX: null,
        isNavigating: true,
      });
    }
  }

  render() {
    if (!this.props.visible) {
      return null;
    }

    // Set a timeout to show the container if we don't yet have a reference to
    // it which is the case when we initially render the image slider. On later
    // renders, when the container and items are already visible, this is no
    // longer necessary.
    if (!this.container) {
      window.setTimeout(() => {
        this.container.classList.add(styles.containerShowing);
        this.items.classList.add(styles.itemsShowing);
      }, 0);
    }

    let itemsClassName = styles.items;

    if (this.container) {
      itemsClassName = `${itemsClassName} ${styles.itemsShowing}`;
    }
    if (this.state.isNavigating) {
      itemsClassName = `${itemsClassName} ${styles.itemsNavigating}`;
    }

    const listItems = this.props.images.map((image, index) =>
      <li
        className={styles.item}
        key={image.href}
        ref={(el) => { this.item[index] = el; }}>
        <FadeInBackgroundImage
          backgroundColor={this.props.backgroundColor}
          backgroundImage={image.href}
          className={styles.image}
          fadeInNow={this.imageVisible[index]}>
          <span className={styles.caption}>
            {`${image.caption} - ${index + 1} of ${this.props.images.length}`}
          </span>
        </FadeInBackgroundImage>
      </li>,
    );

    return (
      <div
        className={styles.container}
        ref={(el) => { this.container = el; }} >
        <button className={styles.closeButton} onClick={this.closeSlider}>
          <span className={styles.closeButtonText}>+</span>
        </button>
        <div className={styles.itemsWrapper}>
          <Hammer
            onPan={this.handlePan}
            onPanEnd={this.handlePanEnd}>
            <ul
              className={itemsClassName}
              ref={(el) => { this.items = el; }}
              style={{ transform: `translateX(${this.translateX})` }}>
              {listItems}
            </ul>
          </Hammer>
          <button className={styles.prevNavButton} onClick={this.prevNavClick}>
            <span className={styles.prevNavButtonArrow} />
          </button>
          <button className={styles.nextNavButton} onClick={this.nextNavClick}>
            <span className={styles.nextNavButtonArrow} />
          </button>
        </div>
      </div>
    );
  }
}

ImageSlider.propTypes = {
  backgroundColor: React.PropTypes.string,
  currentImage: React.PropTypes.number,
  images: React.PropTypes.arrayOf(React.PropTypes.shape({
    caption: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
  })).isRequired,
  onCloseImageSlider: React.PropTypes.func.isRequired,
  visible: React.PropTypes.bool,
};

ImageSlider.defaultProps = {
  backgroundColor: 'white',
  currentImage: 0,
  visible: false,
};

export default ImageSlider;
