import { connect } from 'react-redux';
import PostListingPage from '../components/post-listing-page.js';

const mapStateToProps = state => ({
  links: state.postListingData.links,
  title: state.postListingData.title,
  topLinks: state.postListingData.topLinks,
});

const PostListingView = connect(
  mapStateToProps,
)(PostListingPage);

export default PostListingView;
