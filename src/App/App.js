import React, { Component } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import AppBody from './AppBody';
import Helper from './Helper';

require('font-awesome/css/font-awesome.css')

class App extends Component {
  render() {
    const {match} = this.props
    
    return (
      <div className='app'>
        <AppHeader location={this.props.location} />
        { match.url.indexOf('/admin') === -1 &&
          <Helper />
        } 
        <AppBody isFetching={this.isFetching} />
      </div>
    );
  }
}

export default App;
