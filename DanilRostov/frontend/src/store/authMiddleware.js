// import { API_URL } from '../constants/api';
// import {
//   setUserData,
//   getIdToken,
//   isTokenExpired,
//   clearUserData
// } from '../util/tokenUtilities';
// import {
//   requestToken,
//   successToken,
//   failureToken
// } from '../actions/authorisation/authorisationAC';
// import { authActionTypes } from '../actions/authorisation/authorisationAT';
// import Api from '../api/Api';

// const {
//   AUTHORIZATION_LOG_OUT
// } = authActionTypes;

// const API = new Api();
// const ROOT_HREF = '/';

// const isAuthenticated = () => {
//   const idToken = getIdToken();
//   return !!idToken && !isTokenExpired(idToken);
// };

// const authMiddleware = store => next => action => {
//   if (!isAuthenticated()) {
//     const regCode = /\?code=(.*)/;
//     const code = window.location.href.match(regCode) && window.location.href.match(regCode)[1];
//     if (!code) {
//       window.location.href = AUTH_REQUEST_URI;
//     } else {
//       requestToken();
//       API.getAuth({ url: `${TOKEN_REQUEST_URI}&code=${code}` })
//         .then(data => {
//           if (data.error) {
//             failureToken();
//           } else {
//             successToken();
//             setUserData(data);
//             window.location.href = ROOT_HREF;
//           }
//         })
//         .catch(err => failureToken());
//     }
//   }
//   if (action.type === AUTHORIZATION_LOG_OUT) {
//     clearUserData();
//     window.location.href = ROOT_HREF;
//   }
//   return next(action)
// };

// export default authMiddleware;
