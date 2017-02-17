import { connect } from 'react-redux';
import ListingPage from '../components/listing-page.js';

const mapStateToProps = state => ({
  listingLinks: state.listingData.links,
  title: state.listingData.title,
  topLinks: state.listingData.topLinks,
});

const ListingView = connect(
  mapStateToProps,
)(ListingPage);

export default ListingView;
