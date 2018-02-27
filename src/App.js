import React, { Component } from 'react';
import './App.css';

import Dropdown from './Dropdown/Dropdown';
import AppHeader from './AppHeader/AppHeader';
import AppSubheader from './AppSubheader/AppSubheader';
import AppBody from './AppBody/AppBody';

class App extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <AppSubheader />
        <AppBody />
      </div>
    );
  }
}

export default App;
