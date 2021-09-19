import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  const newClass = props.className;
  return (
    <button className={`${classes.button} ${newClass}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
