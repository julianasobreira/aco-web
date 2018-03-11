import React, { Component } from 'react';
import './Admin.css';

class Admin extends Component {
  render() {
    return (
      <div className="Admin">
        <form className="Admin-container">
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Senha"/>
          <button>Admin</button>
        </form>
      </div>
    )
  }
}

export default Admin;
