import imagesloaded from 'imagesloaded';
import React from 'react';
import styles from './fade-in-background-image.css';

class FadeInBackgroundImage extends React.Component {
  constructor() {
    super();

    this.state = {
      imageVisible: false,
    };
  }

  componentDidMount() {
    imagesloaded(this.element, { background: true }, () => {
      this.setState({ imageVisible: true });
    });
  }

  render() {
    let className = `${this.props.className}`;

    if (this.state.imageVisible) {
      className = `${className} ${styles.imageVisible}`;
    } else {
      className = `${className} ${styles.imageHidden}`;
    }

    return (
      <div className={className} ref={(el) => { this.element = el; }}>
        { this.props.children }
      </div>
    );
  }
}

FadeInBackgroundImage.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

FadeInBackgroundImage.defaultProps = {
  children: null,
  className: '',
};

export default FadeInBackgroundImage;
