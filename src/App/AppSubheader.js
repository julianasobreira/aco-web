import React, { Component } from 'react';

class AppHeader extends Component {
  render() {
    return (
      <section className='app-subheader'>
        <div className='app-subheader-container'>
          <a href='' className='app-subheader__link'>Code and Docs on GitHub</a>
          <iframe 
            src='https://ghbtns.com/github-btn.html?user=twbs&repo=bootstrap&type=fork&count=true'
            frameBorder='0'
            scrolling='0'
            width='102px'
            height='20px'></iframe>
        </div>
      </section>
    );
  }
}

export default AppHeader;
