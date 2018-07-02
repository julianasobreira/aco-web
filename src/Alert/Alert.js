import React, { Fragment, Component } from 'react'
import './Alert.css'
import Button from '../Button/Button'

class Alert extends Component {
  componentDidMount () {
    document.body.style.overflow = 'hidden'
  }

  componentWillUnmount () {
    document.body.style.overflow = 'initial'
  }
  
  render () {
    const {
      text = '',
      confirm = null,
      cancel = null
    } = this.props

    return (
      <Fragment> 
        <div className='alert-container'> 
          <p className='alert-container-text'>{text}</p>
          <div className='alert-container-options'>
            <Button text='Deletar' action={confirm}/>
            <Button text='Cancelar' action={cancel}/>
          </div>
        </div>
        <div className='alert-background'></div>
      </Fragment>
    )
  }
}

export default Alert