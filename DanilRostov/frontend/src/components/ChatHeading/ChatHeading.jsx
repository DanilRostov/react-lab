import React, { Component } from 'react';

import { FaCamera } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';

import './ChatHeader.scss';

class ChatHeading extends Component {
  render() {
    const { name, numberOfUsers } = this.props;
    return (
      <div className="chat-header">
        <div className="user-info">
          <div className="user-name">{name}</div>
          <div className="status">
            <div className="indicator"></div>
            <span>{numberOfUsers ? numberOfUsers : null}</span>
          </div>
        </div>
        <div className="options">
          <FaCamera />
          <FaUserPlus />
          <MdKeyboardArrowDown />
        </div>
      </div>
    );
  }
}

export default ChatHeading;