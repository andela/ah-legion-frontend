import * as jwt from 'jsonwebtoken';

// by authenticating the token, we get back the user details
export const Authenticate = (token) => {
  try {
    const details = jwt.verify(token, process.env.REACT_APP_SECRET_KEY);
    if (details.exp > Date.now() / 1000) {
      return details;
    } return false;
  } catch (error) {
    return false;
  }
};

const token = localStorage.getItem('token');
export const isLoggedIn = Authenticate(token);
