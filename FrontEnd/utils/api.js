// const API_BASE_URL = 'http://10.0.2.2:8080';
const API_BASE_URL = 'https://k7a701.p.ssafy.io/api';
const WINGSPAN_URL = 'http://k7a701.p.ssafy.io:8000/api/wingspan/';

const USER_URL = '/user';

const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
const SIGNUP_URL = '/signup';

const EMAIL_URL = '/email';
const NICKNAME_URL = '/nickname';

const PROFILE_URL = '/profile';
const FOLLOW_URL = '/follow';

const CENTERS_URL = '/center';

const SEARCH_URL = '/search';
const EDIT_URL = '/edit';
const SAVE_URL = '/save';

const BOARD_URL = '/board';
const HOME_URL = '/home';
const LIKE_URL = '/like';
const SCRAP_URL = '/scrap';

const REELS_URL = '/reels';

const REPORT_URL = '/report';
const IMAGE_URL = '/image';

const api = {
  fetchCenter: () => API_BASE_URL + CENTERS_URL,

  login: () => API_BASE_URL + USER_URL + LOGIN_URL,
  logout: () => API_BASE_URL + USER_URL + LOGOUT_URL,
  checkEmail: () => API_BASE_URL + USER_URL + EMAIL_URL,
  checkNickname: () => API_BASE_URL + USER_URL + NICKNAME_URL,
  signup: () => API_BASE_URL + USER_URL + SIGNUP_URL,
  profile: nickname => API_BASE_URL + USER_URL + `/${nickname}`,

  saveImage: () => API_BASE_URL + USER_URL + SAVE_URL + IMAGE_URL,
  profileCreate: () => API_BASE_URL + USER_URL + PROFILE_URL,
  profileEdit: () => API_BASE_URL + USER_URL + PROFILE_URL + EDIT_URL,

  follow: nickname => API_BASE_URL + USER_URL + `/${nickname}` + FOLLOW_URL,

  wingspan: () => WINGSPAN_URL,

  centers: () => API_BASE_URL + CENTERS_URL,
  center: centerId => API_BASE_URL + CENTERS_URL + `/${centerId}`,

  searchUser: () => API_BASE_URL + SEARCH_URL + USER_URL,
  search: () => API_BASE_URL + SEARCH_URL + BOARD_URL,

  homeFeed: pageNumber =>
    API_BASE_URL + BOARD_URL + HOME_URL + `?page=${pageNumber}`,
  feedComment: boardId => API_BASE_URL + BOARD_URL + `/${boardId}`,
  videoToUrl: () => API_BASE_URL + BOARD_URL + SAVE_URL + IMAGE_URL,
  postAdd: () => API_BASE_URL + BOARD_URL,
  feedLike: boardId => API_BASE_URL + BOARD_URL + `/${boardId}` + LIKE_URL,
  feedScrap: boardId => API_BASE_URL + BOARD_URL + `/${boardId}` + SCRAP_URL,

  reels: pageNumber => API_BASE_URL + REELS_URL + `?page=${pageNumber}`,

  report: boardId => API_BASE_URL + BOARD_URL + `/${boardId}` + REPORT_URL,
};

export default api;
