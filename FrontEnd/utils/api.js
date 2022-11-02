const API_BASE_URL = 'https://k7a701.p.ssafy.io/api';
const WINGSPAN_URL = 'http://k7a701.p.ssafy.io:8000/api/wingspan/';

const USER_URL = '/user';

const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
const SIGNUP_URL = '/signup';

const PROFILE_URL = '/profile';
const FOLLOW_URL = '/follow';

const CENTERS_URL = '/center'

const api = {
  login: () => API_BASE_URL + USER_URL + LOGIN_URL,
  logout: () => API_BASE_URL + USER_URL + LOGOUT_URL,
  signup: () => API_BASE_URL + USER_URL + SIGNUP_URL,
  profile: () => API_BASE_URL + USER_URL + PROFILE_URL,
  follow: nickname => API_BASE_URL + USER_URL + `${nickname}` + FOLLOW_URL,

  wingspan: () => WINGSPAN_URL,

  centers: () => API_BASE_URL + CENTERS_URL,
  center: centerId=>API_BASE_URL + CENTERS_URL+ `${centerId}`,
};

export default api;
