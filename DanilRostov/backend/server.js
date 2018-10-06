"use strict"
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

// const pokemon = require('./routes/pokemon');
// const user = require('./routes/user');
// const auth = require('./routes/auth');

const corsDomains = {
  origin: ['http://localhost:3000']
};

app.use(cors(corsDomains));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.status(200).send('server is working');
});
// app.use('/', pokemon);
// app.use('/', user);
// app.use('/', auth);

app.listen(port, () => console.log(`Server started on port ${port}`));