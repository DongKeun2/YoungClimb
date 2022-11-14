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
AsyncStorage.getItem('newNoti',(err,result)=>{
  if (result){
    newNoti = true}
});
let followNoti
AsyncStorage.getItem('followNoti',(err,result)=>{
  if (result){
  followNoti = true}
})
let likeNoti
AsyncStorage.getItem('likeNoti',(err,result)=>{
  if (result){
  likeNoti = true}
})
let commentNoti
AsyncStorage.getItem('commentNoti',(err,result)=>{
  if (result){
  commentNoti = true}
})
let commentLikeNoti
AsyncStorage.getItem('commentLikeNoti',(err,result)=>{
  if (result){
  commentLikeNoti = true}
})
let subCommentNoti
AsyncStorage.getItem('subCommentNotiNoti',(err,result)=>{
  if (result){
  subCommentNoti = true}
})


const initialState = {
  notifications: [],
  newNoti: newNoti||false,
  notiAllow: {
    followNoti: followNoti||true,
    likeNoti: likeNoti||true,
    commentNoti: commentNoti||true,
    commentLikeNoti:commentLikeNoti||true,
    subCommentNoti:subCommentNoti||true
  },
  message: false
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
    changeMessage:(state, action) => {
      state.message = action.payload
    }
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
