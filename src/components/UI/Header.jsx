import React from 'react';

const Header = (props) => {
  const newClass = props.className;
  return <header className={`header ${newClass}`}>{props.children}</header>;
};

export default Header;
