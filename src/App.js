import React, { Component } from 'react';

import './App.css';

import AppHeader from './AppHeader/AppHeader';
import AppSubheader from './AppSubheader/AppSubheader';
import AppBody from './AppBody/AppBody';
import Loading from './Loading/Loading'


class App extends Component {
  state = { isFetching: false }

  isFetching = isFetching => {
    this.setState({ isFetching })
  }

  render() {
    return (
      <div className='app'>
        <AppHeader />
        <AppSubheader />
        <AppBody isFetching={this.isFetching} />
        { this.state.isFetching && <Loading /> }
      </div>
    );
  }
}

export default App;
