import React, { Component } from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className='loading'>
      <div className='loading-wrapp'>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
    </div>
  );
}

export default Loading;
