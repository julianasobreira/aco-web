import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import enhanceWithClickOutside from 'react-click-outside'

import './Menu.css'

class Menu extends Component {
  state = { isOpen: false }

  handleMenu = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  render() {
    return (
      <div
        className='menu'
        onClick={this.handleMenu}>
        <div className='menu-button'>Menu</div>
        { this.state.isOpen &&
          <ul className='menu-list'>
            <li className='menu-list-item'>
              <Link to='/admin/ofertas'>
                <i className="fa fa-book"></i>
                <span>Ofertas</span>
              </Link>
            </li>
            <li className='menu-list-item'>
              <Link to='/admin/grade'>
                <i className="fa fa-calendar"></i>
                <span>Grade</span>
              </Link>
            </li>
          </ul>
        }
      </div>
    );
  }
}

export default Menu
