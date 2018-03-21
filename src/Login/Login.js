import React, { Component } from 'react';
import { setToken } from '../utils/auth'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import './Login.css';

class Login extends Component {
  state = {
    login: null,
    senha: null,
    loginSuccess: false,
    loginFail: false
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
    axios.post(`${process.env.API_URL}/login`, {login, senha})
      .then(response => {
        setToken(response.data)
        this.setState({
          loginSuccess: true,
          loginError: false
        })
      })
      .catch(() => {
        this.setState({loginError: true})
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/admin" } }

    if (this.state.loginSuccess) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login" onSubmit={this.handleSubmit}>
        <form className="login-container" >
          <input type="text" placeholder="Login" onChange={this.handleLogin}/>
          <input type="password" placeholder="Senha" onChange={this.handleSenha}/>
          { this.state.loginError &&
            <div className='login-error'>Ocorreu um erro durante a operação</div>
          }
          <button>login</button>
        </form>
      </div>
    )
  }
}

export default Login;
