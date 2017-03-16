/* eslint react/no-danger: 0, no-console: 0 */

import React from 'react';
import { Link } from 'react-router';
import FadeInBackgroundImageWhenVisible from '../fade-in-background-image-when-visible.js';
import styles from './post.css';

class Post extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
    };
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

  render() {
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
            <FadeInBackgroundImageWhenVisible
              backgroundImage={image}
              className={styles.image}
              fadeInNow={false} />
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
        <h3 className={styles.title}>{this.props.link.name}</h3>
        <div className={imagesContainerClassName}>
          <ul>
            {listItems}
          </ul>
          { this.props.link.images.length > 4 &&
            <button className={showMoreImagesClassName}>
              <span className={styles.showMoreImagesText}>View All</span>
              <small className={styles.showMoreImagesCount}>
                +{this.props.link.images.length - 3} more
              </small>
            </button>
          }
        </div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: this.state.text }} />
        <Link className={styles.readMoreLink} to={this.props.link.href}>
          Read More
        </Link>
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
