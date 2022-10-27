const API_BASE_URL = 'http://10.0.2.2:8000/api';

const USER_URL = '/user';

const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
const SIGNUP_URL = '/signup';

const WINGSPAN_URL = '/wingspan/';

const api = {
  login: () => API_BASE_URL + USER_URL + LOGIN_URL,
  logout: () => API_BASE_URL + USER_URL + LOGOUT_URL,
  signup: () => API_BASE_URL + USER_URL + SIGNUP_URL,

  wingspan: () => API_BASE_URL + WINGSPAN_URL,
};

export default api;
