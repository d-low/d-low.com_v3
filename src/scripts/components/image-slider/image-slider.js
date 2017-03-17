import React from 'react';
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
      currentImage: this.props.currentImage,
      visible: this.props.visible,
    };
  }

  // /**
  //  * TODO:
  //  * 1) If visible then load the current, previous and next images
  //  */
  // componentDidMount() {
  //   if (this.state.visible) {
  //   }
  // }

  render() {
    const containerClassName = this.state.visible ? styles.containerVisible : styles.container;
    const listItems = this.props.images.map(image =>
      <li className={styles.item} key={image.href}>
        <figure className={styles.image} data-image={image.href}>
          <figcaption className={styles.caption}>
            {image.caption}
          </figcaption>
        </figure>
      </li>,
    );

    return (
      <div className={containerClassName}>
        <ul className={styles.items}>
          {listItems}
        </ul>
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

