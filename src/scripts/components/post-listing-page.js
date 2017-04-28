import React from 'react';
import SiteNavigation from './site-navigation/site-navigation.js';
import SiteHeader from './site-header/site-header.js';
import SiteContent from './site-content/site-content.js';
import Post from './post/post.js';
import SiteFooter from './site-footer/site-footer.js';
import Utils from '../utils.js';
import { borderGrayBackground } from '../../styles/base/colors.css';

// TODO: Use names that correspond to our pages when parameterizing components.
// i.e. Use "isListingView" instead of "isContentPage". It's more consistent to
// use names that correspond with our views!
const PostListingPage = ({ links, title, topLinks }) => {
  /**
   * Scroll the requested post into view after all posts have been rendered
   * if there is a hash on the URL.
   * @see http://stackoverflow.com/questions/40280369/use-anchors-with-react-router
   */
  const scrollToPost = () => {
    const { hash } = window.location;

    if (hash !== '') {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);

      if (el) {
        const top = el.getBoundingClientRect().top - 100;

        if (top > 0) {
          Utils.scrollToY(top);
        }
      }
    }
  };

  let numPostsRendered = 0;

  const onPostRendered = () => {
    numPostsRendered += 1;

    if (numPostsRendered === links.length) {
      scrollToPost();
    }
  };

  const listItems = links.map((link, index) => {
    const parts = link.href.split('/');
    const id = parts[parts.length - 1];

    return (
      <li id={id} key={link.name}>
        <Post link={link} isReverseLayout={index % 2 === 1} onPostRendered={onPostRendered} />
      </li>
    );
  });

  return (
    <div className={borderGrayBackground}>
      <SiteNavigation links={topLinks} />
      <SiteHeader />
      <SiteContent title={title}>
        <ul>
          { listItems }
        </ul>
      </SiteContent>
      <SiteFooter />
    </div>
  );
};

PostListingPage.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  title: React.PropTypes.string.isRequired,
  topLinks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default PostListingPage;
