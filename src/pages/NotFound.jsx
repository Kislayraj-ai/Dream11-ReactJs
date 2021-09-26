import React from 'react';
import image from '../Images/notfound.svg';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
const NotFound = () => {
  return (
    <div className="not-found">
      <Link className="backLink" to="/login">
        <FaArrowLeft /> Take me Back
      </Link>
      <img src={image} width="650" height="650" alt="notfound" />
    </div>
  );
};
export default NotFound;
