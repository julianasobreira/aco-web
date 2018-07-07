import React from 'react'
import './MessageError.css'

const MessageError = ({errors}) => {
  return (
    <ul className='message-error'>
      { errors.map((message, index) => (<li key={index}>{message}</li>)) }
    </ul>
  )
}

export default MessageError;