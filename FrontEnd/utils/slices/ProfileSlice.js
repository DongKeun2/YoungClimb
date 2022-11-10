import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';

const profile = createAsyncThunk(
  'profile',
  async (nickname, {rejectWithValue}) => {
    try {
      const res = await axios.get(api.profile(nickname), await getConfig());
      console.log('프로필 요청 성공', res.data);
      return res.data;
    } catch (err) {
      console.log('프로필 요청 실패', err);
      return rejectWithValue(err.response.data);
    }
  },
);

const followSubmit = createAsyncThunk(
  'followSubmit',
  async (nickname, {rejectWithValue}) => {
    console.log(nickname, '를 팔로우');
    try {
      const res = await axios.post(api.follow(nickname), {}, await getConfig());
      console.log('팔로우 성공');
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log('팔로우 실패');
      return rejectWithValue(err.response.data);
    }
  },
);

const fetchFollowList = createAsyncThunk(
  'fetchFollowList',
  async (nickname, {rejectWithValue}) => {
    console.log('팔로우 정보 요청', nickname);
    try {
      const res = await axios.get(api.follow(nickname), await getConfig());
      console.log('팔로우 목록 결과', res.data);
      return res.data;
    } catch (err) {
      console.log('팔로우 목록 실패');
      return rejectWithValue(err.response.data);
    }
  },
);

const checkNickname = createAsyncThunk(
  'checkNickname',
  async (data, {rejectWithValue}) => {
    console.log('닉네임 확인', data);
    try {
      const res = await axios.post(api.checkNickname(), data, {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  profileInfo: {},
  followInfo: {
    followings: [],
    followers: [],
  },
  uploadImg: null,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changeUploadImg: (state, action) => {
      state.uploadImg = action.payload;
    },
    profileFollow: (state, action) => {
      state.profileInfo.follow = action.payload;
    },
    followingFollow: (state, action) => {
      state.followInfo.followings[action.payload.idx].follow =
        action.payload.follow;
    },
    followerFollow: (state, action) => {
      state.followInfo.followers[action.payload.idx].follow =
        action.payload.follow;
    },
  },
  extraReducers: {
    [profile.fulfilled]: (state, action) => {
      console.log('요청성공', action.payload);
      state.profileInfo = action.payload;
    },
    [fetchFollowList.fulfilled]: (state, action) => {
      state.followInfo = action.payload;
    },
  },
});

export {profile, followSubmit, fetchFollowList, checkNickname};

export const {changeUploadImg, profileFollow, followingFollow, followerFollow} =
  ProfileSlice.actions;

export default ProfileSlice.reducer;
