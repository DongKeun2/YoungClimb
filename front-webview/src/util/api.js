const API_BASE_URL = 'https://k7a701.p.ssafy.io/api';

const USER_URL = '/user';
const ADMIN_URL = '/admin'

const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';

const REISSUE_URL = '/reIssue';
const INFO_URL = '/info'

const api = {
  refresh: () => API_BASE_URL + USER_URL + REISSUE_URL,

  login: () => API_BASE_URL + ADMIN_URL + LOGIN_URL,
  logout: () => API_BASE_URL + USER_URL + LOGOUT_URL,

  adminInfo: ()=>API_BASE_URL + ADMIN_URL + INFO_URL
};

export default api;
