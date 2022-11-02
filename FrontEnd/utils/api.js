const API_BASE_URL = 'localhost:8000/api';

const USER_URL = '/user';

const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';

const api = {
  login: () => API_BASE_URL + USER_URL + LOGIN_URL,
  logout: () => API_BASE_URL + USER_URL + LOGOUT_URL,
};

export default api;
