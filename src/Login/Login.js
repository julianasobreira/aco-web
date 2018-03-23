import React, { Component } from 'react';
import axios from 'axios'
import { setToken } from '../utils/auth'
import { Redirect } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Login.css';

class Login extends Component {
  state = {
    login: null,
    senha: null,
    loginSuccess: false,
    loginFail: false,
    isFetching: false
  }

  handleLogin = e => {
    this.setState({
      login: e.target.value
    })
  }

  handleSenha = e => {
    this.setState({
      senha: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { senha, login } = this.state
    this.setState({
      isFetching: true
    })
    axios.post(`${process.env.API_URL}/login`, {login, senha})
      .then(response => {
        setToken(response.data)
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
    const { from } = this.props.location.state || { from: { pathname: '/admin' } }

    if (this.state.loginSuccess) {
      return <Redirect to={from} />;
    }

    return (
      <div className='login' onSubmit={this.handleSubmit}>
        <form className='login-container' >
          <h2 className='login-container-title'>Administrador</h2>
          <input type='text' placeholder='Login' onChange={this.handleLogin}/>
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
