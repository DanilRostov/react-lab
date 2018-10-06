'use strict'
const uuid = require('uuid');

const createUser = ({ name = '', socketId = null } = {}) => (
  {
    id: uuid(),
    name,
    socketId
  }
);

const createMessage = ({ message = '', sender = '' } = {}) => (
  {
    id: uuid(),
    time: getTime(new Date(Date.now())),
    message,
    sender
  }
);

const createChat = ({ messages = [], name = 'PokemonsChat', users = [] } = {}) => (
  {
    id: uuid(),
    name,
    messages,
    users,
    typingUsers: []
  }
);

const getTime = (date) => `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`;

module.exports = {
  createMessage,
  createChat,
  createUser
};