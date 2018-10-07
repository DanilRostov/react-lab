import React, { Component } from 'react';

import io from 'socket.io-client';

import socketEvents from '../../socketEvents';
const { USER_CONNECTED, LOG_OUT } = socketEvents;
import LoginForm from '../LoginForm';
import ChatContainer from '../ChatContainer';

const socketUrl = 'http://192.168.0.3:5005';

class Layout extends Component {
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

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOG_OUT);
    this.setState({ user: null });
  }

  render() {
    const { socket, user } = this.state;
    return (
      <div className="container">
        {
          !user ?
            <LoginForm
              socket={socket}
              setUser={this.setUser}
            />
            :
            <ChatContainer
              socket={socket}
              user={user}
              logout={this.logout}
            />
        }
      </div>
    );
  }
}

export default Layout;