import AsyncStorage from '@react-native-async-storage/async-storage';

// AccessToken 저장 및 삭제
export const setAccessToken = token => {
  AsyncStorage.setItem('accessToken', token);
};
export const getAccessToken = () => {
  return AsyncStorage.getItem('accessToken');
};
export const removeAccessToken = () => {
  AsyncStorage.removeItem('accessToken');
};

export const setCurrentUser = currentUser => {
  AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
};

export const getCurrentUser = () => {
  return JSON.parse(AsyncStorage.getItem('currentUser'));
};

export const removeCurrentUser = () => {
  AsyncStorage.removeItem('currentUser');
};
