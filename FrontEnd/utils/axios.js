import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import api from './api';
import {getRefreshToken} from './Token';

const axiosTemp = Axios.create({
  timeout: 10000,
});

// 요청 인터셉터 추가하기
axiosTemp.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

axiosTemp.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    console.log('에러', error);
    const {
      config,
      response: {status},
    } = error;

    if (status === 401) {
      const originalRequest = config;
      console.log('기존 config', config.headers.Authorization);
      // const refreshToken = await AsyncStorage.getItem('refreshToken');
      // token refresh 요청
      // const {data} = await axios.post(
      //   'http://localhost:3000/refresh/token', // token refresh api
      //   {
      //     refreshToken,
      //   },
      // );
      // // 새로운 토큰 저장
      try {
        const {accessToken, refreshToken} = await Axios.post(
          api.refresh(),
          {},
          {
            headers: {Authorization: 'Bearer' + (await getRefreshToken())},
          },
        );
        console.log('리프레쉬 요청 성공', accessToken, refreshToken);
        console.log(accessToken);
        axiosTemp.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        console.log('새로운 config', originalRequest);
        return axiosTemp(originalRequest);
      } catch {
        console.log('refresh도 실패');
      }
    }
    return Promise.reject(error);
  },
);

export default axiosTemp;
