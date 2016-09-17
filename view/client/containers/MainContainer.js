import React from 'react';
import scrollIntoView from 'scroll-iv';
import { bindActionCreators } from 'redux';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import ProteinBlock from '../components/ProteinBlock';
import Modal from '../components/Modal';
import ReactList from 'react-list';
import  * as uiReducerActions  from '../actions/ui.js';
import * as searchActions from '../actions/search.js';
import * as proteinActions from '../actions/protein.js';
import { connect } from 'react-redux';
import { aminoMapping, proteinResults } from '../constants/amino.js';
import '../styles/style.scss';

const positionRegex = new RegExp(/p\.[a-zA-z]{3}(\d+)/);

class MainContainer extends React.Component {
  constructor(){
    super();
    this.closeSidebar = this.closeSidebar.bind(this);
    this.renderProtein = this.renderProtein.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onClickProtein = this.onClickProtein.bind(this);
    this.onClickResult = this.onClickResult.bind(this);
  }

  onClickProtein(type, id) {
  	this.props.actions.pickInitial(id, type);
  	this.props.actions.openModal();
  }

  onClickResult(result) {
  	this.props.actions.pickResult(result);
  }

  closeSidebar() {
    this.props.actions.closeSidebar();
    this.props.actions.selectNode(false);
  }

  onSearch() {
  	const id = Number(this.props.searchText.match(positionRegex)[1]);
  	document.getElementById(id > this.props.selectedNode ? id + 2 : id - 6).scrollIntoView({
  		behavior: 'smooth'
  	});
  	this.props.actions.selectNode(id);
  	this.props.actions.openSidebar()
  	this.props.actions.submitSearch(this.props.searchText);
  }

  renderProtein(each, index) {
  	const eachTriplet = each.join('');
  	const aminoMapped = aminoMapping[eachTriplet];
    const color = this.props.colorMapping[this.props.colorMappingArray.indexOf(aminoMapped)];

    return (
      <ProteinBlock
        key={index}
        id={index}
        onClick={this.onClickProtein}
        data={eachTriplet}
        isSelected={this.props.selectedNode === index}
        color={color || this.props.noMappingColor}
        typeOfProtein={aminoMapped}
      />
    );
  }

  render () {
    return (
      <div className="mainAppContainer">
      	<Modal
      		isOpen={this.props.isModalOpen}
      		onClose={this.props.actions.closeModal}
      		picked={this.props.selectedInitialData}
      		possiblePoints={proteinResults.filter((each) => each !== this.props.selectedInitialData.data)}
      		colorMapping={this.props.colorMapping}
      		proteinMappingArray={this.props.colorMappingArray}
      		onPickResult={this.onClickResult}
      	/>
        <Sidebar
          isOpen={this.props.isSidebarOpen}
          closeSidebar={this.closeSidebar}
          isFetching={this.props.isFetching}
          searchData={this.props.searchData}
          searchText={this.props.searchText}
        />
        <div className="searchBar">
          <SearchBar
          	onChange={this.props.actions.changeSearch}
          	value={this.props.searchText}
          	onSearch={this.onSearch}
          />
        </div>
        <div className="proteinElement">
          {this.props.brca1.map((each, index) => this.renderProtein(each, index))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    brca1: state.mainReducer.brca1,
    isSidebarOpen: state.uiReducer.isSidebarOpen,
    isModalOpen: state.uiReducer.isModalOpen,
    selectedNode: state.uiReducer.selectedNode,
    colorMapping: state.uiReducer.colorMapping,
    colorMappingArray: state.uiReducer.colorMappingArray,
    noMappingColor: state.uiReducer.noMappingColor,
    searchText: state.searchReducer.searchbar,
    isFetching: state.searchReducer.isFetching,
    searchData: state.searchReducer.searchData,
    selectedInitialData: state.proteinReducer.currentlyClicked,
    selectedResultingData: state.proteinReducer.resultClicked,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...uiReducerActions, ...searchActions, ...proteinActions }, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);