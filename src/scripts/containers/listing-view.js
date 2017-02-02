import { connect } from 'react-redux';
import ListingPage from '../components/listing-page.js';

const mapStateToProps = function mapStatetoProps(state) {
  return {
    listingLinks: state.listingLinks.links,
    title: state.listingLinks.title,
    topLinks: state.listingLinks.topLinks,
  };
};

const ListingView = connect(
  mapStateToProps,
)(ListingPage);

export default ListingView;
