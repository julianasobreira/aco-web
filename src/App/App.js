import React, { Component } from 'react';

import './App.css';

import AppHeader from './AppHeader';
import AppSubheader from './AppSubheader';
import AppBody from './AppBody';
import Loading from '../Loading/Loading'


class App extends Component {
  state = { isFetching: false }

  isFetching = isFetching => {
    this.setState({ isFetching })
  }

  render() {
    return (
      <div className='app'>
        <AppHeader location={this.props.location}/>
        <AppSubheader />
        <AppBody isFetching={this.isFetching} />
        { this.state.isFetching && <Loading /> }
      </div>
    );
  }
}

export default App;
