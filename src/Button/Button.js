import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

const Button = ({text = '', action}) => {
  return (
    <button className='button' onClick={action}>{text}</button>
  )
}

Button.defaultProps = {
  action: () => {}
};

Button.propTypes = {
  action: PropTypes.func,
  text: PropTypes.string
}

export default Button