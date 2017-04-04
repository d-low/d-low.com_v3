import React from 'react';
import Hammer from 'react-hammerjs';
import styles from './image-slider.css';

/**
 * @description Image slider React component based on Gilbert Pellegrom's Ideal
 * Image Slider. Note that we use hammer.js to detect touch gestures, rather
 * than wiring that up ourself.
 * @see https://github.com/Codeinwp/Ideal-Image-Slider-JS
 * @todo Convert this back to a pure component since all state is now being
 * handled by the parent component.
 */
class ImageSlider extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.nextNavClick = this.nextNavClick.bind(this);
    this.prevNavClick = this.prevNavClick.bind(this);
  }

  // /**
  //  * TODO:
  //  * 1) If visible then load the current, previous and next images
  //  * 2) Then show the slider
  //  */
  // componentDidMount() {
  //   if (this.props.visible) {
  //   }
  // }

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
      this.props.onCloseImageSlider();
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
    const containerClassName = this.props.visible ? styles.containerVisible : styles.container;
    const listItems = this.props.images.map((image, index) =>
      <li className={styles.item} key={image.href}>
        <figure
          className={styles.image}
          data-image={image.href}
          style={{ backgroundImage: `url(${image.href})` }}>
          <figcaption className={styles.caption}>
            {`${image.caption} - ${index + 1} of ${this.props.images.length}`}
          </figcaption>
        </figure>
      </li>,
    );

    return (
      <div className={containerClassName}>
        <button className={styles.prevNavButton} onClick={this.prevNavClick} />
        <button className={styles.nextNavButton} onClick={this.nextNavClick} />
        <button className={styles.closeButton} onClick={this.props.onCloseImageSlider}>
          <span className={styles.closeButtonText}>+</span>
        </button>
        <Hammer onSwipe={this.handleSwipe}>
          <ul
            className={styles.items}
            style={{ transform: `translateX(${this.props.currentImage * -100}vw)` }}>
            {listItems}
          </ul>
        </Hammer>
      </div>
    );
  }
}

ImageSlider.propTypes = {
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
  currentImage: 0,
  visible: false,
};

export default ImageSlider;

