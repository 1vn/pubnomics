import React from 'react';
import Button from './Button';
import Icon from './Icon';
import Card from './Card';
import Loader from './Loader';

function SideBar({ isOpen, closeSidebar, searchText, searchData, isFetching }) {
  if (isOpen) {
    return (
    <div className={`sidebarElement ${isOpen ? 'open' : ''}`}>
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
  );  
  }
  return null;
}

export default SideBar;
