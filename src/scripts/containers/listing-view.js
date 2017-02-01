import { connect } from 'react-redux';
import ListingPage from '../components/listing-page.js';

const mapStateToProps = state => ({
  links: state.listingLinks.links,
  title: state.listingLinks.title,
});

const ListingView = connect(
  mapStateToProps,
)(ListingPage);

export default ListingView;
