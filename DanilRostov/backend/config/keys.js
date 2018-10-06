"use strict"
const {
  DB_ID,
  DB_USER,
  DB_PASS,
  DB_IP,
  DB_NAME,
  TOKEN_SECRET
} = process.env;

module.exports = {
  mongoURI: `${DB_ID}://${DB_USER}:${DB_PASS}@${DB_IP}/${DB_NAME}`,
  secret: TOKEN_SECRET
}