import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  componentDidMount () {
    document.body.style.overflow = 'hidden'
  }

  componentWillUnmount () {
    document.body.style.overflow = 'initial'
  }
  
  render () {
    return (
      <div className='loading'>
        <div className='loading-wrapp'>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </div>
      </div>
    )
  }
}

export default Loading;
