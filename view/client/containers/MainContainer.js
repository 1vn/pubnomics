import React from 'react';
import { bindActionCreators } from 'redux';
import SearchBar from '../components/SearchBar';
import ProteinBlock from '../components/ProteinBlock';
import { connect } from 'react-redux'; 
import '../styles/style.scss';

const bullshit = 'adawdawdawdawdawdawdwa';

const MainContainer = React.createClass({
  render () {
    return (
      <div className="mainAppContainer">
        <div className="searchBar">
          <SearchBar />
        </div>
        <div className="proteinElement">
          {Array.from(bullshit).map((each) => <ProteinBlock /> )}
        </div>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    // count: state.testReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(testActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);