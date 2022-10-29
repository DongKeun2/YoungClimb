const API_BASE_URL = 'http://10.0.2.2:8000/api';

const USER_URL = '/user';

const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
const SIGNUP_URL = '/signup';

const PROFILE_URL = '/profile';
const FOLLOW_URL = '/follow';

const WINGSPAN_URL = '/wingspan/';

const api = {
  login: () => API_BASE_URL + USER_URL + LOGIN_URL,
  logout: () => API_BASE_URL + USER_URL + LOGOUT_URL,
  signup: () => API_BASE_URL + USER_URL + SIGNUP_URL,
  profile: () => API_BASE_URL + USER_URL + PROFILE_URL,
  follow: nickname => API_BASE_URL + USER_URL + `${nickname}` + FOLLOW_URL,

  wingspan: () => API_BASE_URL + WINGSPAN_URL,
};

export default api;
