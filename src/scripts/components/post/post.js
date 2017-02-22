/* eslint react/no-danger: 0 */

import React from 'react';
import { Link } from 'react-router';
// import FadeInBackgroundImageWhenVisible from '../fade-in-background-image-when-visible.js';
// import styles from './post.css';

class Post extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    this.props.link.text().then(text =>
      this.setState({ text }),
    );
  }

  render() {
    const listItems = [];

    this.props.link.thumbnails.forEach((thumbnail, index) => {
      if (index <= 2) {
        listItems.push(
          <li key={thumbnail}>
            <img alt="" src={thumbnail} />
          </li>,
        );
      }
    });

    return (
      <div>
        <h3>{this.props.link.name}</h3>
        <ul>
          <li key={this.props.link.heroImage}>
            <img alt="" src={this.props.link.heroImage} />
          </li>
          {listItems}
        </ul>
        <div dangerouslySetInnerHTML={{ __html: this.state.text }} />
        <Link to={this.props.link.href}>Read More</Link>
      </div>
    );
  }
}

Post.propTypes = {
  link: React.PropTypes.shape({
    heroImage: React.PropTypes.string,
    href: React.PropTypes.string,
    images: React.PropTypes.arrayOf(React.PropTypes.string),
    name: React.PropTypes.string,
    text: React.PropTypes.function,
    thumbnails: React.PropTypes.arrayOf(React.PropTypes.string),
  }).isRequired,
};

export default Post;
