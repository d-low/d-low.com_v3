/* eslint react/no-danger: 0, no-console: 0, no-script-url: 0 */

import React from 'react';
import { Link } from 'react-router';
import FadeInBackgroundImageWhenVisible from '../fade-in-background-image-when-visible.js';
import ImageSlider from '../image-slider/image-slider.js';
import styles from './post.css';

class Post extends React.Component {
  constructor() {
    super();

    this.state = {
      currentImage: 0,
      imageSliderVisible: false,
      text: '',
    };

    this.changeCurrentImage = this.changeCurrentImage.bind(this);
    this.closeImageSlider = this.closeImageSlider.bind(this);
    this.viewImage = this.viewImage.bind(this);
  }

  componentDidMount() {
    this.props.link
      .text()
      .then(text =>
        this.setState({ text }),
      )
      .catch((exp) => {
        console.error('Unable to get link text');
        console.dir(exp);
      });
  }

  populateImageSliderImages() {
    return this.props.link.images.map((href) => {
      const parts = href.split('/');
      const caption = parts[parts.length - 1]
        .replace(/^\d\d\d\d-\d\d-\d\d-\d\d-/, '')
        .replace(/\.\w+$/, '')
        .replace(/([a-z])([A-Z])/g, '$1 $2');

      return {
        caption,
        href,
      };
    });
  }

  changeCurrentImage(currentImage) {
    this.setState({
      currentImage,
    });
  }

  closeImageSlider(e) {
    e.preventDefault();
    this.setState({
      imageSliderVisible: false,
    });
  }

  viewImage(e) {
    e.preventDefault();
    const imageLink = e.target.closest('.js-image-link');
    const imageIndex = Number(imageLink.dataset.imageIndex);

    this.setState({
      currentImage: imageIndex,
      imageSliderVisible: true,
    });
  }

  render() {
    const imageSliderImages = this.populateImageSliderImages();
    const listItems = [];
    let imageContainerClassName = '';

    // In the regular layout the first three images are floated left taking up
    // 33% of the available height and 35% of the available width and the
    // fourth image, the hero image, is positioned at the top right taking up
    // 100% of the available height and 64.5% of the available width. In the
    // reverse layout the first image is the hero image and it is positioned at
    // the top left. The other three images float to the right of it.
    this.props.link.images.forEach((image, index) => {
      // Determine image container class name
      if (this.props.link.images.length < 4 && index === 0) {
        imageContainerClassName = styles.singleImageContainer;
      } else if (this.props.isReverseLayout && index === 0) {
        imageContainerClassName = styles.heroImageContainerReverse;
      } else if (this.props.isReverseLayout && index > 0) {
        imageContainerClassName = styles.imageContainerReverse;
      } else if (!this.props.isReverseLayout && index < 3) {
        imageContainerClassName = styles.imageContainerRegular;
      } else if (!this.props.isReverseLayout && index === 3) {
        imageContainerClassName = styles.heroImageContainerRegular;
      }

      // Display only one image if we don't have four to show.
      if (this.props.link.images.length < 4 && index > 0) {
        return;
      }

      // Show only the first four images here. Others will be viewed in the
      // image overlay.
      if (index <= 3) {
        listItems.push(
          <li className={imageContainerClassName} key={image}>
            <a
              className="js-image-link"
              data-image-index={index}
              href={image}
              onClick={this.viewImage}
              rel="noopener noreferrer"
              target="_blank">
              <FadeInBackgroundImageWhenVisible
                backgroundImage={image}
                className={styles.image}
                fadeInNow={false} />
            </a>
          </li>,
        );
      }
    });

    let showMoreImagesClassName = styles.showMoreImages;

    if (this.props.isReverseLayout) {
      showMoreImagesClassName = styles.showMoreImagesReverse;
    }

    return (
      <div className={styles.container}>
        <div>
          <h3 className={styles.title}>{this.props.link.name}</h3>
          <div className={`${styles.imagesContainer} clearfix`}>
            <ul>
              {listItems}
            </ul>
            { this.props.link.images.length > 4 &&
              <a
                className={`${showMoreImagesClassName} js-image-link`}
                data-image-index="0"
                href="javascript:void(0);"
                onClick={this.viewImage}>
                <span className={styles.showMoreImagesText}>View All</span>
                <small className={styles.showMoreImagesCount}>
                  +{this.props.link.images.length - 3} more
                </small>
              </a>
            }
          </div>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: this.state.text }} />
          <Link className={styles.readMoreLink} to={this.props.link.href}>
            Read More
          </Link>
        </div>
        <ImageSlider
          currentImage={this.state.currentImage}
          images={imageSliderImages}
          onChangeCurrentImage={this.changeCurrentImage}
          onCloseImageSlider={this.closeImageSlider}
          visible={this.state.imageSliderVisible} />
      </div>
    );
  }
}

Post.propTypes = {
  link: React.PropTypes.shape({
    href: React.PropTypes.string,
    images: React.PropTypes.arrayOf(React.PropTypes.string),
    name: React.PropTypes.string,
    text: React.PropTypes.function,
    thumbnails: React.PropTypes.arrayOf(React.PropTypes.string),
  }).isRequired,
  isReverseLayout: React.PropTypes.bool,
};

Post.defaultProps = {
  isReverseLayout: false,
};

export default Post;
