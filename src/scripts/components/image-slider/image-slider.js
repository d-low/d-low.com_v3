/* eslint no-console: 0, class-methods-use-this: 0 */

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
      isPanning: false,
    };

    // Bound event handlers
    this.handleKeyUp = this.handleKeyUp.bind(this);
    // this.handlePan = this.handlePan.bind(this);
    // this.handlePanEnd = this.handlePanEnd.bind(this);
    // this.handlePanStart = this.handlePanStart.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
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
   * Prior to updating if the current image in the next state isn't the same as
   * our current state then we preload images and set the translate X value for
   * the next state.
   */
  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentImage !== this.state.currentImage) {
      this.preloadImages(nextState.currentImage);
      this.setTranslateX(nextState.currentImage);
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
   * of the image being shown. Note that if we don't have a ref to each of the
   * items yet, then we have to hard code knowlege of our CSS here to set the
   * left margin, which is a bit of a hack, but only done for the first render.
   * @param deltaX Optional delta X parameter used when panning to move the
   * current image as the user drags it
   */
  setTranslateX(currentImage = this.state.currentImage, deltaX) {
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

  setItemsTransform(deltaX) {
    window.requestAnimationFrame(() => {
      this.setTranslateX(deltaX);
      this.items.setAttribute('style', `transform: translateX(${this.translateX})`);
    });
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
   * 0) To pan properly we likely need to set a raw translate X value and then
   *    use that when rendering. In this manner we can just add/remove the pan
   *    delta X to the current image offset. We will no longer save the current
   *    image as a state parameter, but rather as a private variable, that is
   *    used only for internal calculations.
   * 1) deltaX not removed when navigating to next/prev image when panning ends.
   *    This will likely be resolved in #0 above.
   * 2) Swipe events don't work well that we're handling pan events. We likely
   *    need to handle only pan events and replicate the veolicy and timing
   *    logic from HammerJS to determine when a pan is actually a swipe.
   * 3) The image may be shown prematurely after closing the image slider after
   *    panning and then reopening it. This is because we need to reset
   *    state.isPanning after closing the image slider.
   * 4) Not related to panning, per se, but dragging/scrolling up/down when the
   *    image slider is displayed causes the main page to scroll up/down. The
   *    main page should scroll in this situation.
   */
  handlePan(e) {
    this.setItemsTransform(e.deltaX);
  }

  handlePanEnd(e) {
    this.setState({ isPanning: false }, () => {
      const halfWindowWidth = window.outerWidth / 2;

      if (e.distance >= halfWindowWidth) {
        if (e.direction === 2) {
          this.nextImage();
        } else if (e.direction === 4) {
          this.prevImage();
        }
      } else {
        this.setItemsTransform();
      }
    });
  }

  handlePanStart() {
    this.setState({ isPanning: true });
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

  /**
   * @todo Note that the Hammer.DIRECTION_LEFT and Hammer.DIRECTION_RIGHT
   * constants are not available on the React Hammer component so we've hard
   * coded their values, 2 and 4, here.
   */
  handleSwipe(e) {
    if (e.direction === 2) {
      this.nextImage();
    } else if (e.direction === 4) {
      this.prevImage();
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
    window.setTimeout(() => this.props.onCloseImageSlider(), 700);
    this.container.classList.add(styles.containerHiding);
    this.items.classList.add(styles.itemsHiding);
  }

  nextImage() {
    if (this.state.currentImage < this.props.images.length - 1) {
      this.setState({
        currentImage: this.state.currentImage + 1,
      });
    } else {
      this.setState({
        currentImage: 0,
      });
    }
  }

  prevImage() {
    if (this.state.currentImage - 1 >= 0) {
      this.setState({
        currentImage: this.state.currentImage - 1,
      });
    } else {
      this.setState({
        currentImage: this.props.images.length - 1,
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
    if (this.state.isPanning) {
      itemsClassName = `${itemsClassName} ${styles.itemsPanning}`;
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
            // onPan={this.handlePan}
            // onPanEnd={this.handlePanEnd}
            // onPanStart={this.handlePanStart}
            onSwipe={this.handleSwipe}>
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
