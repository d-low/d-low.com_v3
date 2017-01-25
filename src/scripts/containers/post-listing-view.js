import React from 'react';

const PostListingView = function PostListingView(props) {
  return (
    <div>
      <h1>Post Listing View</h1>
      <h2>{ `${props.params.place}/${props.params.year}/${props.params.season}` }</h2>
    </div>
  );
};

PostListingView.propTypes = {
  params: React.PropTypes.shape({
    place: React.PropTypes.string,
    year: React.PropTypes.string,
    season: React.PropTypes.string,
  }).isRequired,
};

export default PostListingView;
