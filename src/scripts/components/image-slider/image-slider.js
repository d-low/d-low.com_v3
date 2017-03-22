/* eslint react/no-unused-prop-types: 0, no-console: 0, class-methods-use-this: 0 */

import React from 'react';
import Hammer from 'react-hammerjs';
import styles from './image-slider.css';

/**
 * @description Image slider React component based on Gilbert Pellegrom's Ideal
 * Image Slider.
 * @see https://github.com/Codeinwp/Ideal-Image-Slider-JS
 */
class ImageSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: props.currentImage,
    };

    this.handleSwipe = this.handleSwipe.bind(this);
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

  /**
   * @todo Note that the Hammer.DIRECTION_LEFT and Hammer.DIRECTION_RIGHT
   * constants are not available on the React Hammer component so we've hard
   * coded their values, 2 and 4, here.
   */
  handleSwipe(e) {
    if (e.direction === 2 && this.state.currentImage + 1 < this.props.images.length - 1) {
      this.setState({
        currentImage: this.state.currentImage + 1,
      });
    } else if (e.direction === 4 && this.state.currentImage - 1 >= 0) {
      this.setState({
        currentImage: this.state.currentImage - 1,
      });
    }
  }

  render() {
    const containerClassName = this.props.visible ? styles.containerVisible : styles.container;
    const listItems = this.props.images.map(image =>
      <li className={styles.item} key={image.href}>
        <figure
          className={styles.image}
          data-image={image.href}
          style={{ backgroundImage: `url(${image.href})` }}>
          <figcaption className={styles.caption}>
            {image.caption}
          </figcaption>
        </figure>
      </li>,
    );

    return (
      <div className={containerClassName}>
        <Hammer onSwipe={this.handleSwipe}>
          <ul
            className={styles.items}
            style={{ transform: `translateX(${this.state.currentImage * -100}vw)` }}>
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
  visible: React.PropTypes.bool,
};

ImageSlider.defaultProps = {
  currentImage: 0,
  visible: false,
};

export default ImageSlider;

