import Axios from 'axios';
import api from './api';
import { setRefreshToken, getRefreshToken, removeRefreshToken } from '../reducer/slice/Cookie';
import { SET_TOKEN, DELETE_TOKEN } from '../reducer/slice/TokenSlice';
import {useDispatch} from 'react-redux'

const SetToken = (token) =>{
  useDispatch(SET_TOKEN(token))
}
const DelToken = () =>{
  useDispatch(DELETE_TOKEN())
}


const axiosTemp = Axios.create({
  timeout: 10000,
});

axiosTemp.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    // console.log('에러', error);
    const {
      config,
      response: {status},
    } = error;

    if (status === 401) {
      const originalRequest = config;
      try {
        const res = await Axios.post(
          api.refresh(),
          {},
          {
            headers: {Authorization: 'Bearer ' + (await getRefreshToken())},
          },
        );
        // console.log('리프레쉬 요청 성공', res.data);
        // 헤더에 토큰 고정
        axiosTemp.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        

        SetToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken);
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        console.log('새로운 config', originalRequest);
        return axiosTemp(originalRequest);
      } catch (err) {
        DelToken()
        removeRefreshToken();
        // removeCurrentUser();
      }
    }
    return Promise.reject(error);
  },
);

export default axiosTemp;
