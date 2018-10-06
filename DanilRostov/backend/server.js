"use strict"
const app = require('express')();
const mongoose = require('mongoose');
const cors = require('cors');

const db = require('./config/keys').mongoURI;
const auth = require('./routes/auth');

const port = process.env.PORT || 5000;
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

app.use('/', auth);

app.listen(port, () => console.log(`Server started on port ${port}`));