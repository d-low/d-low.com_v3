import { connect } from 'react-redux';
import HomePage from '../components/home-page.js';

const mapStateToProps = state => ({
  links: state.links,
});

const HomeView = connect(
  mapStateToProps,
)(HomePage);

export default HomeView;
