import React from 'react';

const Button = ({ label, type = 'button' }) => (
  <div className="pure-controls">
    <button className="pure-button" type={type}>
      {label}
    </button>
  </div>
);

export default Button;
