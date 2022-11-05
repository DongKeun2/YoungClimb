import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';

const profile = createAsyncThunk(
  'profile',
  async (nickname, {rejectWithValue}) => {
    console.log('프로필 요청함', nickname);
    try {
      const res = await axios.get(api.profile(nickname), getConfig());
      console.log('프로필 요청 성공', res.data);
      return res.data;
    } catch (err) {
      console.log('프로필 요청 실패');
      return rejectWithValue(err.response.data);
    }
  },
);

const followSubmit = createAsyncThunk(
  'followSubmit',
  async (nickname, {rejectWithValue}) => {
    console.log(nickname, '를 팔로우');
    try {
      const res = await axios.post(api.follow(nickname), {}, getConfig());
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
      const res = await axios.get(api.follow(nickname), getConfig());
      console.log('팔로우 목록 결과', res.data);
      return res.data;
    } catch (err) {
      console.log('팔로우 목록 실패');
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
  isOpen: false,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsOpen: state => {
      state.isOpen = !state.isOpen;
    },
    setIsClose: state => {
      state.isOpen = false;
    },
  },
  extraReducers: {
    [profile.fulfilled]: (state, action) => {
      state.profileInfo = action.payload;
    },
    [followSubmit.fulfilled]: (state, action) => {
      state.profileInfo.follow = action.payload;
    },
    [fetchFollowList.fulfilled]: (state, action) => {
      state.followInfo = action.payload;
    },
  },
});

export {profile, followSubmit, fetchFollowList};

export const {setIsOpen, setIsClose} = ProfileSlice.actions;

export default ProfileSlice.reducer;
