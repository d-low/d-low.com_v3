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

    // Bound event handlers
    this.handleKeyUp = this.handleKeyUp.bind(this);
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
   * @description Prior to receiving new props and re-rendering we set the
   * current, previous and next images to be visible so that they will fade in.
   */
  componentWillUpdate(nextProps) {
    if (nextProps.visible) {
      this.imageVisible[nextProps.currentImage] = true;

      if (nextProps.currentImage + 1 < nextProps.images.length) {
        this.imageVisible[nextProps.currentImage + 1] = true;
      } else {
        this.imageVisible[0] = true;
      }

      if (nextProps.currentImage - 1 >= 0) {
        this.imageVisible[nextProps.currentImage - 1] = true;
      } else {
        this.imageVisible[nextProps.images.length - 1] = true;
      }

      this.setTranslateX(nextProps.currentImage);
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
   * of the image being showm. Note that if we don't have a ref to each of the
   * items yet, then we have to hard code knowlege of our CSS here to set the
   * left margin, which is a bit of a hack, but only done for the first render.
   */
  setTranslateX(imageIndex) {
    let marginLeft = null;

    if (this.item.length && this.item[imageIndex]) {
      marginLeft = imageIndex * parseInt(
        window.getComputedStyle(this.item[imageIndex]).marginLeft,
        10,
      );

      if (marginLeft > 0) {
        marginLeft = `${marginLeft}px`;
      }
    } else if (window.innerWidth < 768 && imageIndex > 0) {
      marginLeft = `${imageIndex * 2}rem`;
    }

    // We omit the margin left and use of calc if there is none as that appears
    // to be an invalid style and doesn't get rendered!
    if (marginLeft) {
      this.translateX = `calc(${imageIndex * -100}vw - ${marginLeft})`;
    } else {
      this.translateX = `${imageIndex * -100}vw`;
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
    if (this.props.currentImage < this.props.images.length - 1) {
      this.props.onChangeCurrentImage(this.props.currentImage + 1);
    } else {
      this.props.onChangeCurrentImage(0);
    }
  }

  prevImage() {
    if (this.props.currentImage - 1 >= 0) {
      this.props.onChangeCurrentImage(this.props.currentImage - 1);
    } else {
      this.props.onChangeCurrentImage(this.props.images.length - 1);
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

    const hasTouch = 'ontouchstart' in window;
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
        className={`${styles.container} ${hasTouch ? styles.hasTouch : ''}`}
        ref={(el) => { this.container = el; }} >
        <button className={styles.closeButton} onClick={this.closeSlider}>
          <span className={styles.closeButtonText}>+</span>
        </button>
        <div className={styles.itemsWrapper}>
          <Hammer onSwipe={this.handleSwipe}>
            <ul
              className={styles.items}
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
  onChangeCurrentImage: React.PropTypes.func.isRequired,
  onCloseImageSlider: React.PropTypes.func.isRequired,
  visible: React.PropTypes.bool,
};

ImageSlider.defaultProps = {
  backgroundColor: 'white',
  currentImage: 0,
  visible: false,
};

export default ImageSlider;

