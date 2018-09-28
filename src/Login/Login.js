import React, { Component } from 'react';
import axios from 'axios'
import md5 from 'md5'
import { setInfo, ACCESS_AUTH_INFO } from '../utils/localStorage'
import { Redirect } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Login.css'
import { getAuthData } from '../utils/auth'

class Login extends Component {
  state = {
    email: null,
    senha: null,
    loginSuccess: false,
    loginFail: false,
    isFetching: false
  }

  handleEmail = e => {
    this.setState({
      email: e.target.value
    })
  }

  handleSenha = e => {
    this.setState({
      senha: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { senha, email } = this.state
    this.setState({
      isFetching: true
    })
    axios.post(`${process.env.API_URL}/login`, {email, senha: md5(senha)})
      .then(response => {
        const userData = getAuthData(response.data)
        setInfo(ACCESS_AUTH_INFO, userData)
        this.setState({
          loginSuccess: true,
          loginError: false,
          isFetching: false
        })
      })
      .catch(() => {
        this.setState({
          loginError: true,
          isFetching: false
        })
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (this.state.loginSuccess) {
      return <Redirect to={from} />;
    }

    return (
      <div className='login' onSubmit={this.handleSubmit}>
        <form className='login-container' >
          <h2 className='login-container-title'>Administrador</h2>
          <input type='text' placeholder='Login' onChange={this.handleEmail}/>
          <input type='password' placeholder='Senha' onChange={this.handleSenha}/>
          { this.state.loginError &&
            <div className='login-error'>Ocorreu um erro durante a operação</div>
          }
          <button>login</button>
        </form>
        { this.state.isFetching &&
          <Loading />
        }
      </div>
    )
  }
}

export default Login;
