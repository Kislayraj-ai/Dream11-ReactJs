import React from 'react';

const Card = (props) => {
  const Extraclass = props.className;
  return <div className={`card ${Extraclass}`}>{props.children}</div>;
};
export default Card;
