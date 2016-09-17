import React from 'react';
import Button from './Button';
import Icon from './Icon';

function SideBar({ isOpen, closeSidebar }) {
  return (
    <div className={`sidebarElement ${isOpen ? 'open' : ''}`}>
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
  );
}

export default SideBar;
