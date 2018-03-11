import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <form className="login-container">
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Senha"/>
          <button>login</button>
        </form>
      </div>
    )
  }
}

export default Login;
