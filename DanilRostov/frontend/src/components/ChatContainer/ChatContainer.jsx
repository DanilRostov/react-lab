import React, { Component } from 'react';

import SideBar from '../SideBar';
import ChatHeading from '../ChatHeading';
import Messages from '../Messages';
import MessageInput from '../MessageInput';
import socketEvents from '../../socketEvents';
const { 
  RESET_DEFAULT_CHAT,
  MESSAGE_SENT,
  MESSAGE_RECEIVED,
  TYPING,
  PRIVATE_MESSAGE 
} = socketEvents;

import './ChatContainer.scss';

class ChatContainer extends Component {
  state = {
    chats: [],
    activeChat: null
  }

  componentDidMount() {
    const { socket } = this.props;
    this.initSocket(socket);
  }

  initSocket = (socket) => {
    const { user } = this.props;
    socket.emit(RESET_DEFAULT_CHAT, this.resetChat);
    socket.on(PRIVATE_MESSAGE, this.addChat);
    socket.on('connect', () => {
      socket.emit(RESET_DEFAULT_CHAT, this.resetChat);
    });
  }

  sendOpenPrivateMassage = (reciever) => {
    const { socket, user } = this.props;
    socket.emit(PRIVATE_MESSAGE, { reciever, sender: user.name });
  }

  resetChat = (chat) => this.addChat(chat, true);

  addChat = (chat, reset = false) => {
    const { socket } = this.props;
    const { chats } = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({ chats: newChats, activeChat: reset ? chat : this.state.activeChat });

    const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`;
    const typingEvent = `${TYPING}-${chat.id}`;

    socket.on(messageEvent, this.addMessageToChat(chat.id));
    socket.on(typingEvent, this.updateTypingInChat(chat.id));
  }

  addMessageToChat = (chatId) => {
    return message => {
      const { chats } = this.state;
      let newChats = chats.map((chat) => {
        if (chat.id === chatId) {
          chat.messages.push(message);
        }
        return chat;
      });
      this.setState({ chats: newChats });
    }
  }

  updateTypingInChat = (chatId) => ({ isTyping, user }) => {
    if (user !== this.props.user.name) {
      const { chats } = this.state;
      let newChats = chats.map(chat => {
        if (chat.id === chatId) {
          if (isTyping && !chat.typingUsers.includes(user)) {
            chat.typingUsers.push(user);
          } else if (!isTyping && chat.typingUsers.includes(user)) {
            chat.typingUsers = chat.typingUsers.filter(u => u !== user)
          }
        }
        return chat;
      });
      this.setState({ chats: newChats });
    }
  }

  sendMessage = (chatId, message) => {
    const { socket } = this.props;
    socket.emit(MESSAGE_SENT, { chatId, message });
  }

  sendTyping = (chatId, isTyping) => {
    const { socket } = this.props;
    socket.emit(TYPING, { chatId, isTyping });
  }

  setActiveChat = (activeChat) => {
    this.setState({ activeChat });
  }

  render() {
    const { user, logout } = this.props;
    const { chats, activeChat } = this.state;
    return (
      <div className="container">
        <SideBar
          logout={logout}
          chats={chats}
          user={user}
          activeChat={activeChat}
          setActiveChat={this.setActiveChat}
          onSendOpenPrivateMassage={this.sendOpenPrivateMassage}
        />
        <div className="chat-room-container">
          {
            activeChat !== null ? (
              <div className="chat-room">
                <ChatHeading name={activeChat.name} />
                <Messages
                  messages={activeChat.messages}
                  user={user}
                  typingUsers={activeChat.typingUsers}
                />
                <MessageInput
                  sendMessage={(message) => {
                    this.sendMessage(activeChat.id, message)
                  }}
                  sendTyping={(isTyping) => {
                    this.sendTyping(activeChat.id, isTyping)
                  }}
                />
              </div>
            ) :
              <div className="chat-room choose">
                <h3>Choose a chat!</h3>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default ChatContainer;