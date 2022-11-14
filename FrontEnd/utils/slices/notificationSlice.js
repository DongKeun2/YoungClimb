import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';

const fetchNotificationList = createAsyncThunk(
  'fetchNotificationList',
  async (id,{rejectWithValue}) => {
    try {
      console.log(111)
      const res = await axios.get(api.noticeList(), await getConfig());
      console.log('알림 목록 결과', res.data);
      return res.data;
    } catch (err) {
      console.log('알림 목록 실패');
      return rejectWithValue(err.response.data);
    }
  },
);

let newNoti
AsyncStorage.getItem('newNoti').then((res)=>{
  if (res){
    newNoti = true
  } else{ newNoti =false }
})
let notiAllow
AsyncStorage.getItem('notiAllow').then((res)=>{
  if (res){
    notiAllow = true
  } else{ notiAllow =false }
})



const initialState = {
  notifications: [],
  newNoti: newNoti,
  notiAllow: notiAllow||false,
};

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNewNoti: (state, action) => {
      state.newNoti = action.payload;
    },
    changeNotiAllow: (state, action) => {
      state.notiAllow = action.payload;
    },

  },
  extraReducers: {
    [fetchNotificationList.fulfilled]: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const {changeNewNoti, changeNotiAllow} = NotificationSlice.actions;
export {fetchNotificationList};
export default NotificationSlice.reducer;
