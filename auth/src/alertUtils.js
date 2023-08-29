import React from 'react';
import ReactDOM from 'react-dom';
import CustomAlert from './CustomAlert';

export const customAlert = (message) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  ReactDOM.render(<CustomAlert message={message} />, container);

  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  }, 3000);
};
