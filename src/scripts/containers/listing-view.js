import React from 'react';

const ListingView = function ListingView(props) {
  let path = props.params.place;

  if (props.params.year) {
    path = `${path}/${props.params.year}`;
  }

  return (
    <div>
      <h1>Listing View</h1>
      <h2>{ path }</h2>
    </div>
  );
};

ListingView.propTypes = {
  params: React.PropTypes.shape({
    place: React.PropTypes.string,
    year: React.PropTypes.string,
  }).isRequired,
};

export default ListingView;
