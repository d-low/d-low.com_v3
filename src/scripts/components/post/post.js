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

    this.props.link.images.forEach((image, index) => {
      if (this.props.link.images.length < 4 && index > 0) {
         // Display only one image if we don't have four to show.
        return;
      }
      if (index <= 3) {
        // Show only the first four images here. Others will be viewed in the
        // image overlay.
        listItems.push(
          <li className={styles.imageContainer} key={image}>
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

    let imagesContainerClassName = styles.imagesContainer;
    let showMoreImagesClassName = styles.showMoreImages;

    if (this.props.isReverseLayout) {
      imagesContainerClassName = styles.imagesContainerReverse;
      showMoreImagesClassName = styles.showMoreImagesReverse;
    }

    imagesContainerClassName = `${imagesContainerClassName} clearfix`;

    return (
      <div className={styles.container}>
        <div>
          <h3 className={styles.title}>{this.props.link.name}</h3>
          <div className={imagesContainerClassName}>
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
