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

    this.imageVisible = [];
    this.props.images.forEach(() => this.imageVisible.push(false));

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.nextNavClick = this.nextNavClick.bind(this);
    this.prevNavClick = this.prevNavClick.bind(this);
    this.closeSlider = this.closeSlider.bind(this);
  }

  // /**
  //  * @todo
  //  * 1) If visible then load the current, previous and next images
  //  * 2) Then show the slider
  //  */
  // componentDidMount() {
  //   if (this.props.visible) {
  //   }
  // }

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
    }
  }
  /**
   * @description After rendering, if the component is visible, the add an
   * event listener for the keyup event on the document to handle keyboard
   * navigation.
   * @todo When transitioning from hidden to visible fade in the smoke and then
   * slide down the current image. Will we ues React transition groups for this?
   * @see https://facebook.github.io/react/docs/animation.html
   */
  componentDidUpdate() {
    if (this.props.visible) {
      document.addEventListener('keyup', this.handleKeyUp);
    } else {
      document.removeEventListener('keyup', this.handleKeyUp);
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
    if (e.direction === 2 && this.props.currentImage + 1 < this.props.images.length - 1) {
      this.nextImage();
    } else if (e.direction === 4 && this.props.currentImage - 1 >= 0) {
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
    if (this.props.visible) {
      window.setTimeout(() => {
        this.container.classList.add(styles.containerShowing);
        this.items.classList.add(styles.itemsShowing);
      }, 0);
    } else {
      return null;
    }
    const listItems = this.props.images.map((image, index) =>
      <li className={styles.item} key={image.href}>
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
        <button className={styles.prevNavButton} onClick={this.prevNavClick} />
        <button className={styles.nextNavButton} onClick={this.nextNavClick} />
        <button className={styles.closeButton} onClick={this.closeSlider}>
          <span className={styles.closeButtonText}>+</span>
        </button>
        <Hammer onSwipe={this.handleSwipe}>
          <ul
            className={styles.items}
            ref={(el) => { this.items = el; }}
            style={{ transform: `translateX(${this.props.currentImage * -100}vw)` }}>
            {listItems}
          </ul>
        </Hammer>
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

