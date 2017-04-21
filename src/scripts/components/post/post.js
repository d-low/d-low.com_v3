/* eslint react/no-danger: 0, no-console: 0, no-script-url: 0 */

import React from 'react';
import FadeInBackgroundImageWhenVisible from '../fade-in-background-image-when-visible.js';
import ImageSlider from '../image-slider/image-slider.js';
import styles from './post.css';

class Post extends React.Component {
  constructor() {
    super();

    this.state = {
      currentImage: 0,
      maxHeight: null,
      imageSliderVisible: false,
      text: '',
      textExpanded: false,
    };

    this.changeCurrentImage = this.changeCurrentImage.bind(this);
    this.closeImageSlider = this.closeImageSlider.bind(this);
    this.viewImage = this.viewImage.bind(this);
    this.toggleText = this.toggleText.bind(this);
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

  /**
   * After updating if we have a reference to our text element and our text has
   * been fetched then save the max height of the text element that will be
   * transitioned to when expanding the text. This is done because we are
   * transitioning on the max-height and we'll lose the animation if we set an
   * arbitrary large value to transition to. i.e. transitioning from 300px to
   * 10000px in 0.25s isn't perceivable, whereas transitioning to 500px is!
   * @todo Set property, perhaps in state as we'll want to re-render, to not
   * show the Read More button and cropped effect if the text expanded max
   * height is with in a yet to be determined threshold.
   */
  componentDidUpdate() {
    if (this.text && this.state.text && !this.textExpandedMaxHeight) {
      const child = this.text.querySelector('div.eventContainer');
      this.textExpandedMaxHeight = child.getBoundingClientRect().height;
    }
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
    if (e) {
      e.preventDefault();
    }
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

  toggleText(e) {
    e.preventDefault();
    this.setState({
      textExpanded: !this.state.textExpanded,
      textExpandedMaxHeight: !this.state.textExpanded === true ?
        `${this.textExpandedMaxHeight}px` : null,
    });
  }

  /**
   * @todo Hide toggle text button if text expanded max height is less than
   * some yet to be determined threshold.
   */
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
          <h4 className={styles.date}>{this.props.link.date}</h4>
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
            className={`${styles.text} ${this.state.textExpanded ? styles.textExpanded : ''}`}
            dangerouslySetInnerHTML={{ __html: this.state.text }}
            ref={(el) => { this.text = el; }}
            style={{ maxHeight: this.state.textExpandedMaxHeight }} />
          <button className={styles.toggleTextButton} onClick={this.toggleText}>
            {this.state.textExpanded ? 'Show Less' : 'Read More'}
          </button>
        </div>
        <ImageSlider
          backgroundColor="black"
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
    date: React.PropTypes.string,
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
