import React, { Component } from 'react';

import { API_URL } from '../../constants/api';
import socketEvents from '../../socketEvents';
const { VERIFY_USER } = socketEvents;

import './LoginForm.scss';

class LoginForm extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    validationError: null
  }

  setUser = ({ user, isUser }) => {
    if (isUser) {
      this.setError('Sorry, this user has already connected');
    } else {
      this.props.setUser(user);
      this.setError('');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { socket, onLoginUser } = this.props;
    const { user } = this.state;
    if (this.isFormValid()) {
      onLoginUser(user);
      // socket.emit(VERIFY_USER, nickname, this.setUser);
    }
    // socket.emit(VERIFY_USER, nickname, this.setUser);
  }

  isFormValid() {
    const { user } = this.state;
    const regExpEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    if (!user.email.match(regExpEmail)) {
      this.setState({ validationError: 'EMAIL' });
      return false;
    }
    if (user.password.length < 5) {
      this.setState({ validationError: 'PASSWORD' });
      return false;
    }
    this.setState({ validationError: false });
    return true;
  }

  handleLoginChange = (event) => {
    const { user } = this.state;
    const newUser = { ...user, email: event.target.value };
    this.setState({ user: newUser });
  }

  handlePasswordChange = (event) => {
    const { user } = this.state;
    const newUser = { ...user, password: event.target.value };
    this.setState({ user: newUser });
  }

  setError = (error) => {
    this.setState({ error })
  }

  render() {
    const { nickname, password } = this.state;
    return (
      <div className="login">
        <form className="login-form">
          <h2>Please, log in</h2>
          <input
            ref={(input) => { this.textInput = input }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleLoginChange}
            placeholder={'Your email'}
          />
          <input
            ref={(input) => { this.passwordInput = input }}
            type="password"
            id="password"
            value={password}
            onChange={this.handlePasswordChange}
            placeholder={'Your password'}
          />
          {this.renderError()}
          <button 
            className="login__btn-login"
            onClick={this.handleSubmit}
          >Log in</button>
        </form>
      </div>
    );
  }

  renderError() {
    const { validationError } = this.state;
    return (
      validationError ?
      <div className="error">{this.getErrorStatus()}</div> 
      : null
    )
  }

  getErrorStatus() {
    const { validationError } = this.state;
    switch (validationError) {
      case 'EMAIL': 
        return 'Email format is incorrect'
      case 'PASSWORD':
        return 'Password should include 5 or more symbols'
      default:
        return 'Incorrect data';
    }
  }
}

export default LoginForm;