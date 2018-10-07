import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import LoginForm from '../components/LoginForm';
import ChatContainer from '../components/ChatContainer';
import { getIdToken, isTokenExpired, setUserData } from '../util/tokenUtilities';
import { logIn } from '../actions/auth/authAC';
import socketEvents from '../socketEvents';
const { USER_CONNECTED, LOG_OUT } = socketEvents;

const socketUrl = 'http://192.168.0.3:5005';

class AuthContainer extends Component {
  state = {
    socket: null,
    user: null
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => console.log('Connected'));
    this.setState({ socket });
  }

  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  }

  handleLogInUser = (user) => {
    const { logIn, auth } = this.props;
    logIn(user);
  }

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOG_OUT);
    this.setState({ user: null });
  }

  isUserAuthenticated = () => {
    const idToken = getIdToken();
    return !!idToken && !isTokenExpired(idToken);
  }

  render() {
    return (this.isUserAuthenticated() ? this.renderChatContainer() : this.renderLoginForm());
  } 

  renderLoginForm() {
    const { socket } = this.state;
    return (
      <LoginForm
        socket={socket}
        setUser={this.setUser}
        onLoginUser={this.handleLogInUser}
      />
    );
  }

  renderChatContainer() {
    const { socket, user } = this.state;
    return (
      <ChatContainer
        socket={socket}
        user={user}
        logout={this.logout}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: (user) => dispatch(logIn(user))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);