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

// {"exp": 50, "expleft": 100, "height": 180, "intro": "이제 된다능 페페", "nickname": "김싸피", "rank": "Y2", "shoeSize": 290, "upto": 2, "wingspan": 210}
export const setCurrentUser = async currentUser => {
  console.log('스토리지에 저장할 정보', currentUser);
  await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
};

export const getCurrentUser = async () => {
  const info = await AsyncStorage.getItem('currentUser');
  const currentUser = JSON.parse(info);
  return currentUser;
};

export const removeCurrentUser = () => {
  AsyncStorage.removeItem('currentUser');
};
