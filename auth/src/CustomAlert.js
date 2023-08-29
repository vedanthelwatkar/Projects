import React from 'react';
import './App.css';

const CustomAlert = ({ message }) => {
  return (
    <div className="custom-alert">
      {message}
    </div>
  );
};

export default CustomAlert;
