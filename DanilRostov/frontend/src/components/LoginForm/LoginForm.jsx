import React, { Component } from 'react';

import socketEvents from '../../socketEvents';
const { VERIFY_USER } = socketEvents;

import './LoginForm.scss';

class LoginForm extends Component {
  state = {
    nickname: '',
    error: ''
  }

  setUser = ({ user, isUser }) => {
    if (isUser) {
      this.setError('Sorry, this user has already connected');
    } else {
      this.props.setUser(user);
      this.setError('');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.setUser);
  }

  handleChange = (e) => {
    this.setState({ nickname: e.target.value });
  }

  setError = (error) => {
    this.setState({ error })
  }

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nickname">
            <h2>Got a nickname?</h2>
          </label>
          <input
            ref={(input) => { this.textInput = input }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder={'Enter your nickname'}
          />
          <div className="error">{error ? error : null}</div>
        </form>
      </div>
    );
  }
}

export default LoginForm;