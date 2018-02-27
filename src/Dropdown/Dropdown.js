import React, { Component } from 'react';
import './Dropdown.css';

class Dropdown extends Component {
  render() {
    return (
      <div className="dropdown">
        <select>
          <option value="" disabled>Choose your option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </div>
    );
  }
}

export default Dropdown;
