import decode from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'access_token';
const ID_TOKEN_KEY = 'id_token';

export const getIdToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setUserData = (token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  localStorage.setItem(ID_TOKEN_KEY, data.id_token);
  localStorage.setItem('email', decode(data.id_token).upn);
};

export const clearUserData = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(ID_TOKEN_KEY);
  localStorage.removeItem('email');
};

export const isTokenExpired = (token) => {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
};

const getTokenExpirationDate = (encodedToken) => {
  const token = decode(encodedToken);
  const date = new Date(0);
  if (!token.exp) {
    return null;
  }
  date.setUTCSeconds(token.exp);
  return date;
};