import React from 'react';

const PostView = function PostView(props) {
  return (
    <div>
      <h1>Post View</h1>
      <h2>{ `${props.params.place}/${props.params.year}/${props.params.season}/${props.params.post}` }</h2>
    </div>
  );
};

PostView.propTypes = {
  params: React.PropTypes.shape({
    place: React.PropTypes.string,
    year: React.PropTypes.string,
    season: React.PropTypes.string,
    post: React.PropTypes.string,
  }).isRequired,
};

export default PostView;
