'use strict'
const io = require('../server.js').io;
const {
  VERIFY_USER,
  USER_CONNECTED,
  RESET_DEFAULT_CHAT,
  USER_DISCONNECTED,
  LOG_OUT,
  MESSAGE_RECEIVED,
  MESSAGE_SENT,
  TYPING,
  PRIVATE_MESSAGE
} = require('./events');
const { createUser, createMessage, createChat } = require('./factories');

let connectedUsers = {};
let defaultChat = createChat();

module.exports = function (socket) {
  let sendMessageToChatFromUser;
  let sendTypingToChatFromUser;

  socket.on(VERIFY_USER, (nickname, setUser) => {
    if (isUser(connectedUsers, nickname)) {
      setUser({ isUser: true, user: null });
    } else {
      setUser({ isUser: false, user: createUser({ name: nickname, socketId: socket.id }) });
    }
  });

  socket.on(USER_CONNECTED, (user) => {
    user.socketId = socket.id;
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    sendMessageToChatFromUser = sendMessageToChat(user.name);
    sendTypingToChatFromUser = sendTypingToChat(user.name);

    io.emit(USER_CONNECTED, connectedUsers);
    console.log(connectedUsers);
  });

  socket.on(RESET_DEFAULT_CHAT, (resetChat) => {
    resetChat(defaultChat);
  });

  socket.on('disconnect', () => {
    if ('user' in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name);
      io.emit(USER_DISCONNECTED, connectedUsers);
      console.log(connectedUsers);
    }
  });

  socket.on(LOG_OUT, () => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);
    io.emit(USER_DISCONNECTED, connectedUsers);
    console.log(connectedUsers);
  });

  socket.on(MESSAGE_SENT, ({ chatId, message }) => {
    sendMessageToChatFromUser(chatId, message);
  });

  socket.on(TYPING, ({ chatId, isTyping }) => {
    sendTypingToChatFromUser(chatId, isTyping);
  });

  socket.on(PRIVATE_MESSAGE, ({ reciever, sender }) => {
    if (reciever in connectedUsers) {
      const newChat = createChat({ name: `${reciever}&${sender}`, users: [reciever, sender] });
      const recieverSocket = connectedUsers[reciever].socketId;
      socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat);
      socket.emit(PRIVATE_MESSAGE, newChat);
    }
  });
}

const sendTypingToChat = (user) => (chatId, isTyping) => {
  io.emit(`${TYPING}-${chatId}`, { user, isTyping });
};

const sendMessageToChat = (sender) => (chatId, message) => {
  io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({ message, sender }));
};

const addUser = (userList, user) => ({ ...userList, [user.name]: user });

const removeUser = (userList, username) => (({ [username]: deleted, ...userList }) => userList)(userList);

const isUser = (userList, username) => username in userList;