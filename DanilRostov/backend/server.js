'use strict'
const port = process.env.PORT || 5005;
const express = require('express');
const app = express();
const server = app.listen(port);
const mongoose = require('mongoose');
const cors = require('cors');

const corsDomains = {
  origin: ['http://localhost:8080']
};

const db = require('./config/keys').mongoURI;
const auth = require('./routes/auth');

app.use(cors(corsDomains));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.status(200).send('server is working'));

app.use('/', auth);

const io = module.exports = require('socket.io').listen(server);

const SocketManager = require('./sockets/socketManager');
io.on('connection', SocketManager);