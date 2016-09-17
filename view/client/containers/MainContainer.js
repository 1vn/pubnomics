import React from 'react';
import scrollIntoView from 'scroll-iv';
import { bindActionCreators } from 'redux';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import ProteinBlock from '../components/ProteinBlock';
import { connect } from 'react-redux'; 
import '../styles/style.scss';

const bullshit = 'adawdawdawdawdawdawdwa';

class MainContainer extends React.Component {
  constructor(){
    super();
    this.scrollToElementId = this.scrollToElementId.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.state = {
      sidebarIsOpen: false,
      selectedNode: false,
    }
  }

  scrollToElementId(id){
    this.setState({
      sidebarIsOpen: true,
      selectedNode: id,
    });
    document.getElementById(id).scrollIntoView();
  }

  closeSidebar() {
    this.setState({
      sidebarIsOpen: false,
    });
  }

  render () {
    return (
      <div className="mainAppContainer">
        <Sidebar
          isOpen={this.state.sidebarIsOpen}
          closeSidebar={this.closeSidebar}
        />
        <div className="searchBar">
          <SearchBar />
        </div>
        <div className="proteinElement">
          {Array.from(bullshit).map((each, index) =>
            <ProteinBlock
              key={index}
              id={each + index}
              onClick={this.scrollToElementId}
              isSelected={this.state.selectedNode === each+index}
            /> )}
        </div>
      </div>
    )
  }
}

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