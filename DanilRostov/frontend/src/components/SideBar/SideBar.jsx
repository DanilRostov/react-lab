import React, { Component } from 'react';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaListUl } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { MdEject } from 'react-icons/md';

import './SideBar.scss';

class SideBar extends Component {
  state = {
    reciever: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { reciever } = this.state;
    const { onSendOpenPrivateMassage } = this.props;
    onSendOpenPrivateMassage(reciever);
  }

  render() {
    const { chats, activeChat, user, setActiveChat, logout } = this.props;
    const { reciever } = this.state;
    return (
      <div id="side-bar">
        <div className="heading">
          <div className="app-name">Cool Chat <MdKeyboardArrowDown /></div>
          <div className="menu">
            <FaListUl />
          </div>
        </div>
        <form onSubmit={this.handleSubmit} className="search">
          <i className="search-icon"><FaSearch /></i>
          <input
            placeholder="Search"
            type="text"
            value={reciever}
            onChange={(e) => { this.setState({ reciever: e.target.value }) }}
          />
          <div className="plus"></div>
        </form>
        <div
          className="users"
          ref='users'
          onClick={(e) => { (e.target === this.refs.user) && setActiveChat(null) }}>
          {
            chats.map((chat) => {
              if (chat.name) {
                const lastMessage = chat.messages[chat.messages.length - 1];
                const chatSideName = chat.users.find(name => {
                  return name !== user.name
                }) || 'PokemonsChat';
                const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : '';
                return (
                  <div
                    key={chat.id}
                    className={`user ${classNames}`}
                    onClick={() => { setActiveChat(chat) }}
                  >
                    <div className="user-photo">{`${chatSideName[0]}${chatSideName[1]}`.toUpperCase()}</div>
                    <div className="user-info">
                      <div className="name">{chatSideName}</div>
                      {lastMessage && <div className="last-message">{lastMessage.message}</div>}
                    </div>
                  </div>
                );
              }
              return null
            })
          }
        </div>
        <div className="current-user">
          <span>{user.name}</span>
          <div onClick={() => { logout() }} title="Logout" className="logout">
            <MdEject />
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;