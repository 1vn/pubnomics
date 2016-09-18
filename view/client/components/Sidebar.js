import React from 'react';
import Button from './Button';
import Icon from './Icon';
import Card from './Card';
import Loader from './Loader';

class SideBar extends React.Component {
  constructor() {
    super();
    this.onClickBackground = this.onClickBackground.bind(this);
    this.onEsc = this.onEsc.bind(this);
  }

  onEsc(e) {
    e = e || window.event;
    if (e.keyCode === 27) {
      this.props.closeSidebar();
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.onEsc);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.onEsc);
  }

  onClickBackground(e) {
    if (!this.sidebar.contains(e.target)) {
      this.props.closeSidebar();
    }
  }

  render() {
  const { isOpen, closeSidebar, searchText, searchData, isFetching } = this.props;
  if (isOpen) {
      return (
      <div
        className="sidebarBackground"
        onClick={this.onClickBackground}
      >
        <div
          className={`sidebarElement ${isOpen ? 'open' : ''}`}
          ref={(sidebar) => this.sidebar = sidebar}
        >
          <div className="sidebarNavigation">
          <Button
            className="sidebarCloseButton"
            onClick={closeSidebar}
          >
            <Icon
              iconType="cross"
              style={{
                height: 25,
                width: 25,
              }}
            />
          </Button>
          </div>
          <div className="sidebarContent">
            <div className="sidebarContentContainer">
              <h2>{searchText}</h2>
              {isFetching ? <Loader /> : null}
              {searchData && searchData.map((each) => <Card data={each} key={each.name} />)}
            </div>
          </div>
        </div>
      </div>
    );  
  }
  return null;
}
}

export default SideBar;
