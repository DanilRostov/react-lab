"use strict"
const jwt = require('jsonwebtoken');
const config = require('../config/keys');

const checkToken = (req, res, next) => {
  const token = req.headers['x-token'];
  if (!token) {
    return res.status(403).send({
      isAuth: false,
      token: null,
      error: 'No token'
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(200).send({
        isAuth: false,
        token: null,
        error: 'Failed to authenticate token'
      });
    }
    const expTime = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime >= expTime) {
      return res.status(200).send({
        isAuth: false,
        token: null,
        error: 'Token is expired'
      });
    } else {
      req.payload = decoded;
      next();
    }
  });
};

module.exports = checkToken;