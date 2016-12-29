import React from 'react';

class SiteContent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      /* beautify ignore:start */
      <section className="site-content js-site-content">
        { this.props.children }
      </section>
      /* beautify ignore:end */
    );
  }
}

export default SiteContent;